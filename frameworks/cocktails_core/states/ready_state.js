// ==========================================================================
// Project:   CocktailsCore - ReadyState
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsCore */

/**
* Ready state for the cocktails application entered once the application
* loads. On entering the state we make the main pane visible by appending
* it and setting up the primary cocktails controllers content.
* @type SC.State
*/
CocktailsCore.ReadyRootState = SC.State.extend({
  initialSubstate: 'loadingState',

  loadingState: SC.State.design({
    enterState: function() {
      var store = CocktailsCore.store;

      ///////////////////////
      // Instantiate views //
      ///////////////////////

      CocktailsCore.getPath('mainPage.mainPane').append();

      ///////////////////////////////
      // Populate main controllers //
      ///////////////////////////////

      // Query the store
      var cocktails = store.find(CocktailsCore.Cocktail),
      ingredients = store.find(CocktailsCore.Ingredient);

      // Set the content property on the primary controllers.
      CocktailsCore.allCocktailsController.set('content', cocktails);
      CocktailsCore.ingredientsController.set('content', ingredients);

      ////////////////
      // User setup //
      ////////////////

      // check if a local user exists if not create one
      var users = store.find(CocktailsCore.User),
      user = users.firstObject();

      // if there is no local user create one
      if(!user) {
        user = store.createRecord(CocktailsCore.User, {});
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
