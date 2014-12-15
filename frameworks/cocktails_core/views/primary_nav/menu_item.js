// ==========================================================================
// Project:   CocktailsCore - menu item view
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsCore */

sc_require('gestures/tap');
sc_require('mixins/event_feedback');

/**
 * To cut down on repeated code this view holds the common code for each
 * menu item in the primary navigation menu. It can then be configured
 * on what text to display and which route to go to.
 *
 * @type {CocktailsCore.PrimaryNavMenuItem}
 * @extends {SC.View}
 */
CocktailsCore.PrimaryNavMenuItem = SC.LabelView.extend(SC.ActionSupport, SC.Gesturable, CocktailsCore.EventFeedback, {
    layout: {height: 48},

    /**
     * The text value the menu item is to display
     * @type {String}
     */
    value: null,

    /**
     * A string specifying which route the menu
     * item should navigate to
     * @type {String}
     */
    routeLocation: null,

    ////////////////////
    // Desktop Events //
    ////////////////////

    mouseDown: function(evt) {
        return YES;
    },

    mouseUp: function(evt) {
        var that = this;

        // define what should happen after our event feedback
        var callback = function() {
            // need to call code within a new runloop as the callback
            // by default runs outside the main runloop
            SC.run(function(){
                var routeLocation = that.get('routeLocation');

                if(!routeLocation) {
                    SC.warn('Oh Noes: this menu item has no route location!');
                    return NO;
                }

                // route to single cocktail view
                SC.routes.set('location', routeLocation);
                that.fireAction('hideMenuAction');
            });
        };

        // give event feedback when a click or touch occurs
        this._radialFeedback(evt, callback);

        return YES;
    },

    //////////////////
    // Touch Events //
    //////////////////

    /**
     * An array of gestures we want to setup and customize
     * @type {Array}
     */
    gestures: ['navMenuItemTapGesture'],

    /**
     * since we specify the tap gesture in `gestures`
     * we can specify finer details of what defines
     * a tap.
     * @type {SC.TapGesture}
     */
    navMenuItemTapGesture: CocktailsCore.TapGesture,

    /**
     * A shortcut to running code when a tap occurs instead of using
     * `tapStart` and `tapEnd` we use this method which is called when
     * `tapStart` and `tapEnd` are both called (i.e. a tap occurred). In
     * this case all we do is call `mouseUp` so the same happens as if the
     * tap were a click.
     * @param  {Touch} touch The touch event
     */
    tap: function(gesture, touch) {
        this.mouseUp(touch);
    }
})