// ==========================================================================
// Project:   CocktailsApp - mainPage
// Copyright: @2014 Tobias Gray
// ==========================================================================
/*globals CocktailsApp */

// This page describes the main user interface for the application.
CocktailsApp.mainPage = SC.Page.design({

    mainPane: SC.MainPane.design({

        childViews: ['bodyView', 'primaryHeaderView', 'leftNavView'],

        primaryHeaderView: SC.View.extend({

            classNames: ['primary-header-view'],

            layout: {height: 46},

            //////////////////
            // Child Views //
            //////////////////

            childViews: ['leftIconView', 'titleView'],

            /**
             * The view to display the icon to the left of the primary
             * header. Its main purpose is to expand and collapse the
             * primary navigation menu or if viewing a single resource
             * such as a cocktail to navigate back to the previous root
             * view (i.e. back to all cocktails or personal cocktails).
             *
             * TODO: change this view to display an icon rather than
             * simply be a SC.View (div element). Also implement the
             * desired behavior when we click the icon.
             */
            leftIconView: SC.View.design({
                classNames: ['primary-header-icon'],

                layout: {height: 46, width: 46}
            }),

            titleView: SC.LabelView.design({
                layout: {left: 46, right: 46},

                classNames: ['primary-header-title'],

                value: 'Main Header Text...'
            })
        }),

        leftNavView: SC.View.extend({
            // we want to be able to toggle this later when pressing
            // the header icon view
            isVisible: YES,

            layout: {right: 56, top: 46, left: 0, maxWidth: 400},

            classNames: ['primary-menu-view'],

            childViews: ['menuItemsView'],

            menuItemsView: SC.View.design({

                // Tell the view to lay its children out in a vertical stack
                childViewLayout: SC.View.VERTICAL_STACK,

                /////////////////
                // Child Views //
                /////////////////

                childViews: ['allCocktailsLinkView', 'personalCocktailsLinkView', 'inventoryLinkView', 'helpLinkView'],

                allCocktailsLinkView: SC.LabelView.design({
                    layout: {height: 48},
                    value: 'All Cocktails'
                }),

                personalCocktailsLinkView: SC.LabelView.design({
                    layout: {height: 48},
                    value: 'Personal Cocktails'
                }),

                inventoryLinkView: SC.LabelView.design({
                    layout: {height: 48},
                    value: 'Inventory'
                }),

                helpLinkView: SC.LabelView.design({
                    layout: {height: 48},
                    value: 'Help'
                })
            })
        }),

        bodyView: SC.View.design({
            layout: {top: 46},

            classNames: ['body-view']
        })
    })
});
