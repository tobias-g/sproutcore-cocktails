CocktailsCore.PersonalCocktailsController = SC.ArrayController.extend({
    /**
     * Array of cocktail records
     * @type {Array}
     */
    content: null,

    /**
     * Flag to tell the controller it needs to update its content next time
     * its requested. This is set flagged as true when the users inventory
     * changes
     * @type {Boolean}
     */
    needsUpdate: YES,

    /**
     * Refreshes the controllers content when called so that we can control
     * when to query the store as its rather expensive and we only want to
     * refresh it when we update the users inventory
     */
    refreshContent: function() {
        var inventory = CocktailsApp.currentUserController.getPath('content.ingredients');

        query = SC.Query.create({
            conditions: "memberships SATISFIED_BY {user_ingredients}",
            parameters: { user_ingredients: inventory },
            recordType: CocktailsApp.Cocktail,
            orderBy: "name"
        });

        this.set('content', CocktailsApp.store.find(query));

        this.set('needsUpdate', false);
    }
});