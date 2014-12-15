/**
 * The model for users in our application. We will
 * need to track a user to we can store ingredients
 * against them thus storing an inventory to use
 * when determining a users personal cocktails.
 *
 * @type {CocktailsCore.User}
 * @extends {SC.Record}
 */
CocktailsCore.User = SC.Record.extend({

    /**
     * Set our primary key property as 'id'
     * @type {String}
     */
    primaryKey: 'id',

    /**
     * An email for a user
     * @type {String}
     */
    email: SC.Record.attr(String, {
        key: 'email'
    }),

    /**
     * A password for a user
     * @type {String}
     */
    password: SC.Record.attr(String, {
        key: 'password'
    }),

    /**
     * Array of the ingredients (or inventory) associated with the user
     * @type {CocktailsCore.Ingredient}
     */
    ingredients: SC.Record.toMany('CocktailsCore.Ingredient', {
        key: 'ingredients',
        isMaster: YES,
    })

});