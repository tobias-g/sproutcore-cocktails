// ==========================================================================
// Project:   CocktailsApp - main
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsApp */

/**
 * This function brings the application to life. Once all the js files are
 * ready we setup the applications routes by calling this main function.
 */
CocktailsApp.main = function main() {

    ////////////////////////////////
    // Setup Custom Query Handler //
    ////////////////////////////////

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

    /////////////////////////
    // Register our routes //
    /////////////////////////

    // Route used to view single resource (object) for example:
    // <code><pre>
    //      http://localhost:4020/cocktails_app#cocktails/123
    // </pre></code>
    // CocktailsApp.routes will take care of these routes
    // shifting the application to the correct state.
    SC.routes.add(':resource/:identifier', CocktailsApp.routes, 'gotoRoute');

    // Route used to view one of the application main root states
    // such as all cocktails, personal cocktails, inventory or help.
    // examples:
    // <code><pre>
    //      http://localhost:4020/cocktails_app#all_cocktails
    //      http://localhost:4020/cocktails_app#personal_cocktails
    //      http://localhost:4020/cocktails_app#inventory
    //      http://localhost:4020/cocktails_app#help
    // </pre></code>
    // CocktailsApp.routes will take care of these routes
    // shifting the application to the correct state.
    SC.routes.add(':route', CocktailsApp.routes, 'gotoRoute');

    // This is the 'catch-all' route just in case nothing else fits.
    // This is used when the URL is specified upon start up without
    // any parameters: 'http://localhost:4020/cocktails_route'.
    //
    // CocktailsApp.routes will default to the all cocktails state.
    SC.routes.add(':', CocktailsApp.routes, 'gotoRoute');

    //////////////////////
    // Setup statechart //
    //////////////////////

    // setup a statechart for the application to setup and manage the applications
    // states. Upon init the statechart will enter its ready_state which will make
    // the mainPane for the application visible followed by setting the content
    // property on the primary controller.
    var statechart = CocktailsApp.statechart;

    SC.RootResponder.responder.set('defaultResponder', statechart);

    statechart.initStatechart();

};

/**
 * A function to create instances of all our controllers
 * the application needs before we run the application.
 */
CocktailsApp.setupControllers = function setupControllers() {
    CocktailsApp.primaryHeaderController = CocktailsCore.PrimaryHeaderController.create();
    CocktailsApp.allCocktailsController = CocktailsCore.AllCocktailsController.create();
    CocktailsApp.currentCocktailController = CocktailsCore.CurrentCocktailController.create();
    CocktailsApp.currentCocktailIngredientsController = CocktailsCore.CurrentCocktailIngredientsController.create();
    CocktailsApp.currentUserController = CocktailsCore.CurrentUserController.create();
    CocktailsApp.ingredientsController = CocktailsCore.IngredientsController.create();
    CocktailsApp.inventoryController = CocktailsCore.InventoryController.create();
    CocktailsApp.personalCocktailsController = CocktailsCore.PersonalCocktailsController.create();
}


function main() {
    CocktailsApp.setupControllers();
    CocktailsApp.main();
}
