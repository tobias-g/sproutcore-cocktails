// ==========================================================================
// Project:   CocktailsCore - ApplicationRootState
// Copyright: ©2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsCore */

sc_require('states/single_cocktail_state');

/**
* Main state-chart that controls the applications main body being
* displayed. The root states are generally accessed via entering a
* route and any sub-states manage more granular states for each
* route.
*/
CocktailsCore.ApplicationRootState = SC.State.design({
  initialSubstate: 'showingAllCocktailsState',

  /**
  * Property to mark what state we came from when entering single
  * cocktail state. This is so when we call the goBackAction we
  * know what state to go back to. If there is no previous state
  * (i.e. we came directly into the single cocktail route) we default
  * to all cocktails.
  * @type {String}
  */
  _prevState: null,

  // Actions that can be called from any state in the application
  // to put the application in another state. These are generally
  // called by the router when a location in the primary navigation
  // menu is selected.

  showAllCocktailsAction: function(sender, context) {
    this.gotoState('showingAllCocktailsState');
  },

  showPersonalCocktailsAction: function(sender, context) {
    this.gotoState('showingPersonalCocktailsState');
  },

  showInventoryAction: function(sender, context) {
    this.gotoState('showingInventoryState');
  },

  showHelpAction: function(sender, context) {
    this.gotoState('showingHelpState');
  },

  showCocktailAction: function(sender, context) {
    // remember how we got to this state so we can go back
    this._prevState = this.currentSubstates[0].name;

    // set the current cocktail controllers content to the cocktail
    // with the id passed as the context.
    CocktailsCore.currentCocktailController.set('content', CocktailsCore.store.find(CocktailsCore.Cocktail, context));

    this.gotoState('showingCocktailState');
  },

  ////////////
  // States //
  ////////////

  showingAllCocktailsState: SC.State.design({
    enterState: function() {
      // set our main application header
      CocktailsCore.primaryHeaderController.set('displayText', 'All Cocktails');

      // switch out applications main body content
      CocktailsCore.mainPage.mainPane.bodyView.set('nowShowing', 'allCocktailListView');

      // if our `CocktailsCore.cocktailsListScrollOffset` is not 0
      // scroll to the offset and reset it back to 0.
      var offset = CocktailsCore.get('cocktailsListScrollOffset');

      if(offset !== 0) {
        // move to our offset and reset the stored offset
        // to 0. Note we also need to use invokeLast to
        // allow our nowShowing view to be updated.
        this.invokeLast(function() {
          CocktailsCore.mainPage.mainPane.bodyView.contentView.scrollTo(0,offset);
          CocktailsCore.set('cocktailsListScrollOffset', 0);
        });
      }
    }
  }),

  showingPersonalCocktailsState: SC.State.design({
    enterState: function() {
      // set our main application header
      CocktailsCore.primaryHeaderController.set('displayText', 'Personal Cocktails');

      // switch out applications main body content
      CocktailsCore.mainPage.mainPane.bodyView.set('nowShowing', 'personalCocktailListView');

      if(CocktailsCore.personalCocktailsController.get('needsUpdate')) {
        var store = CocktailsCore.store;
        CocktailsCore.personalCocktailsController.refreshContent(store);
      }

      // if our `CocktailsCore.cocktailsListScrollOffset` is not 0
      // scroll to the offset and reset it back to 0.
      var offset = CocktailsCore.get('cocktailsListScrollOffset');

      if(offset !== 0) {
        // move to our offset and reset the stored offset
        // to 0. Note we also need to use invokeLast to
        // allow our nowShowing view to be updated.
        this.invokeLast(function() {
          CocktailsCore.mainPage.mainPane.bodyView.contentView.contentView.scrollTo(0,offset);
          CocktailsCore.set('cocktailsListScrollOffset', 0);
        });
      }
    }
  }),

  showingInventoryState: SC.State.design({
    enterState: function() {
      // set our main application header
      CocktailsCore.primaryHeaderController.set('displayText', 'Inventory');

      // switch out applications main body content
      CocktailsCore.mainPage.mainPane.bodyView.set('nowShowing', 'inventoryView');
    }
  }),

  showingHelpState: SC.State.design({
    enterState: function() {
      // set our main application header
      CocktailsCore.primaryHeaderController.set('displayText', 'Help');

      // switch out applications main body content
      CocktailsCore.mainPage.mainPane.bodyView.set('nowShowing', 'helpView');
    }
  }),

  showingCocktailState: SC.State.plugin('CocktailsCore.SingleCocktailState')
});
