// ==========================================================================
// Project:   CocktailsApp - PrimaryNavMenuState
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsApp */

/**
 * Primary menu state covers the state of the primary nav menu.
 * The menu has only two states expanded (visible) and hidden.
 * @type SC.State
 */
CocktailsApp.PrimaryNavMenuState = SC.State.extend({
    initialSubstate: 'hiddenMenuState',

    hiddenMenuState: SC.State.design({
        enterState: function() {
            CocktailsApp.mainPage.mainPane.leftNavView.set('isVisible', false);
        },

        showMenuAction: function(sender, context) {
            this.gotoState('showingMenuState');
        }
    }),

    showingMenuState: SC.State.design({
        enterState: function() {
            CocktailsApp.mainPage.mainPane.leftNavView.set('isVisible', true);
        },

        hideMenuAction: function(sender, context) {
            this.gotoState('hiddenMenuState');
        }
    })
});