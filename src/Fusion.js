
/*------------------------------------------------------------------------------

    Fusion-JS - Simple JavaScript Framework

    by: Matko Bulic <bulicmatko@gmail.com>

------------------------------------------------------------------------------*/

'use strict';

// Import jQuery
import $ from 'jquery';

// Import Underscore
import _ from 'underscore';

// Import Backbone
import Backbone from 'backbone';

// Import Modules
import Model        from './Model.js';
import Collection   from './Collection.js';
import View         from './View.js';
import Component    from './Component.js';
import Controller   from './Controller.js';
import App          from './App.js';
import Router       from './Router.js';

/**
 *  Fusion
 */
class Fusion {

    /**
     *  Constructor
     *  @constructor
     */
    constructor () {

        // jQuery
        this.$ = $;

        // Underscore
        this._ = _;

        // Backbone
        this.Backbone = Backbone;

        // Modules
        this.Model      = Model;
        this.Collection = Collection;
        this.View       = View;
        this.Component  = Component;
        this.Controller = Controller;
        this.App        = App;
        this.Router     = Router;

    }

}

// Export Instance of Fusion
export default new Fusion();
