// ==========================================================================
// Project:   CocktailsApp - carousel view navigation button
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsApp, CocktailsCore */

sc_require('gestures/tap');

/**
 * Button for navigating between views in the carousel view
 */
CocktailsApp.CommonCarouselNavButtonView = SC.View.extend(SC.Gesturable, {

    classNames: ['carousel-nav-button'],

    collectionView: null,
    collectionViewBinding: '.parentView.collectionView',

    transitionHide: SC.View.FADE_OUT,
    transitionShow: SC.View.FADE_IN,

    ////////////////////
    // Desktop Events //
    ////////////////////

    mouseDown: function(evt) { return true; },

    /**
     * On mouse up we increment the currentIndex property for our
     * carousel view
     */
    mouseUp: function(evt) {
        SC.warn('carousel navigation button needs to be implemented to either increment or '
            + 'decrement `currentIndex` on the collection view');
    },

    //////////////////
    // Touch Events //
    //////////////////

    /**
     * An array of gestures we want to setup and customize
     * @type {Array}
     */
    gestures: ['carouselNavTapGesture'],

    /**
     * since we specify the tap gesture in `gestures`
     * we can specify finer details of what defines
     * a tap.
     * @type {SC.TapGesture}
     */
    carouselNavTapGesture: CocktailsApp.TapGesture,

    /**
     * Simple proxy to the mouseUp method
     * @param  {Touch} touch The touch event
     */
    tap: function(gesture, touch) {
        this.mouseUp(touch);
    }
});