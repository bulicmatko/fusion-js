
/*------------------------------------------------------------------------------

	Fusion-JS - Simple JavaScript Framework

	by: Matko Bulic <bulicmatko@gmail.com>

------------------------------------------------------------------------------*/

'use strict';

// Import jQuery
import $			from 'jquery';

// Import Underscore
import _			from 'underscore';

// Import Backbone
import Backbone		from 'backbone';

// Import DiffDOM
import DiffDOM		from 'diff-dom';

// Import Core Modules
import Model		from './core/Model.js';
import Collection	from './core/Collection.js';
import Router		from './core/Router.js';
import View			from './core/View.js';

// Import Derivative Modules
import Component	from './derivatives/Component.js';
import Controller	from './derivatives/Controller.js';
import App			from './derivatives/App.js';

//
class Fusion {

	/**
	 * Constructor
	 *
	 *	@return	void
	 */
	constructor () {

		// jQuery
		this.$			= $;

		// Underscore
		this._			= _;

		// Backbone
		this.Backbone	= Backbone;

		// DiffDOM
		this.DiffDOM	= DiffDOM;

		// Core Modules
		this.Model		= Model;
		this.Collection	= Collection;
		this.Router		= Router;
		this.View		= View;

		// // Derivative Modules
		this.Component	= Component;
		this.Controller	= Controller;
		this.App		= App;

	}

}

// Export Instance of Fusion
export default new Fusion();
