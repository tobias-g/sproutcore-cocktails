// ==========================================================================
// Project:   CocktailsDesktop - ReadyState
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsDesktop */

/**
 * Ready state for the cocktails application entered once the application
 * loads. On entering the state we make the main pane visible by appending
 * it and setting up the primary cocktails controllers content.
 * @type SC.State
 */
CocktailsDesktop.ReadyRootState = SC.State.extend({
    initialSubstate: 'loadingState',

    loadingState: SC.State.design({
        enterState: function() {
            ///////////////////////
            // Instantiate views //
            ///////////////////////

            CocktailsDesktop.getPath('mainPage.mainPane').append();

            ///////////////////////////////
            // Populate main controllers //
            ///////////////////////////////

            // Query the store
            var cocktails = CocktailsDesktop.store.find(CocktailsCore.Cocktail),
                ingredients = CocktailsDesktop.store.find(CocktailsCore.Ingredient);

            // Set the content property on the primary controllers.
            CocktailsCore.allCocktailsController.set('content', cocktails);
            CocktailsCore.ingredientsController.set('content', ingredients);

            ////////////////
            // User setup //
            ////////////////

            // check if a local user exists if not create one
            var users = CocktailsDesktop.store.find(CocktailsCore.User),
                user = users.firstObject();

            // if there is no local user create one
            if(!user) {
                user = CocktailsDesktop.store.createRecord(CocktailsCore.User, {});
                user.commitRecord();
            }

            CocktailsCore.currentUserController.set('content', user);

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