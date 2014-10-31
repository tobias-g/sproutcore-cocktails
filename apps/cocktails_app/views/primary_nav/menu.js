CocktailsApp.PrimaryNavMenu = SC.View.extend({
    // we want to be able to toggle this later when pressing
    // the header icon view
    isVisible: YES,

    layout: {right: 56, top: 46, left: 0, maxWidth: 400},

    classNames: ['primary-menu-view'],

    childViews: ['menuItemsView'],

    menuItemsView: SC.View.design({

        // Tell the view to lay its children out in a vertical stack
        childViewLayout: SC.View.VERTICAL_STACK,

        /////////////////
        // Child Views //
        /////////////////

        childViews: ['allCocktailsLinkView', 'personalCocktailsLinkView', 'inventoryLinkView', 'helpLinkView'],

        allCocktailsLinkView: SC.LabelView.design(SC.ActionSupport, {
            layout: {height: 48},
            value: 'All Cocktails',

            mouseDown: function(evt) {
                return YES;
            },

            mouseUp: function(evt) {
                // route to single cocktail view
                SC.routes.set('location', 'all_cocktails');
                this.fireAction('hideMenuAction');
                return YES;
            }
        }),

        personalCocktailsLinkView: SC.LabelView.design(SC.ActionSupport, {
            layout: {height: 48},
            value: 'Personal Cocktails',

            mouseDown: function(evt) {
                return YES;
            },

            mouseUp: function(evt) {
                // route to single cocktail view
                SC.routes.set('location', 'personal_cocktails');
                this.fireAction('hideMenuAction');
                return YES;
            }
        }),

        inventoryLinkView: SC.LabelView.design(SC.ActionSupport, {
            layout: {height: 48},
            value: 'Inventory',

            mouseDown: function(evt) {
                return YES;
            },

            mouseUp: function(evt) {
                // route to single cocktail view
                SC.routes.set('location', 'inventory');
                this.fireAction('hideMenuAction');
                return YES;
            }
        }),

        helpLinkView: SC.LabelView.design(SC.ActionSupport, {
            layout: {height: 48},
            value: 'Help',

            mouseDown: function(evt) {
                return YES;
            },

            mouseUp: function(evt) {
                // route to single cocktail view
                SC.routes.set('location', 'help');
                this.fireAction('hideMenuAction');
                return YES;
            }
        })
    })
});