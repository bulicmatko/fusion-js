
/*------------------------------------------------------------------------------

	Application

------------------------------------------------------------------------------*/

'use strict';

// Import Modules
import View from '../core/View.js';

/**
 *	Application
 *
 *	Extended Fusion View
 */
var App = View.extend({

	/**
	 *	Constructor
	 *
	 *	@param	{arguments}	arguments	Arguments
	 *
	 *	@return	{object}	this		App constructor
	 */
	constructor: function () {

		this.activeController = {
			name:	null,
			view:	null
		},

		View.apply(this, arguments);

		return this;

	},

	/**
	 *	Initialize Controller
	 *
	 * 	Initialize controller and method by name with given data.
	 * 	If controller is already initialized, run given method with given data.
	 *
	 *	@param	{string}	name		Controller name
	 *	@param	{string}	method		Method name
	 *	@param	{object}	data		JSON Object
	 *
	 *	@return	{object}	controller	Initialized controller
	 */
	initController: function (name, method, data) {

		if (this.activeController.name === name) {

			this.activeController.view.initMethod(method, data);

		} else {

			this.activeController.view && (this.activeController.view.close());

			this.activeController.view = this.addSubview(new this.controllers[name]({method: method, data: data}));

			this.activeController.name = name;

		}

		return this.activeController.view;

	}

});

// Export App
export default App;
