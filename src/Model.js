
/*------------------------------------------------------------------------------

    Model

------------------------------------------------------------------------------*/

'use strict';

// Import Underscore
import _ from 'underscore';

// Import Backbone
import Backbone from 'backbone';

/**
 *  Model
 *  Extended Backbone Model
 */
var Model = Backbone.Model.extend({

    /**
     *  Set Serialized Data
     *  Set serialized data to model attributes.
     *
     *  @param  {array}     data    jQuery '.serializeArray()' like object
     *                              =>  [
     *                                      {name: 'firstName', value: 'Matko'},
     *                                      {name: 'lastName', value: 'Bulic'}
     *                                  ]
     *  @param  {Object}    options Options object
     *                              =>  {only: ['firstName', 'lastName']}
     *                                  or
     *                                  {except: ['_method', 'password']}
     *  @return {Object}    this    Instance of this model
     */
    setSerializedData (data, options = {}) {

        options.only && (data = _.filter(data, (item) => {
            if (_.contains(options.only, item.name)) { return item; }
        }));

        options.except && (data = _.filter(data, (item) => {
            if (!_.contains(options.except, item.name)) { return item; }
        }));

        _.each(data, (item) => {
            this.set(item.name, item.value);
        });

        return this;

    }

});

// Export Model
export default Model;
