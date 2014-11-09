// ==========================================================================
// Project:   CocktailsApp
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsApp */

/**
 * The Cocktails App
 *
 * The cocktails applications purpose is to allow a user
 * to browse cocktails along with give an inventory to
 * browse a list of personalized cocktails that can be
 * created with the given inventory.
 */
CocktailsApp = SC.Application.create(
    /** @scope CocktailsApp.prototype */ {

    NAMESPACE: 'CocktailsApp',
    VERSION: '0.1.0',

    store: SC.Store.create({
        dataSource: SC.CascadeDataSource.create({
            dataSources: ['fixture_store'],
            fixture_store: SC.FixturesDataSource.create()
        })
    })
});
