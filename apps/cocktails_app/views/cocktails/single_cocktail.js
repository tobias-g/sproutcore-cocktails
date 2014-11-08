// ==========================================================================
// Project:   CocktailsApp - single cocktail
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsApp */

/**
 * View for displaying the details of a single cocktail. This view
 * gets its data from the CocktailsApp.currentCocktailController.
 * @type {CocktailsApp.CocktailsSingleCocktailView}
 * @extends {SC.SCrollView}
 */
CocktailsApp.CocktailsSingleCocktailView = SC.ScrollView.extend({

    layout: { bottom: 0, left: 0, right: 0, top: 0},

    /**
     * The contents of our scroll view. In this case our
     * views for showing a single cocktail.
     * @type {SC.View}
     */
    contentView: SC.View.design({
        classNames: ['cocktail-view'],

        childViews: ['ingredientsView', 'descriptionView'],

        /**
         * TODO: here we will display our cocktails ingredients and
         * required amounts.
         * @type {SC.LabelView}
         */
        ingredientsView: SC.LabelView.design({
            layout: { height: 40 },
            classNames: ['cocktail-ingredient-list'],

            value: 'TODO: our cocktails ingredients will go here!'
        }),

        /**
         * Here we display the full description of the cocktail.
         * @type {SC.LabelView}
         */
        descriptionView: SC.LabelView.design({
            classNames: ['cocktail-description'],
            layout: { height: 100, top: 40 },

            valueBinding: 'CocktailsApp.currentCocktailController.description'
        })
    })
})