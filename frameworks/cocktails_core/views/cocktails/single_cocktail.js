// ==========================================================================
// Project:   CocktailsCore - single cocktail
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsCore */

sc_require('views/common/carousel');

/**
 * View for displaying the details of a single cocktail. This view
 * gets its data from the CocktailsCore.currentCocktailController.
 * @type {CocktailsCore.CocktailsSingleCocktailView}
 * @extends {SC.SCrollView}
 */
CocktailsCore.CocktailsSingleCocktailView = SC.ScrollView.extend({

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
         * Display of our cocktails ingredients and required amounts.
         * @type {SC.ListView}
         */
        ingredientsView: SC.ListView.design({
            /**
             * The `CocktailsCore.currentCocktailIngredientsController` is a
             * 2 dimensional array of ingredients and substitute ingredients
             * for the current cocktail
             */
            contentBinding: 'CocktailsCore.currentCocktailIngredientsController',

            classNames: ['cocktail-ingredient-list'],

            /**
             * Since we are using `childViewLayout` property in the parent
             * view set to `SC.View.VERTICAL_STACK` we need to set a initial
             * height so we don't get console warnings
             * @type {Object}
             */
            layout: {height: 0},

            /**
             * Set the height for our rows
             * @type {Number}
             */
            rowHeight: 40,

            /**
             * Use a carousel view for each ingredient so we can also see
             * alternative ingredient substitutes
             * @type {CocktailsCore.CommonCarouselView}
             */
            exampleView: CocktailsCore.CommonCarouselView.design(SC.ContentDisplay, {
                classNames: ['ingredient-group-view', 'ingredient-group-carousel'],

                /**
                 * Set the example view for each carousel item to be an ingredient
                 * name and amount
                 * @type {CocktailsCore.CarouselItemView}
                 */
                exampleView: CocktailsCore.CommonCarouselItemView.extend({
                    classNames: ['ingredient-item-view'],

                    render: function(context) {
                        var content = this.get('content');

                        context.begin()
                            .setClass({
                                'ingredient-item-name': YES
                            })
                            .push(content.getPath('ingredient.name'))
                        .end();

                        context.begin()
                            .setClass({
                                'ingredient-item-amount': YES
                            })
                            .push(content.get('amount'))
                        .end();
                    },

                    update: function($context) {
                        $context.find('.ingredient-item-name').text(this.getPath('content.ingredient.name'));
                        $context.find('.ingredient-item-amount').text(this.getPath('content.amount'));
                    }
                })
            })
        }),

        /**
         * Here we display the full description of the cocktail.
         * @type {SC.LabelView}
         */
        descriptionView: SC.LabelView.design(SC.AutoResize, {
            classNames: ['cocktail-description'],

            // setting our `minHeight` to 0 stops our childViewLayout
            // of SC.View.VERTICAL_STACK in the parent view logging
            // warnings in the console.
            layout: {minHeight: 0},

            shouldAutoFitText: NO,
            shouldAutoResize: YES,
            shouldResizeHeight: YES,
            shouldResizeWidth: NO,

            valueBinding: SC.Binding.oneWay('CocktailsCore.currentCocktailController.description'),
        })
    })
})