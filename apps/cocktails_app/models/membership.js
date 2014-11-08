/**
 * The model for our membership records. Memberships are used
 * to link a ingredient to a cocktail with an amount. Also cocktails
 * can have ingredients where a substitute ingredient could be
 * used instead. The membership model takes this into account with
 * the listIndex and substituteIndex properties.
 *
 * @type {CocktailsApp.Membership}
 * @extends {SC.Record}
 */
CocktailsApp.Membership = SC.Record.extend({

    /**
     * Set our primary key property as 'id'
     * @type {String}
     */
    primaryKey: 'id',

    /**
     * The amount of a certain ingredient that
     * is required.
     * @type {String}
     */
    amount: SC.Record.attr(String, {
        key: 'amount'
    }),

    /**
     * The list index is used to define where the ingredient
     * should fall in the list of ingredients. If two memberships
     * for the same cocktail have the same list index it means
     * they can be used interchangeably.
     * indexes.
     * @type {Number}
     */
    listIndex: SC.Record.attr(Number, {
        key: 'list_index'
    }),

    /**
     * When two memberships for the same cocktail have the same
     * list index the substitute index defines which of the two
     * (or more) are the preferred ingredient to use. The lower
     * the substitute index the higher the preference. A list index
     * and substitute index that both match means there is no
     * preferred ingredient to use.
     * @type {Numeber}
     */
    substituteIndex: SC.Record.attr(Number, {
        key: 'substitute_index'
    })

});