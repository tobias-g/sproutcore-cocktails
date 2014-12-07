/**
 * Controller to track the current user within the application. We then
 * store the users inventory against this user and figure out their
 * personal cocktails from that.
 * @type {SC.ObjectController}
 */
CocktailsCore.CurrentUserController = SC.ObjectController.extend({
    /**
     * User record of the current user
     * @type {CocktailsCore.User}
     */
    content: null
});