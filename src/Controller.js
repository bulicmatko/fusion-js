
/*------------------------------------------------------------------------------

    Controller

------------------------------------------------------------------------------*/

'use strict';

// Import Component
import Component from './Component.js';

/**
 *  Controller
 *  Extended Component
 */
var Controller = Component.extend({

    /**
     *  Run Method
     *  Run controller method.
     *
     *  @param  {string}    name                        Method name
     *  @param  {Object}    data                        JSON object
     *  @return {mixed}     method return orundefined   If method exists it's result will be returned
     */
    runMethod (name, data) {

        return this[name] && (this[name](data));

    }

});

// Export Controller
export default Controller;
