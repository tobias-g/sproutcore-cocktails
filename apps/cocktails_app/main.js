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


  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably
  // create multiple pages and panes.
  CocktailsApp.getPath('mainPage.mainPane').append() ;

  // Step 2. Set the content property on your primary controller.
  // This will make your app come alive!
  //
  // ex.
  // var content = CocktailsApp.store.find(CocktailsApp.Group);
  // CocktailsApp.groupsController.set('content', content);

};


function main() { CocktailsApp.main(); }
