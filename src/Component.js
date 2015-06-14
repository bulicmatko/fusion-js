
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
     *
     *  @param  {arguments} arguments   Component arguments
     *  @return {Object}    this        Component constructor
     */
    constructor () {

        this.components = {};

        View.apply(this, arguments);

        return this;

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
