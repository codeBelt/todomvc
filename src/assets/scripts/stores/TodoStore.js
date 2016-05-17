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
        EventBroker.addEventListener(TodoEvent.ADD, this._onAdd, this);
        EventBroker.addEventListener(TodoEvent.UPDATE, this._onUpdate, this);
        EventBroker.addEventListener(TodoEvent.CLEAR_COMPLETED, this._onClear, this);

        super.enable();
    }

    /**
     * @overridden EventDispatcher.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        EventBroker.removeEventListener(TodoEvent.LOAD, this._onLoad, this);
        EventBroker.removeEventListener(TodoEvent.ADD, this._onAdd, this);
        EventBroker.removeEventListener(TodoEvent.UPDATE, this._onUpdate, this);
        EventBroker.removeEventListener(TodoEvent.CLEAR_COMPLETED, this._onClear, this);

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

        this._storeWarehouse = todoModels;

        this.dispatchEvent(this.CHANGE_EVENT);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onAdd
     * @protected
     */
    _onAdd(event) {
        const todoModel = event.data;

        this._storeWarehouse.push(todoModel);

        this.dispatchEvent(this.CHANGE_EVENT);
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method _onUpdate
     * @protected
     */
    _onUpdate(event) {
        const data = event.data;
        const todoModel = this._storeWarehouse.find(todoModel => todoModel.id === data.id);

        todoModel.update(data);

        this.dispatchEvent(this.CHANGE_EVENT);
    }

    /**
     * Event handler to clear the store.
     *
     * @method _onClear
     * @param event {TodoEvent}
     * @protected
     */
    _onClear(event) {
        const todoModelIds = event.data;

        for (let i = this._storeWarehouse.length - 1; i >= 0; i--) {
            const todoModelId = this._storeWarehouse[i].id;

            if (todoModelIds.indexOf(todoModelId) >= 0) {
                this._storeWarehouse.splice(i, 1);
            }
        }

        this.dispatchEvent(this.CHANGE_EVENT);
    }

}

export default new TodoStore();// Singleton
