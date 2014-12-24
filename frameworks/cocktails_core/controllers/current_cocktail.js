/**
 * Controller to track a current cocktail a user is viewing and eventually
 * actions that a user may be able to do with that cocktail (i.e. edit, save
 * to favorites etc).
 * @type {SC.ObjectController}
 */
CocktailsCore.CurrentCocktailController = SC.ObjectController.extend({
    /**
     * Cocktail record if a cocktail is being viewed
     * otherwise null.
     * @type {CocktailsCore.Cocktail}
     */
    content: null,

    staticRef: sc_static('images/cocktails/default.jpg'),

    staticImage: function () {
        var featureImage = this.get('featureImage'),
            staticRef = this.get('staticRef'),
            url = null;

        if (featureImage) {
            var lastSlash = staticRef.lastIndexOf("/"),
                url = staticRef.substring(0, lastSlash) + '/' + featureImage;
        }

        return url;
    }.property('content').cacheable(),
});