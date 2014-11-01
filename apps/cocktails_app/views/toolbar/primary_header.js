CocktailsApp.ToolbarPrimaryHeader = SC.View.extend({

    classNames: ['primary-header-view'],

    layout: {height: 52},

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
     * simply be a SC.View (div element).
     */
    leftIconView: SC.ImageView.design(SC.ActionSupport, {
        classNames: ['primary-header-icon'],

        layout: {height: 52, width: 52},

        scale: SC.SCALE_NONE,
        value: sc_static('/images/hamburger.png'),

        mouseDown: function(evt) {
            return YES;
        },

        mouseUp: function(evt) {
            var action = CocktailsApp.statechart.stateIsCurrentState('hiddenMenuState') ? 'showMenuAction' : 'hideMenuAction';

            this.fireAction(action);
            return YES;
        }
    }),

    titleView: SC.LabelView.design({
        layout: {left: 52},

        classNames: ['primary-header-title'],

        value: 'Main Header Text...'
    })
});