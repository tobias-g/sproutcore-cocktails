// ==========================================================================
// Project:   CocktailsCore - PrimaryNavMenuState
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsCore */

/**
* Primary menu state covers the state of the primary nav menu.
* The menu has only two states expanded (visible) and hidden.
* @type SC.State
*/
CocktailsCore.PrimaryNavState = SC.State.extend({
  initialSubstate: 'hiddenMenuState',

  hiddenMenuState: SC.State.design({
    enterState: function(context) {
      var leftNavView = CocktailsCore.mainPage.mainPane.leftNavView;
      var iconView = CocktailsCore.mainPage.mainPane.primaryHeaderView.leftIconView.svgIconView;

      leftNavView.set('isVisible', false);

      // check the SVG icon is loaded otherwise we need to setup an
      // observer to wait for the SVG to be available to animate
      if(iconView.get('svgIsLoaded')) {
        iconView.animateTo('collapsed', true);
      }
      else {
        this._svgObserver = iconView.addObserver('svgIsLoaded', this, '_collapseHamburgerObserver');
      }
    },

    exitState: function() {
      // when we exit the state destroy and cleanup any lingering observers
      if(this._svgObserver) {
        var iconView = CocktailsCore.mainPage.mainPane.primaryHeaderView.leftIconView.svgIconView;
        iconView.removeObserver('svgIsLoaded', this, '_collapseHamburgerObserver');
        this._svgObserver = null;
      }
    },

    showMenuAction: function(sender, context) {
      this.gotoState('showingMenuState');
    },

    /**
    * Method used as observer method to wait for the SVG
    * to load before animating to the collapsed state
    * @private
    */
    _collapseHamburgerObserver: function() {
      var iconView = CocktailsCore.mainPage.mainPane.primaryHeaderView.leftIconView.svgIconView;

      if(iconView.get('svgIsLoaded')) {
        iconView.animateTo('collapsed', true);
        iconView.removeObserver('svgIsLoaded', this, '_collapseHamburgerObserver');
        this._svgObserver = null;
      }
    }
  }),

  showingMenuState: SC.State.design({
    enterState: function() {
      CocktailsCore.mainPage.mainPane.leftNavView.set('isVisible', true);

      var iconView = CocktailsCore.mainPage.mainPane.primaryHeaderView.leftIconView.svgIconView;

      // check the SVG icon is loaded otherwise we need to setup an
      // observer to wait for the SVG to be available to animate
      if(iconView.get('svgIsLoaded')) {
        iconView.animateTo('expanded', true);
      }
      else {
        this._svgObserver = iconView.addObserver('svgIsLoaded', this, '_expandHamburgerObserver');
      }
    },

    exitState: function() {
      // when we exit the state destroy and cleanup any lingering observers
      if(this._svgObserver) {
        var iconView = CocktailsCore.mainPage.mainPane.primaryHeaderView.leftIconView.svgIconView;
        iconView.removeObserver('svgIsLoaded', this, '_expandHamburgerObserver');
        this._svgObserver = null;
      }
    },

    hideMenuAction: function(sender, context) {
      this.gotoState('hiddenMenuState');
    },

    /**
    * Method used as observer method to wait for the SVG
    * to load before animating to the expanded state
    * @private
    */
    _expandHamburgerObserver: function() {
      var iconView = CocktailsCore.mainPage.mainPane.primaryHeaderView.leftIconView.svgIconView;

      if(iconView.get('svgIsLoaded')) {
        iconView.animateTo('expanded', true);
        iconView.removeObserver('svgIsLoaded', this, '_expandHamburgerObserver');
        this._svgObserver = null;
      }
    }
  })
});
