import DOMElement from 'structurejs/display/DOMElement';

import TodoItemView from './bodyview/TodoItemView';

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

        console.log("his._todoListContainer", this._todoListContainer);
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        // Enable the child objects and/or add any event listeners.

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        // Disable the child objects and/or remove any event listeners.

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout(todoModels) {
        if (todoModels == null) { return; }

        this._todoListContainer.removeChildren();

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

}

export default BodyView;
