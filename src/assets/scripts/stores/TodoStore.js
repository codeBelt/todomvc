import EventDispatcher from 'structurejs/event/EventDispatcher';
import EventBroker from 'structurejs/event/EventBroker';

import TodoEvent from '../events/TodoEvent';

/**
 * A Singleton store container that maintains state & logic for a data set.
 * Pertains to the Flux Architecture Lifecycle.
 *
 * @class TodoStore
 * @extends EventDispatcher
 * @constructor
 **/
class TodoStore extends EventDispatcher {

    /**
     * A change event for the store to dispatch.
     *
     * @property CHANGE_EVENT
     * @type {string}
     * @public
     * @const
     */
    CHANGE_EVENT = 'TodoStore.changeEvent';

    /**
     * A collection of TodoModel's.
     *
     * @property _storeWarehouse
     * @type {Array<TodoModel>}
     * @protected
     */
    _storeWarehouse = [];

    constructor() {
        super();

        this.enable();
    }

    /**
     * @overridden EventDispatcher.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        EventBroker.addEventListener(TodoEvent.LOAD, this._onLoad, this);
        EventBroker.addEventListener(TodoEvent.CLEAR_COMPLETE, this._onClear, this);

        super.enable();
    }

    /**
     * @overridden EventDispatcher.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        EventBroker.removeEventListener(TodoEvent.LOAD, this._onLoad, this);
        EventBroker.removeEventListener(TodoEvent.CLEAR_COMPLETE, this._onClear, this);

        super.disable();
    }

    //--------------------------------------------------------------------------------
    // HELPER METHODS
    //--------------------------------------------------------------------------------

    /**
     * Return all the models in the store.
     *
     * @method getAll
     * @return {Array<TodoModel>}
     * @public
     */
    getAll() {
        return this._storeWarehouse;
    }

    /**
     * Updates the store.
     *
     * @method _updateStore
     * @protected
     */
    _updateStore(data) {
        this._storeWarehouse = data;

        this.dispatchEvent(this.CHANGE_EVENT);
    }

    //--------------------------------------------------------------------------------
    // HELPER METHOD
    //--------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------
    // EVENTS HANDLERS
    //--------------------------------------------------------------------------------

    /**
     * Event handler to update the store;
     *
     * @method _onLoad
     * @param event {TodoEvent}
     * @protected
     */
    _onLoad(event) {
        const todoModels = event.data;

        this._updateStore(todoModels);
    }

    /**
     * Event handler to clear the store.
     *
     * @method _onClear
     * @param event {TodoEvent}
     * @protected
     */
    _onClear(event) {
        // this._updateStore(null);
    }

}

export default new TodoStore();// Singleton
