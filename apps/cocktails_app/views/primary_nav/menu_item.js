// ==========================================================================
// Project:   CocktailsApp - header view
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsApp, CocktailsCore */

sc_require('gestures/tap');

/**
 * To cut down on repeated code this view holds the common code for each
 * menu item in the primary navigation menu. It can then be configured
 * on what text to display and which route to go to.
 *
 * @type {CocktailsApp.PrimaryNavMenuItem}
 * @extends {SC.View}
 */
CocktailsApp.PrimaryNavMenuItem = SC.LabelView.extend(SC.ActionSupport, SC.Gesturable, {
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
        var routeLocation = this.get('routeLocation');

        if(!routeLocation) {
            SC.warn('Oh Noes: this menu item has no route location!');
            return NO;
        }

        // route to single cocktail view
        SC.routes.set('location', routeLocation);
        this.fireAction('hideMenuAction');
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
    navMenuItemTapGesture: CocktailsApp.TapGesture,

    /**
     * Here we would put any code we wanted to run if Sproutcore
     * though a tap was starting.
     * @param  {Touch} touch The touch event
     */
    tapStart: function(touch) {},

    /**
     * Here we would put any code to run when Sproutcore confirmed
     * a tap happened and completed.
     * @param  {Touch} touch The touch event
     */
    tapEnd: function(touch) {},

    /**
     * A shortcut to running code when a tap occurs instead of using
     * `tapStart` and `tapEnd` we use this method which is called when
     * `tapStart` and `tapEnd` are both called (i.e. a tap occurred). In
     * this case all we do is call `mouseUp` so the same happens as if the
     * tap were a click.
     * @param  {Touch} touch The touch event
     */
    tap: function(touch) {
        this.mouseUp(touch);
    }
})