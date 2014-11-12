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
    CocktailsApp.primaryHeaderController = CocktailsApp.PrimaryHeaderController.create();
    CocktailsApp.allCocktailsController = CocktailsApp.AllCocktailsController.create();
    CocktailsApp.currentCocktailController = CocktailsApp.CurrentCocktailController.create();
    CocktailsApp.currentUserController = CocktailsApp.CurrentUserController.create();
    CocktailsApp.ingredientsController = CocktailsApp.IngredientsController.create();
    CocktailsApp.inventoryController = CocktailsApp.InventoryController.create();
}


function main() {
    CocktailsApp.setupControllers();
    CocktailsApp.main();
}
