import DOMElement from 'structurejs/display/DOMElement';

import TodoAction from './actions/TodoAction';
import TodoStore from './stores/TodoStore';
import HeaderView from './views/HeaderView';
import BodyView from './views/BodyView';
import FooterView from './views/FooterView';

/**
 * TODO: YUIDoc_comment
 *
 * @class App
 * @extends DOMElement
 * @constructor
 **/
class App extends DOMElement {


    _$toggleSelectAll = null;
    _$todoList = null;
    _$clearCompletedBtn = null;

    /**
     * @property _headerView
     * @type {HeaderView}
     * @private
     */
    _headerView = null;

    /**
     * @property _bodyView
     * @type {BodyView}
     * @private
     */
    _bodyView = null;

    /**
     * @property _footerView
     * @type {FooterView}
     * @private
     */
    _footerView = null;

    constructor() {
        super();
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();
      
        this._headerView = new HeaderView(this.$element.find('.js-HeaderView'));
        this.addChild(this._headerView);

        this._bodyView = new BodyView(this.$element.find('.js-BodyView'));
        this.addChild(this._bodyView);

        this._footerView = new FooterView(this.$element.find('.js-FooterView'));
        this.addChild(this._footerView);

        TodoAction.load();
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        TodoStore.addEventListener(TodoStore.CHANGE_EVENT, this._onStoreChange, this);

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        TodoStore.removeEventListener(TodoStore.CHANGE_EVENT, this._onStoreChange, this);

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
     * Triggered when event the TodoStore.{{#crossLink "TodoStore/CHANGE_EVENT:event"}}{{/crossLink}} is dispatched.
     *
     * @method _onStoreChange
     * @param event
     * @private
     */
    _onStoreChange(event) {
        const todoModels = TodoStore.getAll();
console.log("todoModels", todoModels);
        // this._headerView.update(todoModels);
        // this._bodyView.update(todoModels);
        // this._footerView.update(todoModels);
    }



}

export default App;
