import DOMElement from 'structurejs/display/DOMElement';

/**
 * TODO: YUIDoc_comment
 *
 * @class FooterView
 * @extends DOMElement
 * @constructor
 **/
class FooterView extends DOMElement {

    /**
     * TODO: YUIDoc_comment
     *
     * @property _$clearCompletedBtn
     * @type {jQuery}
     * @protected
     */
    _$clearCompletedBtn = null;

    constructor($element) {
        super($element);
    }

    /**
     * @overridden DOMElement.create
     */
    create() {
        super.create();

        this._$clearCompletedBtn = this.$element.find('.js-FooterView-clearCompletedBtn');
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

export default FooterView;
