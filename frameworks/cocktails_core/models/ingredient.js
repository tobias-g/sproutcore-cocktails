/**
 * The model for ingredients. Ingredients have only
 * a name and description. If no description is
 * present for the record we set it to a default value.
 *
 * @type {CocktailsCore.Ingredient}
 * @extends {SC.Record}
 */
CocktailsCore.Ingredient = SC.Record.extend({

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
    }),

    /**
     * Transient property used to track if a user has the ingredient
     * record in their inventory. This relationship is persisted via
     * the CocktailsCore.User ingredients property and once these are
     * loaded each ingredients model hasIngredient is updated.
     * @type {Boolean}
     */
    hasIngredient: NO

});