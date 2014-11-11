// ==========================================================================
// Project:   CocktailsApp - ReadyState
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsApp */

/**
 * Ready state for the cocktails application entered once the application
 * loads. On entering the state we make the main pane visible by appending
 * it and setting up the primary cocktails controllers content.
 * @type SC.State
 */
CocktailsApp.ReadyRootState = SC.State.extend({
    initialSubstate: 'loadingState',

    loadingState: SC.State.design({
        enterState: function() {
            ///////////////////////
            // Instantiate views //
            ///////////////////////

            CocktailsApp.getPath('mainPage.mainPane').append();

            ///////////////////////////////
            // Populate main controllers //
            ///////////////////////////////

            // Query the store
            var cocktails = CocktailsApp.store.find(CocktailsApp.Cocktail);

            // Set the content property on the primary controllers.
            CocktailsApp.allCocktailsController.set('content', cocktails);

            ////////////////
            // User setup //
            ////////////////

            // check if a local user exists if not create one
            var users = CocktailsApp.store.find(CocktailsApp.User),
                user = users.firstObject();

            // if there is no local user create one
            if(!user) {
                user = CocktailsApp.store.createRecord(CocktailsApp.User, {});
                user.commitRecord();
            }

            CocktailsApp.currentUserController.set('content', user);

            // All loading and application setup is done so go to the readyState
            this.get('statechart').sendAction('doFinishLoadingAction');
        },

        doFinishLoadingAction: function() {
            this.gotoState('readyState');
        }
    }),

    readyState: SC.State.design({
        enterState: function() {
            // we enter this state when the application
            // views are appended and controllers populated
        }
    })
});