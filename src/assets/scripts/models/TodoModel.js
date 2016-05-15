import BaseModel from 'structurejs/model/BaseModel';

/**
 * A model for the todo item.
 *
 * @class TodoModel
 * @extends BaseModel
 * @constructor
 **/
class TodoModel extends BaseModel {

    /**
     * @property id
     * @type {number}
     * @public
     */
    id = null;

    /**
     * @property title
     * @type {string}
     * @public
     */
    title = null;

    /**
     * @property completed
     * @type {boolean}
     * @public
     */
    completed = false;

    /**
     * @property checked
     * @type {boolean}
     * @public
     */
    checked = false;

    constructor(data) {
        super();

        if (data) {
            this.update(data);
        }
    }

    /**
     * @overridden BaseModel.update
     */
    update(data) {
        super.update(data);

        // Override any values after the default super update method has set the values.

        if (this.id == null) {
            // Creates an id for the model if there is not one.
            // This happens when a new todo task is created.
            let timestamp = new Date();
            timestamp = timestamp.getTime();

            this.id = timestamp;
        }
    }

}

export default TodoModel;
