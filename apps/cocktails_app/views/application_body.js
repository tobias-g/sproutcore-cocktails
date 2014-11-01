CocktailsApp.ApplicationBody = SC.ContainerView.extend({
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
     * cocktails. TODO: implement a list of all cocktails.
     * @type {SC.LabelView}
     */
    allCocktailListView: SC.LabelView.design({
        classNames: ['all-cocktails-view'],
        value: 'All Cocktails'
    }),

    /**
     * A view to display a list of cocktails the user can make
     * with their specified inventory. TODO: implement a list
     * of personal cocktails.
     * @type {SC.LabelView}
     */
    personalCocktailListView: SC.LabelView.design({
        classNames: ['personal-cocktails-view'],
        value: 'Personal Cocktails'
    }),

    /**
     * A view to display a lits of ingredients that can be
     * checked and un-checked to represent if a user has that
     * ingredient.
     * @type {SC.LabelView}
     */
    inventoryView: SC.LabelView.design({
        classNames: ['inventory-view'],
        value: 'Inventory'
    }),

    /**
     * A view used to give a user help on using the application
     * such as pointers on how to search and add ingredients to
     * their inventory, Lookup all cocktails or personal cocktails
     * or simply a place to leave release notes.
     * @type {SC.LabelView}
     */
    helpView: SC.LabelView.design({
        classNames: ['help-view'],
        value: 'Help'
    }),

    /**
     * A view for displaying the details of a single cocktail
     * selected either from the all cocktails list or personal
     * cocktails list.
     * @type {SC.LabelView}
     */
    singleCocktailView: SC.LabelView.design({
        classNames: ['single-cocktail-view'],
        value: 'Single Cocktail'
    })
})