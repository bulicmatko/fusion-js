
/*------------------------------------------------------------------------------

	Model

------------------------------------------------------------------------------*/

'use strict';

// Import Node Modules
import _		from 'underscore';
import Backbone	from 'backbone';

/**
 *	Model
 *
 *	Extended Backbone Model
 */
var Model = Backbone.Model.extend({

	/**
	 *	Add Form Data
	 *
	 *	Add form data to model attributes.
	 *
	 *	@param	{object}	data	jQuery '.serializeArray()' like object
	 *	@param	{object}	options	Options object	{only: ['firstname', 'lastname']}
	 *	                        	 				{except: ['password', '_method']}
	 *
	 *	@return	{object}	this	Instance of this model
	 */
	addFormData: function (data, options) {

		options = options || {};

		options.only && (data = _.filter(data, function (item) {
			if (_.contains(options.only, item.name)) { return item; }
		}));

		options.except && (data = _.filter(data, function (item) {
			if (!_.contains(options.except, item.name)) { return item; }
		}));

		_.each(data, function (item) {
			this.set(item.name, item.value);
		}, this);

		return this;

	}

});

// Export Model
export default Model;
