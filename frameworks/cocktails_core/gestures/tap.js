// ==========================================================================
// Project:   CocktailsCore - tap gesture
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsCore */

/**
 * A generic tap gesture used throughout the application
 * @type {CocktailsCore.TapGesture}
 * @extends {SC.TapGesture}
 */
CocktailsCore.TapGesture = SC.TapGesture.extend({
    acceptsMultitouch: NO,
    tapDelay: 200,
    tapWiggle: 20
});