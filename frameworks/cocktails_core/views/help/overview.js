// ==========================================================================
// Project:   CocktailsCore - cocktail help view
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsCore */

sc_require('gestures/tap');

/**
 * A simple view to display some text in the help page
 * for the application. Here we give a brief overview
 * of the application and a link to where issues can be
 * flagged.
 *
 * @extends {SC.View}
 */
CocktailsCore.HelpOverviewView = SC.View.extend(SC.Gesturable, {
    classNames: ['help-content'],
    useStaticLayout: YES,

    render: function(context, firstTime) {
        if(firstTime) {
            context.begin('h2')
                .push('Overview')
            .end();

            context.begin('p')
                .push('The cocktails app allows you to view either a static list of all cocktails, ')
                .push('or a dynamic list of cocktails you can create with the inventory you selected. ')
                .push('Currently the application supports ' + CocktailsCore.allCocktailsController.get('length') + ' ')
                .push('cocktails with more to be added in future updates along with improved features ')
                .push('and performance.')
            .end();

            context.begin('h2')
                .push('Issues and Feature Requests')
            .end();

            context.begin('p')
                .push('Issues or feature requests can be made on our github repository issues page by clicking ')
                .push('the following link. ')
                .begin('a')
                    .setClass({
                        'issues-link': YES
                    })
                    .addAttr('href', 'https://github.com/tobias-g/sproutcore-cocktails/issues')
                    .addAttr('target', '_blank')
                    .push('Submit an issue or feature request')
                .end()
                .push('.')
            .end()
        }
    },

    /**
     * An array of gestures we want to setup and customize
     * @type {Array}
     */
    gestures: ['cocktailsListTapGesture'],

    /**
     * since we specify the tap gesture in `gestures`
     * we can specify finer details of what defines
     * a tap.
     * @type {SC.TapGesture}
     */
    cocktailsListTapGesture: CocktailsCore.TapGesture,

    /**
     * A shortcut to running code when a tap occurs instead of using
     * `tapStart` and `tapEnd` we use this method which is called when
     * `tapStart` and `tapEnd` are both called (i.e. a tap occurred). In
     * this case all we do is call `mouseUp` so the same happens as if the
     * tap were a click.
     * @param  {Touch} touch The touch event
     */
    tap: function(gesture, touch) {
        if(touch.target.className === "issues-link") {
            navigator.app.loadUrl(touch.target.href, { openExternal:true });
            return YES;
        }
    }
})