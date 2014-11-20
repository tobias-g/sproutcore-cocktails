// ==========================================================================
// Project:   CocktailsApp - cocktail list
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsApp */

/**
 * Cocktails list view component used in "all cocktails" view and
 * "personal cocktails" view to render a list of cocktails. We use
 * the render and update methods to render each item for performance
 * rather than nested SC.Views.
 * @type {CocktailsApp.CommonCocktailsListView}
 * @extends {SC.ListView}
 */
CocktailsApp.CommonCocktailsListView = SC.ListView.extend({
    /**
     * Row height so the list can use it for performance
     * boosting when scrolling.
     * @type {Number}
     */
    rowHeight: 72,

    /**
     * Class names for styling
     * @type {Array}
     */
    classNames: ['cocktails-list'],

    /**
     * View for each item in the list.
     *
     * Note: we have to mixin `SC.ContentDisplay`
     * so our views update properly when the content changes.
     *
     * Note: we also have to mixin `SC.Gesturable` for out touch
     * events to work.
     *
     * @type {SC.View}
     */
    exampleView: SC.View.extend(SC.ContentDisplay, SC.Gesturable, {
        classNames: ['cocktail-item'],
        layout: {height: 72},

        ////////////////////
        // Desktop Events //
        ////////////////////

        mouseDown: function(evt) {
            return YES;
        },

        mouseUp: function(evt) {
            // route to single cocktail view
            SC.routes.set('location', 'cocktail/' + this.getPath('content.id'));

            return YES;
        },

        //////////////////
        // Touch Events //
        //////////////////

        /**
         * An array of gestures we want to setup and customize
         * @type {Array}
         */
        gestures: ['cocktailsListTapGesture'],

        /**
         * since we specify the tap gesture in `gestures`
         * we can specify finer details of what defines
         * a tap.
         * @type {SC.TapGesture}
         */
        cocktailsListTapGesture: SC.TapGesture.extend({
            acceptsMultitouch: NO,
            tapDelay: 200,
            tapWiggle: 20
        }),

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
        },

        ///////////////////////
        // Render and update //
        ///////////////////////

        /**
         * Render method used first time a element needs to be rendered
         * @param  {SC.Object} context Object used to build the render
         */
        render: function(context) {
            var content = this.get('content');

            context.begin()
                .setClass({
                    'cocktails-item-icon': YES
                })
            .end();

            context.begin()
                .setClass({
                    'cocktails-item-name': YES
                })
                .push(content.get('name'))
            .end();

            context.begin()
                .setClass({
                    'cocktails-item-description': YES
                })
                .push(content.get('description'))
            .end();

            context.begin()
                .setClass({
                    'cocktail-item-border-bottom': YES
                })
            .end();
        },

        /**
         * Update method to update a cocktail name, description and icon
         * when this changes for a rendered item. This should happen when
         * the list is scrolled to re-use existing elements in the list
         * that go out of view (element pooling).
         * @param  {object} $context jQuery object of the item element
         */
        update: function($context) {
            $context.find('.cocktails-item-name').text(this.getPath('content.name'));
            $context.find('.cocktails-item-description').text(this.getPath('content.description'));
        }
    })
});