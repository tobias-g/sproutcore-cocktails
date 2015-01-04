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

    horizontalOverlay: true,
    verticalOverlay: true,

    /**
     * The contents of our scroll view. In this case our
     * views for showing a single cocktail.
     * @type {SC.View}
     */
    contentView: SC.View.design({
        classNames: ['single-cocktail-view'],

        childViews: ['cocktailImageView', 'featureImageLoadingLabel', 'ingredientsView', 'descriptionView'],

        /**
         * Bind a property to the number of ingredients required for
         * the cocktail. We use this to determine the height of our
         * view.
         */
        ingredientsCountBinding: SC.Binding.oneWay('CocktailsCore.currentCocktailIngredientsController.length'),

        /**
         * Create a binding to track the description views layout.
         * We use this for determining the height of our scroll views
         * content view.
         */
        descriptionLayoutBinding: SC.Binding.oneWay('.descriptionView.layout'),

        /**
         * Here we setup an observer of the current design mode. Within
         * it we adjust the content views height so all the cocktail
         * views contents can be scrolled to.
         */
        designModeDidChange: function () {
            var designMode = this.get('designMode'),
                ingredientsCount = this.get('ingredientsCount') || 0,
                descriptionLayout = this.get('descriptionLayout') || {},
                rowHeight = this.getPath('ingredientsView.listView.rowHeight') || 0,
                descriptionHeight = descriptionLayout.height || 0,
                height = 0;

            if (designMode) {
                // small devices and medium portrait mode stack all the views
                // so set the content views height to the total of all the views
                // height.
                if(designMode === "s_p" || designMode === "s_l" || designMode === "m_p") {
                    height += 300 // image view
                                + (ingredientsCount * rowHeight)
                                + descriptionHeight;
                }
                // otherwise we need to use the larger of the image view + ingredient
                // list view or description views height.
                else {
                    var ingredientsAndImageHeight = 300 + 20 + (ingredientsCount * rowHeight);

                    height = Math.max(descriptionHeight, ingredientsAndImageHeight);
                }

                this.adjust('height', height);
            }
        }.observes('designMode', 'ingredientsCount', 'descriptionLayout'),

        /**
         * A feature graphic for the cocktail being viewed. If
         * we have no image for the cocktail use a generic image.
         * @type {SC.ImageView}
         */
        cocktailImageView: SC.ImageView.design({

            classNames: ['cocktail-feature-image'],

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

            valueBinding: 'CocktailsCore.currentCocktailController.staticImage',

            scale: SC.BEST_FILL
        }),

        /**
         * A label view to display a message describing the loading
         * state of the cocktails feature image. Note the layout and
         * modeAdjust are identical to the cocktailImageView.
         * @type {SC.LabelView}
         */
        featureImageLoadingLabel: SC.LabelView.design({
            classNames: ['feature-image-loading-label'],

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

            // default binding to loading state
            imageStatus: SC.IMAGE_STATE_LOADING,

            // bind imageState to the status of the feature image view
            imageStatusBinding: SC.Binding.oneWay('.parentView.cocktailImageView.status'),

            /**
             * Message to display in place of the image if it is
             * loading or has failed to load.
             *
             * @return {String} Message to display describing the images status
             */
            value: function () {
                var imageStatus = this.get('imageStatus'),
                 hasLoadingError = (imageStatus === SC.IMAGE_STATE_FAILED || imageStatus === SC.IMAGE_STATE_NONE);

                // if error occurred
                if (hasLoadingError) {
                    return 'Error Loading Image!';
                }
                // otherwise assume image is still loading
                return 'Loading Image.';
            }.property('imageStatus').cacheable(),

            /**
             * If the image has loaded we no longer need to display
             * the label view. This binding checks the image status
             * and set the visibility of the message accordingly.
             */
            isVisibleBinding: SC.Binding.transform(function (value, binding) {
                return value === SC.IMAGE_STATE_LOADED ? false : true ;
            }).from(".imageStatus")
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
            itemsBinding: SC.Binding.oneWay('CocktailsCore.currentCocktailIngredientsController.length'),

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

            listView: SC.ListView.design(SC.ContentDisplay, {
                /**
                 * The `CocktailsCore.currentCocktailIngredientsController` is a
                 * 2 dimensional array of ingredients and substitute ingredients
                 * for the current cocktail
                 */
                contentBinding: 'CocktailsCore.currentCocktailIngredientsController',

                classNames: ['cocktail-ingredient-list'],

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
                exampleView: CocktailsCore.CommonCarouselView.design({
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
             * We don't use `modeAdjust` hash here as the layout is dependent
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