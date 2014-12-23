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

        childViews: ['cocktailImageView', 'ingredientsView', 'descriptionView'],

        /**
         * A feature graphic for the cocktail being viewed. If
         * we have no image for the cocktail use a generic image.
         * @type {SC.ImageView}
         */
        cocktailImageView: SC.ImageView.design({

            /**
             * Set default properties that may change depending on
             * designMode
             * @type {Object}
             */
            layout: {right: 0, height: 300, top: 0},

            /**
             * Tablets in landscape view and large screen devices
             * have different layout properties
             * @type {Object}
             */
            modeAdjust: {
                s_p: { layout: { right: 0,      height: 300,    top: 0  } },    // 320 x 568
                s_l: { layout: { right: 0,      height: 300,    top: 0  } },    // 568 x 320
                m_l: { layout: { right: 10,     width: 400,     top: 10 } },    // 1024 x 768
                m_p: { layout: { right: 0,      height: 300,    top: 0  } },    // 768 x 1024
                l_l: { layout: { right: 10,     width: 400,     top: 10 } },    // 1920 x 1080
                l_p: { layout: { right: 10,     width: 400,     top: 10 } }     // 1080 x 1920
            },

            value: sc_static('resources/images/cocktail1.jpg'),// TODO: get image from cocktail record

            scale: SC.BEST_FILL
        }),

        /**
         * Display of our cocktails ingredients and required amounts.
         * We nest the list view in a SC.View to make the responsive
         * design stuff a bit easier to manage.
         *
         * @type {SC.View}
         */
        ingredientsView: SC.View.design({

            /**
             * Default layout for properties we may change for different
             * design modes.
             *
             * @type {Object}
             */
            layout: {minHeight: 0, right: 0, top: 300},

            modeAdjust:  {
                s_p: { layout: { right: 0,      top: 300 } },                       // 320 x 568
                s_l: { layout: { right: 0,      top: 300 } },                       // 568 x 320
                m_l: { layout: { right: 10,     top: 310,       width: 400 } },     // 1024 x 768
                m_p: { layout: { right: 0,      top: 300 } },                       // 768 x 1024
                l_l: { layout: { right: 10,     top: 310,       width: 400  } },    // 1920 x 1080
                l_p: { layout: { right: 10,     top: 310,       width: 400  } }     // 1080 x 1920
            },

            /**
             * Bind a property to the number of ingredients required for
             * the cocktail. We use this to determine the height of our
             * view.
             *
             * @type {String}
             */
            itemsBinding: 'CocktailsCore.currentCocktailIngredientsController.length',

            /**
             * Update the views height accordingly to accommodate the
             * ingredients.
             */
            itemsObserver: function () {
                var items = this.get('items');

                if (items) {
                    this.adjust('height', items * this.getPath('listView.rowHeight'))
                }
            }.observes('items'),

            //////////////////////////
            // Ingredient List View //
            //////////////////////////

            childViews: ['listView'],

            listView: SC.ListView.design({
                /**
                 * The `CocktailsCore.currentCocktailIngredientsController` is a
                 * 2 dimensional array of ingredients and substitute ingredients
                 * for the current cocktail
                 */
                contentBinding: 'CocktailsCore.currentCocktailIngredientsController',

                classNames: ['cocktail-ingredient-list'],

                /**
                 * TODO: modeAdjust screws up without pre-setting the
                 * layout right property beforehand. Need to figure
                 * out why this is.
                 * @type {Object}
                 */
                //layout: { right: 0 },

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
            })
        }),

        /**
         * Here we display the full description of the cocktail.
         * @type {SC.LabelView}
         */
        descriptionView: SC.LabelView.design(SC.AutoResize, {
            classNames: ['cocktail-description'],

            layout: {minHeight: 0, top: 0, right: 0},

            itemsBinding: 'CocktailsCore.currentCocktailIngredientsController.length',

            /**
             * We dont use `modeAdjust` hash here as the layout is dependent
             * on the `designMode` and `items` (number of ingredients). Therefore
             * we manually adjust out layout properties when either change.
             */
            itemsObserver: function () {
                var designMode = this.get('designMode'),
                    items = this.get('items') || 0,
                    topVal = 0,     // default top layout value
                    rightVal = 0;   // default right layout value

                if (designMode) {
                    if(designMode === "s_p" || designMode === "s_l" || designMode === "m_p") {
                        topVal = 300 + (items * 40);
                    }
                    else {
                        rightVal = 420;
                    }
                }

                // update the views layout
                this.adjust('top', topVal);
                this.adjust('right', rightVal);

            }.observes('items', 'designMode'),

            shouldAutoFitText: NO,
            shouldAutoResize: YES,
            shouldResizeHeight: YES,
            shouldResizeWidth: NO,
            autoResizePadding: 10,

            valueBinding: SC.Binding.oneWay('CocktailsCore.currentCocktailController.description'),
        })
    })
})