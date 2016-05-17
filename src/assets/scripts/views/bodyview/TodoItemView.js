import DOMElement from 'structurejs/display/DOMElement';

import TodoAction from '../../actions/TodoAction';
import KeyCode from '../../constants/KeyCode';

/**
 * The view responsible for each todo item.
 *
 * @class TodoItemView
 * @extends DOMElement
 * @param todoModel {TodoModel}
 * @constructor
 **/
class TodoItemView extends DOMElement {

    /**
     * A reference to the {{#crossLink "TodoModel"}}{{/crossLink}} for this view item.
     *
     * @property _todoModel
     * @type {TodoModel}
     * @protected
     */
    _todoModel = null;

    constructor(todoModel) {
        super();

        this._todoModel = todoModel;
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create('templates/jst/TodoItemView', this._todoModel);
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        this.$element.addEventListener('change', '.js-TodoItemView-completeCheckbox', this._onToggle, this);
        this.$element.addEventListener('click', '.js-TodoItemView-deleteBtn', this._onDelete, this);
        this.$element.addEventListener('dblclick', '.js-TodoItemView-label', this._onEdit, this);
        this.$element.addEventListener('blur', '.js-TodoItemView-editInput', this._onBlur, this);
        this.$element.addEventListener('keyup', '.js-TodoItemView-editInput', this._onKeyup, this);
        this.$element.addEventListener('keypress', '.js-TodoItemView-editInput', this._onKeyPress, this);

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        this.$element.removeEventListener('change', '.js-TodoItemView-completeCheckbox', this._onToggle, this);
        this.$element.removeEventListener('click', '.js-TodoItemView-deleteBtn', this._onDelete, this);
        this.$element.removeEventListener('dblclick', '.js-TodoItemView-label', this._onEdit, this);
        this.$element.removeEventListener('blur', '.js-TodoItemView-editInput', this._onBlur, this);
        this.$element.removeEventListener('keyup', '.js-TodoItemView-editInput', this._onKeyup, this);
        this.$element.removeEventListener('keypress', '.js-TodoItemView-editInput', this._onKeyPress, this);

        super.disable();
    }

    //--------------------------------------------------------------------------------
    // HELPER METHODS
    //--------------------------------------------------------------------------------

    /**
     * TODO: YUIDoc_comment
     *
     * @method getTodoModel
     * @protected
     */
    getTodoModel() {
        return this._todoModel;
    }

    //--------------------------------------------------------------------------------
    // EVENTS HANDLERS
    //--------------------------------------------------------------------------------

    /**
     * Calls the TodoAction.{{#crossLink "TodoAction/update:method"}}{{/crossLink}} action to set the todo item completed or active.
     *
     * @method _onToggle
     * @param event {jQueryEventObject}
     * @protected
     */
    _onToggle(event) {
        const $target = $(event.target);
        const isChecked = $target.prop('checked');
        const todoId = $target.data('todo-id');

        TodoAction.update({ id: todoId, completed: isChecked });
    }

    /**
     * Handles the logic to edit the todo item.
     *
     * @method _onEdit
     * @param event {jQueryEventObject}
     * @protected
     */
    _onEdit(event) {
        this.$element.addClass('editing');

        this.$element
            .find('.js-TodoItemView-editInput')
            .focus();
    }

    /**
     * Calls the TodoAction.{{#crossLink "TodoAction/delete:method"}}{{/crossLink}} to delete the todo item.
     *
     * @method _onDelete
     * @param event {jQueryEventObject}
     * @protected
     */
    _onDelete(event) {
        const $target = $(event.target);
        const todoId = $target.data('todo-id');

        TodoAction.delete(todoId);
    }

    /**
     * Handles canceling the editing of the todo item on blur.
     *
     * @method _onBlur
     * @param event {jQueryEventObject}
     * @protected
     */
    _onBlur(event) {
        const $target = $(event.target);

        $target.val(this._todoModel.title);

        this.$element.removeClass('editing');
    }

    /**
     * Handles canceling the editing of the todo item when the escape key is pressed.
     *
     * @method _onKeyup
     * @param event {jQueryEventObject}
     * @protected
     */
    _onKeyup(event) {
        if (event.keyCode === KeyCode.ESCAPE_KEY) {
            const $target = $(event.target);

            $target.val(this._todoModel.title);

            this.$element.removeClass('editing');
        }
    }

    /**
     * Calls TodoAction.{{#crossLink "TodoAction/update:method"}}{{/crossLink}} action to save new title for the todo item
     * When the enter key is pressed.
     *
     * @method _onKeyPress
     * @param event {jQueryEventObject}
     * @protected
     */
    _onKeyPress(event) {
        if (event.keyCode === KeyCode.ENTER) {
            const $target = $(event.target);
            const todoId = $target.data('todo-id');
            const text = $target.val();

            this.$element.removeClass('editing');

            TodoAction.update({ id: todoId, title: text });
        }
    }

}

export default TodoItemView;
