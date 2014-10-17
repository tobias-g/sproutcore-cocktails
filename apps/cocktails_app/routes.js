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

            // TODO: here we will need to fire our action to put our state-chart in the correct state
            SC.debug('TODO: change state by calling action ' + action + ' with identifier ' + id);
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

            // TODO: here we will need to fire our action to put our state-chart in the correct state
            SC.debug('TODO: change state by calling action ' + action);
        }
        // no expected routeParams so default to all cocktails
        // state.
        else {
            // TODO: default by going to all cocktails state
            SC.debug('TODO: change state by calling showAllCocktailsAction');
        }

        return YES;
    }
});