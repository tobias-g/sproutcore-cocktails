CocktailsApp.ToolbarPrimaryHeader = SC.View.extend({

    classNames: ['primary-header-view'],

    layout: {height: 46},

    //////////////////
    // Child Views //
    //////////////////

    childViews: ['leftIconView', 'titleView'],

    /**
     * The view to display the icon to the left of the primary
     * header. Its main purpose is to expand and collapse the
     * primary navigation menu or if viewing a single resource
     * such as a cocktail to navigate back to the previous root
     * view (i.e. back to all cocktails or personal cocktails).
     *
     * TODO: change this view to display an icon rather than
     * simply be a SC.View (div element). Also implement the
     * desired behavior when we click the icon.
     */
    leftIconView: SC.View.design({
        classNames: ['primary-header-icon'],

        layout: {height: 46, width: 46}
    }),

    titleView: SC.LabelView.design({
        layout: {left: 46, right: 46},

        classNames: ['primary-header-title'],

        value: 'Main Header Text...'
    })
});