import DOMElement from 'structurejs/display/DOMElement';

import KeyCode from './constants/KeyCode';
/**
 * TODO: YUIDoc_comment
 *
 * @class App
 * @extends DOMElement
 * @constructor
 **/
class App extends DOMElement {

    _$input = null;
    _$toggleSelectAll = null;
    _$todoList = null;
    _$clearCompletedBtn = null;

    constructor() {
        super();
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        this._$input = this.$element.find('.js-input');
        this._$toggleSelectAll = this.$element.find('.js-toggleSelectAll');
        this._$todoList = this.$element.find('.js-todoList');
        this._$clearCompletedBtn = this.$element.find('.js-clearCompletedBtn');
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
            const text = this._$input.val();

            console.log("text", text);
            this._$input.blur();
            this._$input.val('');
        }
    }

}

export default App;
