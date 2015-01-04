// ==========================================================================
// Project:   CocktailsCore
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsCore */

/**
 * The CocktailsCore framework houses the core building blocks
 * of the cocktails application.
 *
 * @namespace
 * @extends SC.Object
 */
CocktailsCore = SC.Object.create(
    /** @scope CocktailsCore.prototype */ {

    NAMESPACE: 'CocktailsCore',
    VERSION: '0.1.0',

    /**
     * Scroll offset used when navigating between a
     * cocktail list view (all cocktails and personal
     * cocktails) and the single cocktail view then
     * back.
     *
     * This allows us to go back and return to the same
     * position in the list we left to view a single
     * cocktail and come back.
     *
     * @type {Number}
     */
    cocktailsListScrollOffset: 0,

    /**
     * Utility method to setup the `SATISFIED_BY` custom query used
     * when querying for personal cocktails
     */
    setupPersonalCocktailsQueryExtention: function() {
        SC.Query.registerQueryExtension('SATISFIED_BY', {
            reservedWord:     true,
            leftType:         'PRIMITIVE',
            rightType:        'PRIMITIVE',
            evalType:         'BOOLEAN',

            /** @ignore */
            evaluate: function (r,w) {
                var memberships  = this.leftSide.evaluate(r,w),
                    inventory = this.rightSide.evaluate(r,w),
                    indexHash = {};

                /**
                 * Go though each membership checking if we have the required
                 * ingredient.
                 */
                memberships.forEach(function(membership) {

                    // check if we already have an ingredient
                    // for this list index. if so we don't
                    // need to keep looking.
                    if(indexHash[membership.get('listIndex')] === true) {
                        return;
                    }

                    // we've never seen this list index yet so increment our
                    // false count until we know we have the ingredient for
                    // the list index.
                    indexHash[membership.get('listIndex')] = false;

                    // if the inventory does have an ingredient for the list
                    // index decrement our false counter again and update our
                    // hash to say we already have an ingredient for this list
                    // index.
                    if(inventory.contains(membership.get('ingredient'))) {
                        indexHash[membership.get('listIndex')] = true;
                    }
                });

                // we check for each property in our indexHash is
                // true. this signifies we found an ingredient in
                // the inventory for each index.
                for (var property in indexHash) {
                    if (indexHash.hasOwnProperty(property)) {
                        if(indexHash[property] === false) {
                            return false;
                        }
                    }
                }
                return true;
            }
        });
    },

    /**
     * Setup the core routes required by all applications
     */
    setupCoreRoutes: function() {
        // Route used to view single resource (object) for example:
        // <code><pre>
        //      http://localhost:4020/cocktails_app#cocktails/123
        // </pre></code>
        // CocktailsCore will take care of these routes
        // shifting the application to the correct state.
        SC.routes.add(':resource/:identifier', CocktailsCore, 'gotoRoute');

        // Route used to view one of the application main root states
        // such as all cocktails, personal cocktails, inventory or help.
        // examples:
        // <code><pre>
        //      http://localhost:4020/cocktails_app#all_cocktails
        //      http://localhost:4020/cocktails_app#personal_cocktails
        //      http://localhost:4020/cocktails_app#inventory
        //      http://localhost:4020/cocktails_app#help
        // </pre></code>
        // CocktailsCore will take care of these routes
        // shifting the application to the correct state.
        SC.routes.add(':route', CocktailsCore, 'gotoRoute');

        // This is the 'catch-all' route just in case nothing else fits.
        // This is used when the URL is specified upon start up without
        // any parameters: 'http://localhost:4020/cocktails_route'.
        //
        // CocktailsCore will default to the all cocktails state.
        SC.routes.add(':', CocktailsCore, 'gotoRoute');
    },

    /**
     * Navigate to the specified route
     */
    gotoRoute: function(routeParams) {
        var rootStateChart = SC.RootResponder.responder.defaultResponder,
            action;

        // if we have a resource and an identifier load the
        // state for viewing that single resource.
        if(routeParams.resource && routeParams.identifier) {
            // determine which action to fire depending on the resource
            if(routeParams.resource === "cocktail") {
                action = 'showCocktailAction'
            }
            else{
                SC.warn('Unknown resource [' + routeParams.resource + '] given to route to!')
                return NO;
            }

            // get the identifier for the resource we want to route to
            var id = parseInt(routeParams.identifier);

            // Go to the state for viewing the single resource
            rootStateChart.sendAction(action, this, id);
        }
        // enter the state for a root (core) route.
        else if(routeParams.route) {
            if(routeParams.route === 'all_cocktails') {
                action = 'showAllCocktailsAction';
            }
            else if(routeParams.route === 'personal_cocktails') {
                action = 'showPersonalCocktailsAction';
            }
            else if(routeParams.route === 'inventory') {
                action = 'showInventoryAction';
            }
            else if(routeParams.route === 'help') {
                action = 'showHelpAction';
            }
            else {
                SC.warn('Unknown route [' + routeParams.route + '] given to route to!')
                return NO;
            }

            // Go to state for the respective route
            rootStateChart.sendAction(action);
        }
        // no expected routeParams so default to all cocktails
        // state.
        else {
            rootStateChart.sendAction('showAllCocktailsAction');
        }

        return YES;
    },

    /**
     * A function to create instances of all our controllers
     * the application needs before we run the application.
     */
    setupControllers: function() {
        CocktailsCore.primaryHeaderController = CocktailsCore.PrimaryHeaderController.create();
        CocktailsCore.allCocktailsController = CocktailsCore.AllCocktailsController.create();
        CocktailsCore.currentCocktailController = CocktailsCore.CurrentCocktailController.create();
        CocktailsCore.currentCocktailIngredientsController = CocktailsCore.CurrentCocktailIngredientsController.create();
        CocktailsCore.currentUserController = CocktailsCore.CurrentUserController.create();
        CocktailsCore.ingredientsController = CocktailsCore.IngredientsController.create();
        CocktailsCore.inventoryController = CocktailsCore.InventoryController.create();
        CocktailsCore.personalCocktailsController = CocktailsCore.PersonalCocktailsController.create();
    }
});