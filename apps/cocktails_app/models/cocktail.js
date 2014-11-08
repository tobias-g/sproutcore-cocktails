/**
 * The model for a cocktail record. Our cocktail
 * records are pretty simple and only have a name
 * and description.
 *
 * TODO: add the relationship between cocktails
 * and ingredients via memberships.
 *
 * @type {CocktailsApp.Cocktail}
 * @extends {SC.Record}
 */
CocktailsApp.Cocktail = SC.Record.extend({

    /**
     * Set our primary key property as 'id'
     * @type {String}
     */
    primaryKey: 'id',

    /**
     * The name of the cocktail
     * @type {String}
     */
    name: SC.Record.attr(String, {
        key: 'name'
    }),

    /**
     * The description for our cocktail that will describe
     * the process of how to create the cocktail.
     * @type {String}
     */
    description: SC.Record.attr(String, {
        key: 'description'
    }),

    /**
     * Memberships are the link between ingredients and cocktails
     * that also describe the ingredient amount required and
     * what substitutes could be used for an ingredient.
     * @type {[type]}
     */
    memberships: SC.Record.toMany('CocktailsApp.Membership', {
        key: 'memberships',
        isMaster: YES,
        inverse: 'cocktail'
    })

});