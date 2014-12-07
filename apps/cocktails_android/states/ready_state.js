// ==========================================================================
// Project:   CocktailsAndroid - ReadyState
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsAndroid */

/**
 * Ready state for the cocktails application entered once the application
 * loads. On entering the state we make the main pane visible by appending
 * it and setting up the primary cocktails controllers content.
 * @type SC.State
 */
CocktailsAndroid.ReadyRootState = SC.State.extend({
    initialSubstate: 'loadingState',

    loadingState: SC.State.design({
        enterState: function() {
            ///////////////////
            // Cordova Setup //
            ///////////////////

            // listener that fired when device is ready. From then on
            // we can use the cordova API as we please.
            document.addEventListener("deviceready", function(evt) {
                // add listener for the back button being pressed
                document.addEventListener("backbutton", function(evt) {
                    // if we're in the single cocktail view go fire the `goBackAction`
                    // otherwise close the application.
                    if(CocktailsAndroid.statechart.stateIsCurrentState('showingCocktailState')) {
                        CocktailsAndroid.statechart.sendAction('goBackAction')
                    }
                    else {
                        navigator.app.exitApp();
                    }
                }, false);
            }, false);

            ///////////////////////
            // Instantiate views //
            ///////////////////////

            CocktailsAndroid.getPath('mainPage.mainPane').append();

            ///////////////////////////////
            // Populate main controllers //
            ///////////////////////////////

            // Query the store
            var cocktails = CocktailsAndroid.store.find(CocktailsCore.Cocktail),
                ingredients = CocktailsAndroid.store.find(CocktailsCore.Ingredient);

            // Set the content property on the primary controllers.
            CocktailsCore.allCocktailsController.set('content', cocktails);
            CocktailsCore.ingredientsController.set('content', ingredients);

            ////////////////
            // User setup //
            ////////////////

            // check if a local user exists if not create one
            var users = CocktailsAndroid.store.find(CocktailsCore.User),
                user = users.firstObject();

            // if there is no local user create one
            if(!user) {
                user = CocktailsAndroid.store.createRecord(CocktailsCore.User, {});
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