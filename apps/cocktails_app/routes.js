// ==========================================================================
// Project:   CocktailsApp - routes
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsApp */

/**
 * Routing class that takes care of routes the application
 * enters and setting the applications state for that route.
 * The state-chart thereafter will deal with displaying the
 * views and setting up of controllers for that state.
 */
CocktailsApp.routes = SC.Object.create({

    /**
     * Navigate to the specified route
     */
    gotoRoute: function(routeParams) {
        var rootStateChart = CocktailsApp.statechart,
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
    }
});