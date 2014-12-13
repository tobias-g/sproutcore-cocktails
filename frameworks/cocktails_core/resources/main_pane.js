sc_require('views/toolbar/primary_header');
sc_require('views/primary_nav/menu');
sc_require('views/application_body');

CocktailsCore.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({

    childViews: ['bodyView', 'primaryHeaderView', 'leftNavView'],

    primaryHeaderView: CocktailsCore.ToolbarPrimaryHeader,

    leftNavView: CocktailsCore.PrimaryNavMenu,

    bodyView: CocktailsCore.ApplicationBody
  })
});
