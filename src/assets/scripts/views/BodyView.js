import DOMElement from 'structurejs/display/DOMElement';

import TodoItemView from './bodyview/TodoItemView';
import TodoAction from '../actions/TodoAction';

/**
 * TODO: YUIDoc_comment
 *
 * @class BodyView
 * @extends DOMElement
 * @constructor
 **/
class BodyView extends DOMElement {

    /**
     * TODO: YUIDoc_comment
     *
     * @property _$toggleSelectAll
     * @type {jQuery}
     * @protected
     */
    _$toggleSelectAll = null;

    /**
     * TODO: YUIDoc_comment
     *
     * @property _todoListContainer
     * @type {DOMElement}
     * @protected
     */
    _todoListContainer = null;

    constructor($element) {
        super($element);
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        this._$toggleSelectAll = this.$element.find('.js-BodyView-toggleSelectAll');
        this._todoListContainer = this.getChild('.js-BodyView-todoList');
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        this._$toggleSelectAll.addEventListener('click', this._onSelectAllToggle, this);

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        this._$toggleSelectAll.removeEventListener('click', this._onSelectAllToggle, this);

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout(todoModels) {
        if (todoModels == null) { return; }

        this._todoListContainer.removeChildren(true);

        const todoItemViews = todoModels.map(todoModel => new TodoItemView(todoModel));

        todoItemViews.forEach(todoItemView => {
            this._todoListContainer.addChild(todoItemView);
        });
    }

    /**
     * @overridden DOMElement.destroy
     */
    destroy() {
        this.disable();

        // Call destroy on any child objects.
        // This super method will also null out your properties for garbage collection.

        super.destroy();
    }

    //--------------------------------------------------------------------------------
    // EVENTS HANDLERS
    //--------------------------------------------------------------------------------

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onSelectAllToggle
     * @protected
     */
    _onSelectAllToggle(event) {
        const $target = $(event.target);
        const isChecked = $target.prop('checked');
        const todoItemViews = this._todoListContainer.children;
        const todoModelIds = todoItemViews.map(todoItemView => todoItemView.getTodoModel().id);

        todoModelIds.forEach(id => {
            TodoAction.update({ id: id, completed: isChecked })
        });
    }

}

export default BodyView;
