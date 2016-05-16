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

        } catch(error) { console.error(error); }
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method clearCompleted
     * @param todoModelIds {Array<number>}
     * @public
     */
    async clearCompleted(todoModelIds) {
        try {

            const promises = todoModelIds.map(todoModelId => {
                return fetch(`/api/todos/${todoModelId}`, { method: 'DELETE' });
            });

            let results = await Promise.all(promises);

            // Dispatch so the store can get the event.
            EventBroker.dispatchEvent(TodoEvent.CLEAR_COMPLETED, todoModelIds);

        } catch(error) { console.error(error); }
    }

    /**
     * TODO: YUIDoc_comment
     *
     * @method markCompleted
     * @param todoModelId {number}
     * @public
     */
    async markCompleted(todoModelId) {
        try {

            // const response = await fetch(`/api/todos/${todoModelId}`, { method: 'DELETE' });
            // const data = await response.json();
            // console.log("response", response);
            // console.log("data", data);
            //
            // Dispatch so the store can get the event.
            // EventBroker.dispatchEvent(TodoEvent.LOAD, todoModels);

        } catch(error) { console.error(error); }
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

            const data = await response.json();

            // Example of updating the id if you needed from the server.
            todoModel.id = data.id;

            // Dispatch so the store can get the event.
            EventBroker.dispatchEvent(TodoEvent.ADD, todoModel);

        } catch(error) { console.error(error); }
    }

}

export default new TodoAction();// Singleton
