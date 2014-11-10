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
        classNames: ['single-cocktail-view'],

        childViews: ['ingredientsView', 'descriptionView'],

        childViewLayout: SC.View.VERTICAL_STACK,

        /**
         * TODO: here we will display our cocktails ingredients and
         * required amounts.
         * @type {SC.LabelView}
         */
        ingredientsView: SC.ListView.design({
            contentBinding: 'CocktailsApp.currentCocktailController.memberships',

            classNames: ['cocktail-ingredient-list'],

            layout: {height: 0},

            showAlternatingRows: true,

            rowHeight: 32,

            exampleView: SC.View.extend({
                layout: {height: 32},

                classNames: ['cocktail-ingredient-item'],

                childViews: ['ingredientNameView', 'ingredientAmountView'],

                ingredientNameView: SC.LabelView.design({
                    classNames: ['ingredient-list-name'],
                    layout: {right: 120},
                    valueBinding: '.parentView.content.ingredient.name'
                }),

                ingredientAmountView: SC.LabelView.design({
                    classNames: ['ingredient-list-amount'],
                    layout: {width: 100, right: 0},
                    valueBinding: '.parentView.content.amount'
                })
            })
        }),

        /**
         * Here we display the full description of the cocktail.
         * @type {SC.LabelView}
         */
        descriptionView: SC.LabelView.design(SC.AutoResize, {
            classNames: ['cocktail-description'],

            shouldAutoFitText: NO,
            shouldAutoResize: YES,
            shouldResizeHeight: YES,
            shouldResizeWidth: NO,

            valueBinding: SC.Binding.oneWay('CocktailsApp.currentCocktailController.description'),
        })
    })
})