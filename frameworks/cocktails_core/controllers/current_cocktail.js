/**
 * Controller to track a current cocktail a user is viewing and eventually
 * actions that a user may be able to do with that cocktail (i.e. edit, save
 * to favorites etc).
 * @type {SC.ObjectController}
 */
CocktailsCore.CurrentCocktailController = SC.ObjectController.extend({
    /**
     * Cocktail record if a cocktail is being viewed
     * otherwise null.
     * @type {CocktailsApp.Cocktail}
     */
    content: null
});