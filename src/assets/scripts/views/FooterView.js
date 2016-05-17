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
     * @property _$navItems
     * @type {jQuery}
     * @protected
     */
    _$navItems = null;

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
     * @property _$count
     * @type {jQuery}
     * @protected
     */
    _$count = null;

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

        this._$navItems = this.$element.find('.js-FooterView-navItem');
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
    layout(todoModels, routePattern) {
        if (todoModels == null) { return; }

        this._todoModels = todoModels;

        this._updateCountText();
        this._updateNavItems(routePattern);
    }

    //--------------------------------------------------------------------------------
    // HELPER METHODS
    //--------------------------------------------------------------------------------

    /**
     * TODO: YUIDoc_comment
     *
     * @method _updateCountText
     * @protected
     */
    _updateCountText() {
        const activeTodoCount = this._todoModels.filter(todoModel => todoModel.completed === false).length;
        const completedTodoCount = this._todoModels.filter(todoModel => todoModel.completed === true).length;
        const plural = (activeTodoCount === 1) ? '' : 's';
        const text = `<strong>${ activeTodoCount }</strong> item${ plural } left`;

        this._$count.html(text);

        // Hides/Shows the clear button.
        this._$clearCompletedBtn.toggle(completedTodoCount > 0);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _updateNavItems
     * @protected
     */
    _updateNavItems(routePattern) {
        this._$navItems.removeClass('selected');

        let $navItem = this._$navItems.filter(`[href*='${ routePattern }']`);

        $navItem = ($navItem.length === 0) ? this._$navItems.eq(0) : $navItem;

        $navItem.addClass('selected');
    }

    //--------------------------------------------------------------------------------
    // EVENTS HANDLERS
    //--------------------------------------------------------------------------------

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

        TodoAction.delete(todoModelIds);
    }

}

export default FooterView;
