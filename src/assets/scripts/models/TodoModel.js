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
    id = new Date().getTime();

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
    }

}

export default TodoModel;
