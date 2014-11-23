// ==========================================================================
// Project:   CocktailsApp - tap gesture
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsApp, CocktailsCore */

/**
 * A generic tap gesture used throughout the application
 * @type {CocktailsApp.TapGesture}
 * @extends {SC.TapGesture}
 */
CocktailsApp.TapGesture = SC.TapGesture.extend({
    acceptsMultitouch: NO,
    tapDelay: 200,
    tapWiggle: 20
});