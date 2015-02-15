sc_require('views/cocktails/personal/filter_settings');

CocktailsCore.CocktailsPersonalCocktailsListView = SC.ScrollView.design({

    classNames: ['personal-cocktails-view'],

    layout: { bottom: 0, left: 0, right: 0, top: 0},

    contentView: SC.View.design({

    	childViews: ['filterSettingsView', 'possibleCocktailsView', 'almostPossibleCocktailsView'],
    	childViewLayout: SC.View.VERTICAL_STACK,

    	filterSettingsView: CocktailsCore.CocktailsPersonalFilterSettingsView,

    	possibleCocktailsView: CocktailsCore.CommonCocktailsListView.design({
    		classNames: ['personal-cocktails-possible'],
	        // bind the list views content to the content of our personal cocktails controller
	        contentBinding: SC.Binding.oneWay('CocktailsCore.personalCocktailsController')
	    }),

	    almostPossibleCocktailsView: SC.LabelView.design({
	    	layout: {height: 40},
    		classNames: ['personal-cocktails-almost-possible'],
	    	value: 'Still working on this!',
	    })
    })
})