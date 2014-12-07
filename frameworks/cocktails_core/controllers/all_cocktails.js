/**
 * Controller to keep track of all cocktails for the application and
 * used.
 * @type {SC.ArrayController}
 */
CocktailsCore.AllCocktailsController = SC.ArrayController.extend({
    /**
     * Array of cocktail records
     * @type {Array}
     */
    content: null,

    /**
     * Order cocktails by name in ascending order by default
     * @type {String}
     */
    orderBy: 'name ASC'
});


