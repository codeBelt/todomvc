import DOMElement from 'structurejs/display/DOMElement';
import Router from 'structurejs/controller/Router';

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

        Router.add('', this._onRoute, this);
        Router.add('active', this._onRoute, this);
        Router.add('completed', this._onRoute, this);
        Router.start();
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
        const currentRoute = Router.getCurrentRoute();

        if (currentRoute == null) { return; }

        const todoModels = TodoStore.getAll();

        let models;

        switch (currentRoute.routePattern) {
            case '':
                models = todoModels;
                break;
            case 'active':
                models = todoModels.filter(todoModel => todoModel.completed === false);
                break;
            case 'completed':
                models = todoModels.filter(todoModel => todoModel.completed === true);
                break;
        }

        this._bodyView.layout(models);
        this._footerView.layout(todoModels, currentRoute.routePattern);
    }

    /**
     * @overridden DOMElement.destroy
     */
    destroy() {
        this.disable();

        this._headerView.destroy();
        this._bodyView.destroy();
        this._footerView.destroy();

        super.destroy();
    }

    //--------------------------------------------------------------------------------
    // EVENTS HANDLERS
    //--------------------------------------------------------------------------------

    /**
     * Triggered when event the TodoStore.{{#crossLink "TodoStore/CHANGE_EVENT:event"}}{{/crossLink}} is dispatched.
     *
     * @method _onStoreChange
     * @param event {BaseEvent}
     * @private
     */
    _onStoreChange(event) {
        this.layout();
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onRoute
     * @param event {RouterEvent}
     * @private
     */
    _onRoute(event) {
        this.layout();
    }

}

export default App;
