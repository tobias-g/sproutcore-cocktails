// ==========================================================================
// Project:   CocktailsApp - header view
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsApp, CocktailsCore */

sc_require('gestures/tap');

/**
 * The primary header view for the application.
 * @type {CocktailsApp.ToolbarPrimaryHeader}
 * @extends {SC.View}
 */
CocktailsApp.ToolbarPrimaryHeader = SC.View.extend({

    classNames: ['primary-header-view'],

    layout: {height: 52},

    //////////////////
    // Child Views //
    //////////////////

    childViews: ['leftIconView', 'titleView'],

    /**
     * The view to display the icon to the left of the primary
     * header. Its main purpose is to expand and collapse the
     * primary navigation menu or if viewing a single resource
     * such as a cocktail to navigate back to the previous root
     * view (i.e. back to all cocktails or personal cocktails).
     *
     * TODO: add ability to use the icon as a back button when
     * viewing a single cocktail
     */
    leftIconView: SC.ImageView.design(SC.ActionSupport, SC.Gesturable, {
        classNames: ['primary-header-icon'],

        layout: {height: 52, width: 52},

        scale: SC.SCALE_NONE,
        value: sc_static('/images/hamburger.png'),

        mouseDown: function(evt) {
            return YES;
        },

        mouseUp: function(evt) {
            var action = CocktailsApp.statechart.stateIsCurrentState('hiddenMenuState') ? 'showMenuAction' : 'hideMenuAction';

            this.fireAction(action);
            return YES;
        },

        //////////////////
        // Touch Events //
        //////////////////

        /**
         * An array of gestures we want to setup and customize
         * @type {Array}
         */
        gestures: ['headerIconTapGesture'],

        /**
         * since we specify the tap gesture in `gestures`
         * we can specify finer details of what defines
         * a tap.
         * @type {SC.TapGesture}
         */
        headerIconTapGesture: CocktailsApp.TapGesture,

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
    }),

    titleView: SC.LabelView.design({
        layout: {left: 52},

        classNames: ['primary-header-title'],

        valueBinding: SC.Binding.oneWay('CocktailsApp.primaryHeaderController.displayText')
    })
});