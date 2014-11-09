// ==========================================================================
// Project:   CocktailsApp - ApplicationRootState
// Copyright: ©2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsApp */

/**
 * Main state-chart that controls the applications main body being
 * displayed. The root states are generally accessed via entering a
 * route and any sub-states manage more granular states for each
 * route.
 */
CocktailsApp.ApplicationRootState = SC.State.design({
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
        CocktailsApp.currentCocktailController.set('content', CocktailsApp.store.find(CocktailsApp.Cocktail, context));

        this.gotoState('showingCocktailState');
    },

    ////////////
    // States //
    ////////////

    showingAllCocktailsState: SC.State.design({
        enterState: function() {
            // set our main application header
            CocktailsApp.primaryHeaderController.set('displayText', 'All Cocktails');

            // switch out applications main body content
            CocktailsApp.mainPage.mainPane.bodyView.set('nowShowing', 'allCocktailListView');
        }
    }),

    showingPersonalCocktailsState: SC.State.design({
        enterState: function() {
            // set our main application header
            CocktailsApp.primaryHeaderController.set('displayText', 'Personal Cocktails');

            // switch out applications main body content
            CocktailsApp.mainPage.mainPane.bodyView.set('nowShowing', 'personalCocktailListView');
        }
    }),

    showingInventoryState: SC.State.design({
        enterState: function() {
            // set our main application header
            CocktailsApp.primaryHeaderController.set('displayText', 'Inventory');

            // switch out applications main body content
            CocktailsApp.mainPage.mainPane.bodyView.set('nowShowing', 'inventoryView');
        }
    }),

    showingHelpState: SC.State.design({
        enterState: function() {
            // set our main application header
            CocktailsApp.primaryHeaderController.set('displayText', 'Help');

            // switch out applications main body content
            CocktailsApp.mainPage.mainPane.bodyView.set('nowShowing', 'helpView');
        }
    }),

    showingCocktailState: SC.State.design({
        enterState: function() {
            // set our main application header
            var cocktailName = CocktailsApp.currentCocktailController.get('name');
            CocktailsApp.primaryHeaderController.set('displayText', cocktailName ? cocktailName : 'Single Cocktail');

            // switch out applications main body content
            CocktailsApp.mainPage.mainPane.bodyView.set('nowShowing', 'singleCocktailView');
        },

        exitState: function() {
            // forget previous state
            this.parentState._prevState = null;
        },

        goBackAction: function(sender, context) {
            // go back to the list we came from (either all or personal
            // cocktails). Defaults to all cocktails list state.
            SC.routes.set('location', this.parentState._prevState === 'showingPersonalCocktailsState' ? 'personal_cocktails' : 'all_cocktails');
        }
    })
});