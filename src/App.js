
/*------------------------------------------------------------------------------

    Application

------------------------------------------------------------------------------*/

'use strict';

// Import Controller
import Controller from './Controller.js';

/**
 *  Application
 *  Extended Controller
 */
var App = Controller.extend({

    /**
     *  Constructor
     *  @constructor
     *
     *  @param  {arguments} arguments   App arguments
     *  @return {Object}    this        App constructor
     */
    constructor () {

        this.controllers = {};

        this.activeController = {
            name:   null,
            view:   null
        };

        Controller.apply(this, arguments);

        return this;

    },

    /**
     *  Add Controller
     *  Add controller blueprint.
     *
     *  @param  {string}    name        Controller name
     *  @param  {Object}    controller  Controller blueprint
     *  @return {Object}    controller  Controller blueprint
     */
    addController: function (name, controller) {

        return this.controllers[name] = controller;

    },

    /**
     *  Initialize Controller
     *  Initialize controller and run method with given data.
     *  If controller is already initialized, just run controller method with given data.
     *
     *  @param  {string}    name            Controller name
     *  @param  {string}    method          Controller method name
     *  @param  {Object}    data            JSON Object
     *  @return {Object}    controller view Initialized controller instance
     */
    initController: function (name, method, data) {

        if (this.activeController.name === name) {

            this.activeController.view.runMethod(method, data);

        } else {

            this.activeController.view && (this.activeController.view.close());

            this.activeController.view = this.addSubview(new this.controllers[name]({method: method, data: data}));

            this.activeController.name = name;

        }

        return this.activeController.view;

    },

    /**
     *  Remove Controller
     *  Remove controller blueprint.
     *
     *  @param  {string}    name                Controller name
     *  @return {mixed}     undefined or true   Returns true if controller blueprint is succesfully removed
     */
    removeController: function (name) {

        return this.controllers[name] && (delete this.controllers[name]);

    }

});

// Export App
export default App;
