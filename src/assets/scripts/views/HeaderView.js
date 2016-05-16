import DOMElement from 'structurejs/display/DOMElement';

import KeyCode from '../constants/KeyCode';
import TodoModel from '../models/TodoModel';
import TodoAction from '../actions/TodoAction';

/**
 * TODO: YUIDoc_comment
 *
 * @class HeaderView
 * @extends DOMElement
 * @constructor
 **/
class HeaderView extends DOMElement {

    /**
     * TODO: YUIDoc_comment
     *
     * @property _$input
     * @type {jQuery}
     * @protected
     */
    _$input = null;

    constructor($element) {
        super($element);

        this._$input = this.$element.find('.js-HeaderView-input');
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        this._$input.addEventListener('keypress', this._onEnterKey, this);

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        this._$input.removeEventListener('keypress', this._onEnterKey, this);

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
     * TODO: YUIDoc_comment
     *
     * @method _onEnterKey
     * @protected
     */
    _onEnterKey(event) {
        if (event.keyCode === KeyCode.ENTER) {
            const todoModel = new TodoModel();
            todoModel.title = this._$input.val();
            
            TodoAction.add(todoModel);

            this._$input.blur();
            this._$input.val('');
        }
    }

}

export default HeaderView;
