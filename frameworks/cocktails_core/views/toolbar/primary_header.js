// ==========================================================================
// Project:   CocktailsCore - header view
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsCore */

sc_require('gestures/tap');
sc_require('mixins/event_feedback');

/**
 * The primary header view for the application.
 * @type {CocktailsCore.ToolbarPrimaryHeader}
 * @extends {SC.View}
 */
CocktailsCore.ToolbarPrimaryHeader = SC.View.extend({

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
     */
    leftIconView: SC.View.design(SC.ActionSupport, SC.Gesturable, CocktailsCore.EventFeedback, {
        classNames: ['primary-header-icon'],

        layout: {height: 52, width: 52},

        childViews: ['svgIconView'],

        ////////////////////
        // Desktop Events //
        ////////////////////

        mouseDown: function(evt) {
            return YES;
        },

        mouseUp: function(evt) {
            // give event feedback when a click or touch occurs
            this._radialFeedback(evt);

            var inSingleCocktialState = CocktailsApp.statechart.stateIsCurrentState('showingCocktailState'),
                menuAction = CocktailsApp.statechart.stateIsCurrentState('hiddenMenuState') ? 'showMenuAction' : 'hideMenuAction',
                action;

            action = inSingleCocktialState ? 'goBackAction' : menuAction ;

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
        headerIconTapGesture: CocktailsCore.TapGesture,

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
        },

        /**
         * View that contains our SVG icon
         */
        svgIconView: SC.View.design({
            layout: {left: 10, top: 10, width: 32, height: 32},

            /**
             * Flag to say if SVG is loaded and appended ready
             * for manipulation.
             * @type {Boolean}
             */
            svgIsLoaded: false,

            /**
             * SVG options describing aspects of our SVG icon
             * @type {Object}
             */
            options: {
                speed : 200,// time for animation to complete
                easing : mina.backin,// Snap.svg easing see http://snapsvg.io/docs/#mina
                size : { w : 32, h : 32 }// dimensions of the svg in pixels
            },

            didAppendToDocument: function() {
                // create the svg using snap svg
                var svg = Snap( this.options.size.w, this.options.size.h );

                // our SVG file (hamburger.svg) defines a width and height of
                // 64 by 64. Here we set the view port (via the viewBox attribute)
                // which defines how much of the SVG we want to display. Since
                // we want to obviously display all of our SVG we set the viewBox
                // to from x & y point 0 to 64 on both axis
                svg.attr( 'viewBox', '0 0 64 64' );

                // append the created svg to the layer
                this.get('layer').appendChild( svg.node );

                // store a reference to this for the snap svg load
                // callback and also store the svg container to append
                // the resulting graphic too in the load callback
                var self = this;
                this.svg = svg;

                // load external svg
                Snap.load( svgIconConfig.hamburger.url, function (f) {
                    // once loaded get the graphic, append it and set the
                    // views `svgIsLoaded` flag to true
                    var g = f.select( 'g' );
                    self.svg.append( g );
                    self.set('svgIsLoaded', true);
                });
            },

            /////////////////////////////
            // SVG animation functions //
            /////////////////////////////

            /**
             * Used to animate the SVG to a certain shape or state. The first parameter
             * tells the function which state to animate the SVG to while the second is
             * used to say whether the SVG should animate or simply change without any
             * animation.
             *
             * @param  {String} state       expanded | collapsed
             * @param  {Boolean} animate    true if animation should occur otherwise
             *                              suppress animation effects
             */
            animateTo: function(state, animate) {
                for( var i = 0, len = svgIconConfig.hamburger.animation.length; i < len; ++i ) {
                    var a = svgIconConfig.hamburger.animation[ i ],
                        iconView = this,
                        el = iconView.svg.select( a.el ),
                        animProp = a.animProperties[state],
                        val = animProp.val;

                    if(animate) {
                        setTimeout(function( el, val, animProp ) {
                            return function() { el.animate( JSON.parse( val ), iconView.options.speed, iconView.options.easing, function() {
                                if( animProp.after ) {
                                    this.attr( JSON.parse( animProp.after ) );
                                }
                                if( animProp.animAfter ) {
                                    this.animate( JSON.parse( animProp.animAfter ), iconView.options.speed, iconView.options.easing );
                                }
                            } ); };
                        }( el, val, animProp ));
                    }
                    else {
                        el.attr( JSON.parse( val ) );
                    }
                }
            }
        })
    }),

    titleView: SC.LabelView.design({
        layout: {left: 52},

        classNames: ['primary-header-title'],

        valueBinding: SC.Binding.oneWay('CocktailsCore.primaryHeaderController.displayText')
    })
});