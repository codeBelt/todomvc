import DOMElement from 'structurejs/display/DOMElement';

/**
 * TODO: YUIDoc_comment
 *
 * @class BodyView
 * @extends DOMElement
 * @constructor
 **/
class BodyView extends DOMElement {

    /**
     * TODO: YUIDoc_comment
     *
     * @property _$toggleSelectAll
     * @type {jQuery}
     * @protected
     */
    _$toggleSelectAll = null;
    
    /**
     * TODO: YUIDoc_comment
     *
     * @property _$todoList
     * @type {jQuery}
     * @protected
     */
    _$todoList = null;
    
    constructor($element) {
        super($element);
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();
        
        this._$toggleSelectAll = this.$element.find('.js-BodyView-toggleSelectAll');
        this._$todoList = this.$element.find('.js-BodyView-todoList');
    }

    /**
     * @overridden DOMElement.enable
     */
    enable() {
        if (this.isEnabled === true) { return; }

        // Enable the child objects and/or add any event listeners.

        super.enable();
    }

    /**
     * @overridden DOMElement.disable
     */
    disable() {
        if (this.isEnabled === false) { return; }

        // Disable the child objects and/or remove any event listeners.

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

}

export default BodyView;
