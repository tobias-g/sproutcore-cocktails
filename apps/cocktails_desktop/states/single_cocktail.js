// ==========================================================================
// Project:   CocktailsDesktop - SingleCocktailState
// Copyright: ©2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsDesktop */

/**
 * State-chart for when entering the single cocktail view
 */
CocktailsDesktop.SingleCocktailState = SC.State.design({
    enterState: function() {
        // set our main application header
        var cocktailName = CocktailsCore.currentCocktailController.get('name'),
            iconView = CocktailsDesktop.mainPage.mainPane.primaryHeaderView.leftIconView.svgIconView;

        // check the SVG icon is loaded otherwise we need to setup an
        // observer to wait for the SVG to be available to animate
        if(iconView.get('svgIsLoaded')) {
            iconView.animateTo('back', true);
        }
        else {
            this._svgObserver = iconView.addObserver('svgIsLoaded', this, '_backHamburgerObserver');
        }

        // set primary header title to the cocktails name
        CocktailsCore.primaryHeaderController.set('displayText', cocktailName ? cocktailName : 'Single Cocktail');

        // switch out applications main body content
        CocktailsDesktop.mainPage.mainPane.bodyView.set('nowShowing', 'singleCocktailView');
    },

    exitState: function() {
        // forget previous state
        this.parentState._prevState = null;

        // reset the navigation icon SVG to collapsed by entering the `hiddenMenuState`
        CocktailsDesktop.statechart.gotoState('hiddenMenuState');

        // when we exit the state destroy and cleanup any lingering observers
        if(this._svgObserver) {
            var iconView = CocktailsDesktop.mainPage.mainPane.primaryHeaderView.leftIconView.svgIconView;
            iconView.removeObserver('svgIsLoaded', this, '_backHamburgerObserver');
            this._svgObserver = null;
        }
    },

    goBackAction: function(sender, context) {
        // go back to the list we came from (either all or personal
        // cocktails). Defaults to all cocktails list state.
        SC.routes.set('location', this.getPath('parentState._prevState') === 'showingPersonalCocktailsState' ? 'personal_cocktails' : 'all_cocktails');
    },

    /**
     * Method used as observer method to wait for the SVG
     * to load before animating to the collapsed state
     * @private
     */
    _backHamburgerObserver: function() {
        var iconView = CocktailsDesktop.mainPage.mainPane.primaryHeaderView.leftIconView.svgIconView;

        if(iconView.get('svgIsLoaded')) {
            iconView.animateTo('back', true);
            iconView.removeObserver('svgIsLoaded', this, '_backHamburgerObserver');
            this._svgObserver = null;
        }
    }
})