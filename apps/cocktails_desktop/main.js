// ==========================================================================
// Project:   CocktailsDesktop - main
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsDesktop */

/**
 * This function brings the application to life. Once all the js files are
 * ready we setup the applications routes by calling this main function.
 */
CocktailsDesktop.main = function main() {

    /////////////////////////////
    // Instantiate Controllers //
    /////////////////////////////

    CocktailsCore.setupControllers();

    ////////////////////////////////
    // Setup Custom Query Handler //
    ////////////////////////////////

    CocktailsCore.setupPersonalCocktailsQueryExtention();

    /////////////////////////
    // Register our routes //
    /////////////////////////

    CocktailsCore.setupCoreRoutes();

    //////////////////////
    // Setup statechart //
    //////////////////////

    // setup a statechart for the application to setup and manage the applications
    // states. Upon init the statechart will enter its ready_state which will make
    // the mainPane for the application visible followed by setting the content
    // property on the primary controller.
    var statechart = CocktailsDesktop.statechart;

    SC.RootResponder.responder.set('defaultResponder', statechart);

    statechart.initStatechart();

};

function main() {CocktailsDesktop.main();}
