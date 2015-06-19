
/*------------------------------------------------------------------------------

    View

------------------------------------------------------------------------------*/

'use strict';

// Import jQuery
import $ from 'jquery';

// Import Underscore
import _ from 'underscore';

// Import Backbone
import Backbone from 'backbone';

// Reference jQuery to Backbone.$
Backbone.$ = $;

/**
 *  View
 *  Extended Backbone View
 */
var View = Backbone.View.extend({

    /**
     *  Constructor
     *  @constructor
     */
    constructor () {

        this.templates  = {};
        this.regions    = {};
        this.subviews   = [];
        this.deferreds  = [];

        Backbone.View.apply(this, arguments);

    },

    /**
     *  Add Template
     *  Add compiled template to templates collection.
     *
     *  @param  {string}    name        Template name
     *  @param  {function}  template    Compiled template
     *  @return {function}  template    Compiled template
     */
    addTemplate (name, template) {

        return this.templates[name] = template;

    },

    /**
     *  Make HTML
     *  Make HTML from existing template with given data.
     *
     *  @param  {string}    template            Template name
     *  @param  {Object}    data                Data to be added to template
     *  @return {mixed}     string or undefined If template exist created HTML will be returned
     */
    makeHTML (template, data) {

        return this.templates[template] && (this.templates[template](data));

    },

    /**
     *  Remove Template
     *  Remove compiled template from view templates collection.
     *
     *  @param  {string}    name                Template name
     *  @return {mixed}     undefined or true   Returns true if template is succesfully removed
     */
    removeTemplate (name) {

        return this.templates[name] && (delete this.templates[name]);

    },

    /**
     *  Add Region
     *  Add region for easier subviews rendering.
     *
     *  @param  {string}    name        Region name
     *  @param  {string}    selector    CSS Selector
     *  @return {Object}    $region     Region jQuery object
     */
    addRegion (name, selector) {

        return this.regions[name] = this.$(selector);

    },

    /**
     *  Render To
     *  Render html templates to existing regions.
     *
     *  @param  {string}    region  Region name
     *  @param  {array}     htmls   Array of html templates
     *  @return {Object}    this    Instance of this view
     */
    renderTo (region, htmls) {

        this.regions[region] && (this.regions[region].empty());

        _.each(htmls, (html) => {
            this.regions[region] && (this.regions[region].append(html));
        });

        return this;

    },

    /**
     *  Remove Region
     *  Remove region.
     *
     *  @param  {string}    name                Region name
     *  @return {mixed}     undefined or true   Returns true if region is succesfully removed
     */
    removeRegion (name) {

        return this.regions[name] && (delete this.regions[name]);

    },

    /**
     *  Add Subview
     *  Add subview.
     *
     *  @param  {Object}    view    View instance
     *  @return {Object}    view    View instance
     */
    addSubview (view) {

        var index = this.subviews.length;

        this.subviews.push(view);

        view.model && (this.listenTo(view.model, 'destroy', view.close));

        view.on('close', () => {
            this.subviews.splice(index, 1);
        });

        return view;

    },

    /**
     *  Add Deferred
     *  Add deferred.
     *
     *  @param  {Object}    deferred    jQuery deferred like object
     *  @return {Object}    deferred    jQuery deferred like object
     */
    addDeferred (deferred) {

        var index = this.deferreds.length;

        this.deferreds.push(deferred);

        deferred.always(() => {
            this.deferreds.splice(index, 1);
        });

        return deferred;

    },

    /**
     *  Close View
     *  Close view and cleanup.
     */
    close () {

        _.invoke(this.subviews, 'close');
        _.invoke(this.deferreds, 'abort');

        this.remove();
        this.trigger('close');

    }

});

// Export View
export default View;
