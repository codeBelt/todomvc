import BaseObject from 'structurejs/BaseObject';
import EventBroker from 'structurejs/event/EventBroker';

import TodoModel from '../models/TodoModel';
import TodoEvent from '../events/TodoEvent';

/**
 * Action class help facilitate passing data to the {{#crossLink "EventBroker"}}{{/crossLink}}(Global Dispatcher).
 * Pertains to the Flux Architecture Lifecycle.
 *
 * @class TodoAction
 * @extends BaseObject
 * @constructor
 **/
class TodoAction extends BaseObject {

    constructor() {
        super();
    }

    /**
     * Method to fetch and load data from the server.
     *
     * @method load
     * @return {Promise<void>}
     * @public
     */
    async load() {
        try {

            const response = await fetch('/api/todos');
            const data = await response.json();

            // Sanitize the response data by creating client-side models to used within the application.
            const todoModels = data.map(todoItem => new TodoModel(todoItem));

            // Dispatch so the store can get the event.
            EventBroker.dispatchEvent(TodoEvent.LOAD, todoModels);

        } catch(error) { console.error(error.stack); }
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method delete
     * @param todoModelIds {number|Array<number>}
     * @public
     */
    async delete(ids) {
        try {

            const todoModelIds = (ids instanceof Array) ? ids : [ids];

            const promises = todoModelIds.map(todoModelId => {
                return fetch(`/api/todos/${ todoModelId }`, { method: 'DELETE' });
            });

            let results = await Promise.all(promises);

            // Dispatch so the store can get the event.
            EventBroker.dispatchEvent(TodoEvent.CLEAR_COMPLETED, todoModelIds);

        } catch(error) { console.error(error.stack); }
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method update
     * @param data {any}
     * @public
     */
    async update(data) {
        try {

            const response = await fetch(`/api/todos/${ data.id }`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            // Dispatch so the store can get the event.
            EventBroker.dispatchEvent(TodoEvent.UPDATE, data);

        } catch(error) { console.error(error.stack); }
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method add
     * @param todoModel {TodoModel}
     * @public
     */
    async add(todoModel) {
        try {

            const response = await fetch(`/api/todos/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: todoModel.toJSONString()
            });

            const responseData = await response.json();

            // Example of updating the id if you needed from the server.
            todoModel.id = responseData.id;

            // Dispatch so the store can get the event.
            EventBroker.dispatchEvent(TodoEvent.ADD, todoModel);

        } catch(error) { console.error(error.stack); }
    }

}

export default new TodoAction();// Singleton
