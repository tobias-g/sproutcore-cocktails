/**
 * The model for users in our application. We will
 * need to track a user to we can store ingredients
 * against them thus storing an inventory to use
 * when determining a users personal cocktails.
 *
 * @type {CocktailsApp.User}
 * @extends {SC.Record}
 */
CocktailsApp.User = SC.Record.extend({

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
    })

});