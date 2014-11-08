/**
 * The model for ingredients. Ingredients have only
 * a name and description. If no description is
 * present for the record we set it to a default value.
 *
 * @type {CocktailsApp.Ingredient}
 * @extends {SC.Record}
 */
CocktailsApp.Ingredient = SC.Record.extend({

    /**
     * Set our primary key property as 'id'
     * @type {String}
     */
    primaryKey: 'id',

    /**
     * The name of the ingredient
     * @type {String}
     */
    name: SC.Record.attr(String, {
        key: 'name'
    }),

    /**
     * The description for our ingredient. If no description
     * is available use the default value.
     * @type {String}
     */
    description: SC.Record.attr(String, {
        key: 'description',
        /**
         * Value used when no description is present for the record.
         * @type {String}
         */
        defaultValue: 'Awaiting Description'
    })

});