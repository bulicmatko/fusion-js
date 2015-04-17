
/*------------------------------------------------------------------------------

	Fusion-JS - Simple JavaScript Framework

	by: Matko Bulic <bulicmatko@gmail.com>

------------------------------------------------------------------------------*/

'use strict';

// Import jQuery
import jQuery		from 'jquery';

// Import Underscore
import Underscore	from 'underscore';

// Import Backbone
import Backbone		from 'backbone';

// Import Flux
import Flux			from 'flux';

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
		this.jQuery		= jQuery;
		this.$			= this.jQuery;

		// Underscore
		this.Underscore	= Underscore;
		this._			= this.Underscore;

		// Backbone
		this.Backbone	= Backbone;

		// Flux
		this.Flux		= Flux;

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

		// Dispatcher
		this.Dispatcher	= Flux.Dispatcher;

	}

}

// Export Instance of Fusion
export default new Fusion();
