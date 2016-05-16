import DOMElement from 'structurejs/display/DOMElement';

/**
 * TODO: YUIDoc_comment
 *
 * @class TodoItemView
 * @extends DOMElement
 * @constructor
 **/
class TodoItemView extends DOMElement {

    /**
     * TODO: YUIDoc_comment
     *
     * @property _$completeCheckbox
     * @type {jQuery}
     * @protected
     */
    _$completeCheckbox = null;

    constructor(todoModel) {
        super('templates/jst/TodoItemView', todoModel);
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();
        //js-TodoItemView-completeCheckbox
        // Create or setup objects in this parent class.

        this._$completeCheckbox = this.$element.find('.js-TodoItemView-completeCheckbox');
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        this._$completeCheckbox.addEventListener('change', this._onChange, this);

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        this._$completeCheckbox.removeEventListener('change', this._onChange, this);

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout() {
        // Layout or update the objects in this parent class.
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
     * @method _onChange
     * @param event {jQueryEventObject}
     * @protected
     */
    _onChange(event) {
        const $target = $(event.target);
        const isChecked = $target.prop('checked');
        const todoId = $target.data('todo-id');

        console.log("todoId", todoId);
        console.log("$target", $target);
        console.log("isChecked", isChecked);
    }

}

export default TodoItemView;
