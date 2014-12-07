// ==========================================================================
// Project:   CocktailsCore - menu view
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsCore */

sc_require('views/primary_nav/menu_item');

/**
 * The navigation menu that slides in and out from the left
 * of our application.
 *
 * @type {CocktailsCore.PrimaryNavMenu}
 * @extends {SC.View}
 */
CocktailsCore.PrimaryNavMenu = SC.View.extend({
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

        allCocktailsLinkView: CocktailsCore.PrimaryNavMenuItem.design({
            value: 'All Cocktails',
            routeLocation: 'all_cocktails'
        }),

        personalCocktailsLinkView: CocktailsCore.PrimaryNavMenuItem.design({
            value: 'Personal Cocktails',
            routeLocation: 'personal_cocktails'
        }),

        inventoryLinkView: CocktailsCore.PrimaryNavMenuItem.design({
            value: 'Inventory',
            routeLocation: 'inventory'
        }),

        helpLinkView: CocktailsCore.PrimaryNavMenuItem.design({
            value: 'Help',
            routeLocation: 'help'
        })
    })
});