// ==========================================================================
// Project:   CocktailsApp - mainPage
// Copyright: @2014 Tobias Gray
// ==========================================================================
/*globals CocktailsApp */

// require the views we need within the main pane
sc_require('views/toolbar/primary_header');
sc_require('views/primary_nav/menu');
sc_require('views/applicaiton_body');

// This page describes the main user interface for the application.
CocktailsApp.mainPage = SC.Page.design({

    mainPane: SC.MainPane.design({

        childViews: ['bodyView', 'primaryHeaderView', 'leftNavView'],

        primaryHeaderView: CocktailsApp.ToolbarPrimaryHeader,

        leftNavView: CocktailsApp.PrimaryNavMenu,

        bodyView: CocktailsApp.ApplicationBody
    })
});
