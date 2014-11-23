// ==========================================================================
// Project:   CocktailsApp - header view
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsApp, CocktailsCore */

sc_require('views/primary_nav/menu_item');

/**
 * The navigation menu that slides in and out from the left
 * of our application.
 *
 * @type {CocktailsApp.PrimaryNavMenu}
 * @extends {SC.View}
 */
CocktailsApp.PrimaryNavMenu = SC.View.extend({
    // we want to be able to toggle this later when pressing
    // the header icon view
    isVisible: NO,

    // Transition settings (animation when becoming hidden or visible)
    transitionShow: SC.View.SLIDE_IN,
    transitionShowOptions: {
        direction: 'right',
        duration: 0.3,
        timing: 'ease-in'
    },

    transitionHide: SC.View.SLIDE_OUT,
    transitionHideOptions: {
        direction: 'left',
        duration: 0.3,
        timing: 'ease-in'
    },

    layout: {right: 52, top: 52, left: 0, maxWidth: 400},

    classNames: ['primary-menu-view'],

    childViews: ['menuItemsView'],

    menuItemsView: SC.View.design({

        // Tell the view to lay its children out in a vertical stack
        childViewLayout: SC.View.VERTICAL_STACK,

        /////////////////
        // Child Views //
        /////////////////

        childViews: ['allCocktailsLinkView', 'personalCocktailsLinkView', 'inventoryLinkView', 'helpLinkView'],

        allCocktailsLinkView: CocktailsApp.PrimaryNavMenuItem.design({
            value: 'All Cocktails',
            routeLocation: 'all_cocktails'
        }),

        personalCocktailsLinkView: CocktailsApp.PrimaryNavMenuItem.design({
            value: 'Personal Cocktails',
            routeLocation: 'personal_cocktails'
        }),

        inventoryLinkView: CocktailsApp.PrimaryNavMenuItem.design({
            value: 'Inventory',
            routeLocation: 'inventory'
        }),

        helpLinkView: CocktailsApp.PrimaryNavMenuItem.design({
            value: 'Help',
            routeLocation: 'help'
        })
    })
});