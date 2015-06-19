
/*------------------------------------------------------------------------------

    Component

------------------------------------------------------------------------------*/

'use strict';

// Import View
import View from './View.js';

/**
 *  Component
 *  Extended View
 */
var Component = View.extend({

    /**
     *  Constructor
     *  @constructor
     */
    constructor () {

        this.components = {};

        this.mainComponent = {
            name:   null,
            view:   null
        };

        View.apply(this, arguments);

    },

    /**
     *  Add Component
     *  Add component blueprint.
     *
     *  @param  {string}    name        Component name
     *  @param  {Object}    component   Component blueprint
     *  @return {Object}    component   Component blueprint
     */
    addComponent (name, component) {

        return this.components[name] = component;

    },

    /**
     *  Initialize Component
     *  Initialize component from existing component blueprints.
     *
     *  @param  {string}    name        Component name
     *  @param  {Object}    args        Arguments
     *  @return {mixed}     component   Component instance
     */
    initComponent (name, args) {

        return this.components[name] && (this.addSubview(new this.components[name](args)));

    },

    /**
     *  Set Up Main Component
     *  Set up main component, run component method with given data and render it to given region.
     *  If component is already initialized, just run component method with given data.
     *
     *  @param  {string}    region          Region name
     *  @param  {string}    component       Component name
     *  @param  {string}    method          Component method name
     *  @param  {Object}    data            JSON Object
     *  @return {Object}    component view  Initialized component view instance
     */
    setupMainComponent (region, component, method, data) {

        if (this.mainComponent.name === component) {

            this.mainComponent.view[method] && (this.mainComponent.view[method](data));

        } else {

            this.mainComponent.view && (this.mainComponent.view.close());

            this.mainComponent = {
                name:   component,
                view:   this.initComponent(component, {method: method, data: data})
            };

            this.renderTo(region, [this.mainComponent.view.el]);

        }

        return this.mainComponent.view;

    },

    /**
     *  Destroy Main Component
     *  Destroy main component.
     *
     *  @return {Object}    this    Instance of this component
     */
    destroyMainComponent () {

        this.mainComponent.view && (this.mainComponent.view.close());

        this.mainComponent = {
            name:   null,
            view:   null
        };

        return this;

    },

    /**
     *  Remove Component
     *  Remove component blueprint.
     *
     *  @param  {string}    name                Component name
     *  @return {mixed}     undefined or true   Returns true if component blueprint is succesfully removed
     */
    removeComponent (name) {

        return this.components[name] && (delete this.components[name]);

    }

});

// Export Component
export default Component;
