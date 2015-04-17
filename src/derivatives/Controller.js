
/*------------------------------------------------------------------------------

	Controller

------------------------------------------------------------------------------*/

'use strict';

// Import Modules
import View from '../core/View.js';

/**
 *	Controller
 *
 *	Extended Fusion View
 */
var Controller = View.extend({

	/**
	 *	Constructor
	 *
	 *	@param	{arguments}	arguments	Arguments
	 *
	 *	@return	{object}	this		Controller constructor
	 */
	constructor: function () {

		this.activeComponent = {
			name:	null,
			view:	null
		},

		View.apply(this, arguments);

		return this;

	},

	/**
	 *	Initialize Method
	 *
	 * 	Initialize controller method.
	 *
	 *	@param	{string}	name	Method name
	 *	@param	{object}	data	JSON object
	 *
	 *	@return	{object}	this	Instance of this controller
	 */
	initMethod: function (name, data) {

		this[name] && this[name](data);

		return this;

	}

});

// Export Controller
export default Controller;
