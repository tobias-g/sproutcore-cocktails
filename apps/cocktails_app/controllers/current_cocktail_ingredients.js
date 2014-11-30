/**
 * Controller that takes the memberships from the current cocktail in
 * `CocktailsApp.currentCocktailController` and transforms the memberships
 * to a 2 dimensional array grouping memberships with the same `listIndex`.
 *
 * This allows us to implement a carousel view for ingredients with substitutes
 * in the single cocktail view.
 *
 * @type {SC.ObjectController}
 */
CocktailsApp.CurrentCocktailIngredientsController = SC.ArrayController.extend({
    contentBinding: SC.Binding.transform(function (memberships, binding) {
        return memberships ? memberships.groupBy('listIndex') : [] ;
    }).from("CocktailsApp.currentCocktailController.memberships")
});