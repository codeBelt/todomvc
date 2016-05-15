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

            // Dispatch the models to the store.
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

            EventBroker.dispatchEvent(TodoEvent.CLEAR_COMPLETED, todoModelIds);

        } catch(error) { console.error(error); }
    }

}

export default new TodoAction();// Singleton
