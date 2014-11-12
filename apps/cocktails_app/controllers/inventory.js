/**
 * Controller to track the current users inventory and perform action on it
 * such as adding and removing ingredients to the users inventory.
 * @type {SC.ArrayController}
 */
CocktailsApp.InventoryController = SC.ArrayController.extend({
    /**
     * Array of ingredient records
     * @type {Array}
     */
    contentBinding: '.ingredients',

    /**
     * Order ingredients by name in ascending order by default
     * @type {String}
     */
    orderBy: 'name ASC',

    /**
     * All ingredients the application knows about
     * @type {Array}
     */
    ingredientsBinding: SC.Binding.oneWay('CocktailsApp.ingredientsController'),

    /**
     * Ingredients the current user has associated to them
     * @type {Array}
     */
    userIngredientsBinding: 'CocktailsApp.currentUserController.content.ingredients',

    /**
     * Flag to determine if all ingredients and user inventory is loaded
     * @type {Boolean}
     */
    isLoaded: function () {
        var inventoryIsLoaded = this.get('inventoryIsLoaded'),
            ingredientsIsLoaded = this.get('ingredientsIsLoaded');

        return inventoryIsLoaded && ingredientsIsLoaded;
    }.property('inventoryIsLoaded', 'ingredientsIsLoaded').cacheable(),

    /**
     * Flag used to determine if the users inventory has been loaded from
     * local storage. Set by `inventoryLoadedObserver`.
     * @type {Boolean}
     */
    inventoryIsLoaded: NO,

    /**
     * Flag used to determine if the user ingredients are loaded (in READY state).
     * Set by `ingredientsStatusObserver`.
     * @type {[type]}
     */
    ingredientsIsLoaded: NO,

    //////////////////////////////////
    // Private controller functions //
    //////////////////////////////////

    /**
     * When all the ingredients and user ingredients are loaded
     * update the ingredients hasIngredient properties to match
     * those of the users inventory.
     *
     * We then also observe each ingredients hasIngredient to
     * update the user ingredients list.
     * @param  {Array} inventory Array of ingredient records the
     *                           user has associated to them
     * @private
     */
    _loadUserInventory: function() {
        var ingredients = this.get('ingredients')
            inventory = this.get('userIngredients');

        inventory.forEach(function(item) {
            item.set('hasIngredient', true);
        });

        // add the selection observer
        ingredients.addObserver('@each.hasIngredient', this, 'selectionObserver');
    },

    ///////////////
    // Observers //
    ///////////////

    /**
     * Observe `isLoaded` which marks if the ingredients and the users inventory
     * have both been loaded. Upon loading both we call `_loadUserInventory` which
     * updates our ingredients `hasIngredient` transient property to match the
     * users inventory and adds the observers to changes to that property so we
     * can persist it in local storage.
     */
    isLoadedObserver: function () {
        var isLoaded = this.get('isLoaded');

        if(isLoaded) {
            this._loadUserInventory();
        }
    }.observes('isLoaded'),

    /**
     * Observes the ingredients property and waits for its status to be READY so
     * we can set `ingredientsIsLoaded` to true.
     */
    ingredientsStatusObserver: function () {
        var ingredients = this.get('ingredients');

        if (ingredients && ingredients.get('status') & SC.Record.READY) {
            this.set('ingredientsIsLoaded', true);
        }
    }.observes('ingredients'),

    /**
     * Observes the users inventory (userIngredients) property and once populated
     * sets our `inventoryIsLoaded` flag to true.
     */
    inventoryLoadedObserver: function () {
        var inventory = this.get('userIngredients');

        if (inventory) {
            this.set('inventoryIsLoaded', true);
        }
    }.observes('userIngredients'),

    /**
     * Observe if a ingredients selection in the inventory list is toggled and
     * add or remove accordingly to the current users inventory. This observer
     * is connected after the user inventory and ingredients have been loaded in
     * `_loadUserInventory`
     */
    selectionObserver: function (item, key, value, revision) {
        var user = CocktailsApp.currentUserController.get('content');

        // a user has checked or unchecked an ingredient so
        // we need to update the users ingredients property
        if(user) {
            var inventory = user.get('ingredients');

            if(value === true && !inventory.contains(item)) {
                // item checked
                inventory.pushObject(item);
            }
            else if(value === false) {
                // item un-checked
                inventory.removeObject(item);
            }

            user.commitRecord();
        }
    }
});