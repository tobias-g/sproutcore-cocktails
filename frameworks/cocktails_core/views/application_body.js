sc_require('views/common/cocktails_list');
sc_require('views/cocktails/single_cocktail');
sc_require('views/inventory/user_inventory_list');
sc_require('views/help/overview');

CocktailsCore.ApplicationBody = SC.ContainerView.extend({
    layout: {top: 52},

    classNames: ['body-view'],

    /**
     * This property determines what view is being displayed
     * in the container view. By default we want to display
     * our all cocktails view.
     * @type {String}
     */
    nowShowing: 'allCocktailListView',

    /**
     * A view used to display a list of all the applications
     * cocktails.
     * @type {SC.ScrollView}
     */
    allCocktailListView: SC.ScrollView.extend({

        classNames: ['all-cocktails-view'],

        layout: { bottom: 0, left: 0, right: 0, top: 0},

        contentView: CocktailsCore.CommonCocktailsListView.design({
            // bind the list views content to the content of our all cocktails controller
            contentBinding: SC.Binding.oneWay('CocktailsCore.allCocktailsController')
        })
    }),

    /**
     * A view to display a list of cocktails the user can make
     * with their specified inventory. TODO: implement a list
     * of personal cocktails.
     * @type {SC.ContainerView}
     */
    personalCocktailListView: SC.ContainerView.extend({

        nowShowingBinding: SC.Binding.transform(function (value, binding) {
            return value > 0 ? 'cocktailsListView' : 'noCocktailsView'
        }).from("CocktailsCore.personalCocktailsController.length"),

        cocktailsListView: SC.ScrollView.design({
            classNames: ['personal-cocktails-view'],

            layout: { bottom: 0, left: 0, right: 0, top: 0},

            contentView: CocktailsCore.CommonCocktailsListView.extend({
                // bind the list views content to the content of our personal cocktails controller
                contentBinding: SC.Binding.oneWay('CocktailsCore.personalCocktailsController')
            })
        }),

        noCocktailsView: SC.View.extend({
            layout: {top: 10, left: 10, right: 10},

            childViews: ['messageView', 'inventoryButtonView'],

            messageView: SC.View.design({
                render: function(context, firstTime) {
                    if(firstTime) {
                        context.begin('h2')
                            .push('Oh Noes, No Cocktails!')
                        .end();

                        context.begin('p')
                            .push('Looks like you don\'t have enough ingredients to make any cocktails. ')
                            .push('Head over to the inventory and try selecting a few more.')
                        .end();
                    }
                }
            }),

            inventoryButtonView: SC.ButtonView.design({
                layout: {height: 30, width: 150, centerX: 0, centerY: 0},
                title: 'Go to inventory &raquo;',
                action: function() {
                    SC.routes.set('location', 'inventory');
                }
            })
        })
    }),

    /**
     * A view to display a lits of ingredients that can be
     * checked and un-checked to represent if a user has that
     * ingredient.
     * @type {SC.ScrollView}
     */
    inventoryView: SC.ScrollView.extend({

        classNames: ['inventory-view'],

        layout: { bottom: 0, left: 0, right: 0, top: 0},

        contentView: CocktailsCore.InventoryUserInventoryListView.design({
            // bind the list views content to the content of our ingredients controller
            contentBinding: SC.Binding.oneWay('CocktailsCore.inventoryController')
        })
    }),

    /**
     * A view used to give a user help on using the application
     * such as pointers on how to search and add ingredients to
     * their inventory, Lookup all cocktails or personal cocktails
     * or simply a place to leave release notes.
     * @type {SC.ScrollView}
     */
    helpView: SC.ScrollView.extend({

        classNames: ['help-view'],

        layout: { bottom: 0, left: 0, right: 0, top: 0},

        contentView: CocktailsCore.HelpOverviewView,
    }),

    /**
     * A view for displaying the details of a single cocktail
     * selected either from the all cocktails list or personal
     * cocktails list.
     * @type {CocktailsCore.CocktailsSingleCocktailView}
     */
    singleCocktailView: CocktailsCore.CocktailsSingleCocktailView
})