import BaseEvent from 'structurejs/event/BaseEvent';

/**
 * Events that pertains to the Flux Architecture Lifecycle.
 *
 * @class TodoEvent
 * @extends BaseEvent
 * @constructor
 **/
class TodoEvent extends BaseEvent {

    /**
     * Event to be dispatched when todo's needs to be load.
     *
     * @event LOAD
     * @type {string}
     * @static
     */
    static LOAD = 'TodoEvent.load';

    /**
     * Event to be dispatched when a todo item is added.
     *
     * @event ADD
     * @type {string}
     * @static
     */
    static ADD = 'TodoEvent.add';

    /**
     * Event to be dispatched when completed todo's need to me removed.
     *
     * @event CLEAR_COMPLETED
     * @type {string}
     * @static
     */
    static CLEAR_COMPLETED = 'TodoEvent.clearCompleted';

    constructor(type, bubbles = false, cancelable = false, data = null) {
        super(type, bubbles, cancelable, data);
    }

}

export default TodoEvent;
