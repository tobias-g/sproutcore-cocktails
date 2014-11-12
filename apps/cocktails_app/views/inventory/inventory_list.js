// ==========================================================================
// Project:   CocktailsApp - inventory list
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsApp, CocktailsCore */

/**
 * List of ingredients that can be toggled to update what ingredient
 * a user has.
 * @type {CocktailsApp.InventoryUserInventoryListView}
 * @extends {SC.ListView}
 */
CocktailsApp.InventoryUserInventoryListView = SC.ListView.extend({
    /**
     * Row height so the list can use it for performance
     * boosting when scrolling.
     * @type {Number}
     */
    rowHeight: 54,

    /**
     * Class names for styling
     * @type {Array}
     */
    classNames: ['inventory-list'],

    /**
     * Each item in the list consists of the ingredient name and a
     * check-box to toggle whether the user has the ingredient or
     * not.
     * @type {SC.View}
     */
    exampleView: SC.View.extend(SC.ContentDisplay, {
        classNames: ['inventory-item'],
        layout: {height: 54},

        /**
         * Let the view know when hasIngredient changes the view needs
         * to be re-rendered (update called)
         * @type {Array}
         */
        displayProperties: ['content.hasIngredient'],

        /**
         * Method to toggle a inventory items hasIngredient property
         */
        toggleInventoryItem: function() {
            this.setPath('content.hasIngredient', !this.getPath('content.hasIngredient'));
        },

        ////////////
        // Events //
        ////////////

        mouseDown: function(evt) {
            return YES;
        },

        mouseUp: function(evt) {
            // toggle the inventory item
            this.toggleInventoryItem();

            return YES;
        },

        ///////////////////////
        // Render and update //
        ///////////////////////

        /**
         * Render method used first time a element needs to be rendered
         * @param  {SC.Object} context Object used to build the render
         */
        render: function(context) {
            var content = this.get('content');

            context.begin()
                .setClass({
                    'inventory-check-box': YES,
                    'sel': content.get('hasIngredient')
                })
            .end();

            context.begin()
                .setClass({
                    'inventory-ingredient-name': YES
                })
                .push(content.get('name'))
            .end();
        },

        /**
         * Update method to update a inventory name or selection when this
         * changes for a rendered item. This should happen when the list is
         * scrolled to re-use existing elements in the list that go out of
         * view (element pooling), or when a user toggles an ingredient.
         * @param  {object} $context jQuery object of the item element
         */
        update: function($context) {
            var content = this.get('content');

            $context.find('.inventory-ingredient-name').text(content.get('name'));
            if(content.get('hasIngredient')) {
                $context.find('.inventory-check-box').addClass('sel');
            }
            else {
                $context.find('.inventory-check-box').removeClass('sel');
            }
        }
    })
})