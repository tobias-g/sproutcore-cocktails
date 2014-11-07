/**
 * Controller to keep track of all cocktails for the application and
 * used.
 * @type {SC.ArrayController}
 */
CocktailsApp.AllCocktailsController = SC.ArrayController.extend({
    /**
     * Array of cocktail records
     * @type {Array}
     */
    content: [
        SC.Object.create({
            "id": 1,
            "name": "Dry Martini",
            "description": "Stir vermouth and gin over ice cubes in mixing glass. Strain into " +
            "cocktail glass. Serve with a twist of lemon peel or olive, if desired.",
        }),
        SC.Object.create({
            "id": 2,
            "name": "Manhattan",
            "description": "Stir with ice and strain into cocktail glass. Serve with a cherry."
        }),
        SC.Object.create({
            "id": 3,
            "name": "Martinez Cocktail",
            "description": "Stir with ice and strain into cocktail glass. Serve with a cherry."
        }),
        SC.Object.create({
            "id": 4,
            "name": "Old-Fashioned",
            "description": "In old-fashioned glass, put sugar cube, bitters, and water and muddle " +
            "well. Add whiskey, stir. Add a twist of lemon peel and ice cubes. Decorate with slices " +
            "of orange and lemon and a cherry. Serve with a swizzle stick."
        }),
        SC.Object.create({
            "id": 5,
            "name": "Brandy Cocktail",
            "description": "Stir ingredients with ice and strain into cocktail glass. Add a twist of lemon peel."
        }),
        SC.Object.create({
            "id": 6,
            "name": "Margarita",
            "description": "Rub rim of cocktail glass with rind of a lemon or lime, dip rim in salt. Shake " +
            "ingredients with ice and strain into salt-rimmed glass."
        }),
        SC.Object.create({
            "id": 7,
            "name": "Daiquiri",
            "description": "Shake with ice and strain into cocktail glass."
        }),
        SC.Object.create({
            "id": 8,
            "name": "Mint Julep",
            "description": "In silver julep cup, silver mug, or collins glass, muddle mint leaves, powdered " +
            "sugar and water. Fill glass or mug with shaved or crushed ice and add bourbon. Top with more ice " +
            "and garnish with a mint spring and straws."
        })
    ],

    /**
     * Order cocktails by name in ascending order by default
     * @type {String}
     */
    orderBy: 'name ASC'
});


