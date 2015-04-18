
/*------------------------------------------------------------------------------

	View

------------------------------------------------------------------------------*/

'use strict';

// Import Node Modules
import $		from 'jquery';
import _		from 'underscore';
import Backbone	from 'backbone';
import DiffDom	from 'diff-dom';
import Flux		from 'flux';

// Add jQuery reference to Backbone.$ variable
Backbone.$ = $;

/**
 *	View
 *
 *	Extended Backbone View
 */
var View = Backbone.View.extend({

	/**
	 *	Constructor
	 *
	 *	@param	{arguments}	arguments	Arguments
	 *
	 *	@return	{object}	this		View constructor
	 */
	constructor: function () {

		this.templates		= {},
		this.regions		= {},
		this.subviews		= {},
		this.modelSubviews	= {},
		this.deferreds		= [],

		Backbone.View.apply(this, arguments);

		return this;

	},

	/**
	 *	Diff Dom
	 *
	 *	Create DiffDom reference
	 */

	diffDom: new DiffDom(),

	/**
	 *	Dispatcher
	 *
	 *	Create Flux Dispatcher reference
	 */

	dispatcher: new Flux.Dispatcher(),

	/**
	 *	Add Template
	 *
	 *	Add compiled Handlebars template to view templates collection.
	 *
	 *	@param	{string}	name		Template name
	 *	@param	{function}	template	Compiled Handlebars template
	 *
	 *	@return	{object}	template	Compiled Handlebars template
	 */
	addTemplate: function (name, template) {

		return this.templates[name] = template;

	},

	/**
	 *	Add Region
	 *
	 *	Add regions/containers for easier subviews rendering.
	 *
	 *	@param	{string}	name		Region name
	 *	@param	{string}	selector	jQuery selector
	 *
	 *	@return	{object}	$region		Region as jQuery object
	 */
	addRegion: function (name, selector) {

		return this.regions[name] = this.$(selector);

	},

	/**
	 *	Add Subview
	 *
	 *	Add subview to current view.
	 *
	 *	@param	{object}	view	View
	 *
	 *	@return	{object}	view	View
	 */
	addSubview: function (view) {

		this.subviews[view.cid] = view;

		view.model && (this.modelSubviews[view.model.cid] = view);

		view.on('close', function () {

			delete this.subviews[view.cid];
			view.model && (delete this.modelSubviews[view.model.cid]);

		}.bind(this));

		return view;

	},

	/**
	 *	Add Deferred
	 *
	 *	Add deferred to current view.
	 *
	 *	@param	{object}	deferred	jQuery deferred like object
	 *
	 *	@return	{object}	deferred	jQuery deferred like object
	 */
	addDeferred: function (deferred) {

		var index = this.deferreds.length;

		this.deferreds.push(deferred);

		deferred.always(function () {
			this.deferreds.splice(index, 1);
		}.bind(this));

		return deferred;

	},

	/**
	 *	Render Views
	 *
	 *	Render views to existing regions.
	 *
	 *	@param	{string}	region	Region name
	 *	@param	{array}		views	Array of views
	 *
	 *	@return	{object}	this	Instance of this view
	 */
	renderViews: function (region, views) {

		this.regions[region].empty();

		_.each(views, function (view) {
			this.regions[region].append(view.el);
		}, this);

		return this;

	},

	/**
	 *	Render Diff
	 *
	 *	Render diff only. Differences between two views will
	 *	be applied to given region.
	 *
	 *	@param	{string}	region	Region name
	 *	@param	{object}	view	View
	 *
	 *	@return	{object}	this	Instance of this view
	 */
	renderDiff: function (region, view) {

		var oldDom	= this.regions[region][0],
			newDom	= view.el,
			diff	= this.diffDom.diff(oldDom, newDom);

		this.diffDom.apply(oldDom, diff);

		return this;

	},

	/**
	 *	Close Model Subview
	 *
	 *	Close model subview by providing view model.
	 *
	 *	@param	{object}	model	Model
	 *
	 *	@return	{object}	this	Instance of this view
	 */
	closeModelSubview: function (model) {

		this.modelSubviews[model.cid] && (this.modelSubviews[model.cid].close());

		return this;

	},

	/**
	 *	Close View
	 *
	 *	Close view and cleanup.
	 *
	 *	@return	{null}	null	Null
	 */
	close: function () {

		_.invoke(this.subviews, 'close');
		_.invoke(this.modelSubviews, 'close');

		_.invoke(this.deferreds, 'abort');

		this.remove();

		this.trigger('close');

		return null;

	}

});

// Export View
export default View;
