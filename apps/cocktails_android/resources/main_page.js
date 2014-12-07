// ==========================================================================
// Project:   CocktailsAndroid - mainPage
// Copyright: @2014 Tobias Gray
// ==========================================================================
/*globals CocktailsAndroid, CocktailsCore */

// This page describes the main user interface for the application.
CocktailsAndroid.mainPage = SC.Page.design({

    mainPane: SC.MainPane.design({

        childViews: ['bodyView', 'primaryHeaderView', 'leftNavView'],

        primaryHeaderView: CocktailsCore.ToolbarPrimaryHeader,

        leftNavView: CocktailsCore.PrimaryNavMenu,

        bodyView: CocktailsCore.ApplicationBody
    })
});
