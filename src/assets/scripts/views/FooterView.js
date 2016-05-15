import DOMElement from 'structurejs/display/DOMElement';

import TodoAction from '../actions/TodoAction';
/**
 * TODO: YUIDoc_comment
 *
 * @class FooterView
 * @extends DOMElement
 * @constructor
 **/
class FooterView extends DOMElement {

    /**
     * TODO: YUIDoc_comment
     *
     * @property _$clearCompletedBtn
     * @type {jQuery}
     * @protected
     */
    _$clearCompletedBtn = null;
    
    /**
     * TODO: YUIDoc_comment
     *
     * @property _todoModels
     * @type {Array<TodoModel>}
     * @protected
     */
    _todoModels = null;

    constructor($element) {
        super($element);
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        this._$clearCompletedBtn = this.$element.find('.js-FooterView-clearCompletedBtn');
        this._$count = this.$element.find('.js-FooterView-count');
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        this._$clearCompletedBtn.addEventListener('click', this._onClick, this);

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        this._$clearCompletedBtn.removeEventListener('click', this._onClick, this);

        super.disable();
    }

    /**
     * @overridden DOMElement.layout
     */
    layout(todoModels) {
        if (todoModels == null) { return; }
        
        this._todoModels = todoModels;

        const activeTodoCount = this._todoModels.length;
        const plural = (activeTodoCount === 1) ? '' : 's';
        const text = `<strong>${activeTodoCount}</strong> item${plural} left`;

        this._$count.html(text);
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

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onClick
     * @protected
     */
    _onClick(event) {
        // List of TodoModel ids that need to be removed.
        const todoModelIds = this
            ._todoModels
            .filter(todoModel => todoModel.completed === true)
            .map(todoModel => todoModel.id);
        
        TodoAction.clearCompleted(todoModelIds);
    }

}

export default FooterView;
