// ==========================================================================
// Project:   CocktailsDesktop
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsDesktop */

/**
 * The Cocktails App
 *
 * The cocktails applications purpose is to allow a user
 * to browse cocktails along with give an inventory to
 * browse a list of personalized cocktails that can be
 * created with the given inventory.
 */
CocktailsDesktop = SC.Application.create(
    /** @scope CocktailsDesktop.prototype */ {

    NAMESPACE: 'CocktailsDesktop',
    VERSION: '0.1.0',

    store: SC.Store.create({
        dataSource: SC.CascadeDataSource.create({
            dataSources: [
                'local_store',// used to store user data
                'fixture_store'// used to store all other date
            ],
            local_store: CocktailsCore.LocalStorage.create(),
            fixture_store: SC.FixturesDataSource.create()
        })
    })
});
