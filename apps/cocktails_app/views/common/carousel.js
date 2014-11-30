// ==========================================================================
// Project:   CocktailsApp - carousel view
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsApp, CocktailsCore */

sc_require('views/common/carousel_item');
sc_require('views/common/carousel_nav_button');
sc_require('views/common/carousel_prev_button');

/**
 * A view containing a collection of items that can be viewed
 * by moving the views horizontally. Only one view is visible
 * at a time (unless the carousel is moving between active
 * views).
 *
 * This view has support for mouse drags to move the
 * views in and out of visibility and touch swipes to also do
 * the same. You may also switch the views via previous and
 * next buttons to the left and right of the view.
 *
 * In essence this is a `SC.ContainerView` where the view
 * transition is `SC.ContainerView.PUSH` with the added support
 * for swipe and dragging gestures to transition between views.
 * Note this is not how this view is implemented (We use no
 * `SC.ContainerView` or transition plugins). The difference
 * the ability to drag a view pulling the next view into the
 * visible area and changing drag direction to cancel the view
 * switching.
 *
 * @type {CocktailsApp.CommonCarouselView}
 * @extends {SC.View}
 */
CocktailsApp.CommonCarouselView = SC.View.extend({

    classNames: ['carousel'],

    layout: {height: 40},

    /**
     * Our child views required to build a view carousel
     * @type {Array}
     */
    childViews: ['collectionView', 'prevIconView', 'nextIconView'],

    /**
     * Button view used to navigate to the previous view in
     * the carousel.
     *
     * @type {CocktailsCore.CommonCarouselNavButtonView}
     */
    prevIconView: CocktailsApp.CommonCarouselNavButtonView.design({
        layout: {width: 32, left: 4, top: 4, bottom: 4},

        render: function(context, firstTime) {
            context.push('&laquo;');
        },

        isVisible: function () {
            var index = this.getPath('collectionView.currentIndex'),
                isMoving = this.getPath('collectionView.isMoving');

            // hide navigation button when dragging carousel
            if(isMoving) {
                return false;
            }

            // otherwise only hide the view if no more previous items
            return index == 0 ? false : true ;
        }.property('collectionView.length', 'collectionView.currentIndex', 'collectionView.isMoving').cacheable(),

        mouseUp: function(evt) {
            var collectionView = this.get('collectionView');

            // if no carousel view is set don't do anything
            if(!collectionView) return NO;

            // otherwise update the carousel views `currentIndex`
            collectionView.set('currentIndex', collectionView.get('currentIndex') - 1);
        }
    }),

    /**
     * Button view used to navigate to the next view in
     * the carousel.
     *
     * @type {CocktailsCore.CommonCarouselNavButtonView}
     */
    nextIconView: CocktailsApp.CommonCarouselNavButtonView.design({
        layout: {width: 32, right: 4, top: 4, bottom: 4},

        render: function(context, firstTime) {
            context.push('&raquo;');
        },

        isVisible: function () {
            var length = this.getPath('collectionView.length'),
                index = this.getPath('collectionView.currentIndex'),
                isMoving = this.getPath('collectionView.isMoving');

            // hide navigation button when dragging carousel
            if(isMoving) {
                return false;
            }

            // otherwise only hide the view if no more following items
            return index < length - 1 ? true : false ;
        }.property('collectionView.length', 'collectionView.currentIndex', 'collectionView.isMoving').cacheable(),

        mouseUp: function(evt) {
            var collectionView = this.get('collectionView');

            // if no carousel view is set don't do anything
            if(!collectionView) return NO;

            // otherwise update the carousel views `currentIndex`
            collectionView.set('currentIndex', collectionView.get('currentIndex') + 1);
        }
    }),

    /**
     * Item view used for each item in the carousel collection view
     *
     * @type {CocktailsCore.CommonCarouselItemView}
     */
    exampleView: CocktailsCore.CommonCarouselItemView,

    /**
     * Collection view of the objects to create views for in
     * the carousel
     *
     * @type {SC.CollectionView}
     */
    collectionView: SC.CollectionView.extend(SC.Gesturable, {

        /**
         * Number to signify how much to offset each view in the
         * carousel when a drag or swipe is occurring
         *
         * @type {Number}
         */
        offset: 0,

        /**
         * Index of the current item that is active (in view)
         * for the carousel
         *
         * @type {Number}
         */
        currentIndex: 0,

        /**
         * Flag to show if the carousel is moving
         * @type {Boolean}
         */
        isMoving: false,

        /**
         * Content binding. We get the collections content from our carousel
         * view to populate items in the carousel
         */
        contentBinding: '.parentView.content',

        /**
         * Overwrite the `layoutForContentIndex` method in the collection view
         * to tell the carousel collection what each items layout should be
         */
        layoutForContentIndex: function(contentIndex) {
            var frameWidth = this.get('frame').width,
                currentIndex = this.get('currentIndex');

            return {left: (contentIndex - currentIndex) * frameWidth, width: frameWidth}
        },

        /**
         * `CocktailsCore.CommonCarouselView` lays out items horizontally with 1
         * view displayed at a time, if the width of the frame changes, all
         * of the item views on screen are potentially in the wrong position.
         *
         * Update all of their layouts if necessary (if frame width changes).
         *
         * @private
         */
        _frameDidChange: function () {
            var frame = this.get('frame'),
                lastFrameWidth = this._lastFrameWidth,
                width = frame.width;

            // A change to the width of the frame is the only variable that
            // alters the layout of item views and our computed layout.
            if (!SC.none(lastFrameWidth) && width !== lastFrameWidth) {
                var itemView,
                    nowShowing = this.get('nowShowing');

                // Only loop through the now showing indexes, if the content was sparsely
                // loaded we would inadvertently load all the content.
                nowShowing.forEach(function (idx) {
                    itemView = this.itemViewForContentIndex(idx);
                    itemView.adjust(this.layoutForContentIndex(idx));
                }, this);
            }

            // remember last width. if we only update the height
            // we can cut put allot of computation for new layouts
            this._lastFrameWidth = width;
        }.observes('frame'),

        /**
         * If the currentIndex changes animate our views to adjust their
         * positions
         *
         * @private
         */
        _currentIndexDidChange: function () {
            var currentIndex = this.get('currentIndex');

            if (!SC.none(currentIndex)) {
                var itemView,
                    nowShowing = this.get('nowShowing');

                // Only loop through the now showing indexes, if the content was sparsely
                // loaded we would inadvertently load all the content.
                nowShowing.forEach(function (idx) {
                    itemView = this.itemViewForContentIndex(idx);

                    // animate our view to its new position
                    itemView.animate(
                        this.layoutForContentIndex(idx),  // get new layout
                        { duration: 0.5, timing: 'ease-out', delay: 0 } // animation options
                    );
                }, this);
            }
        }.observes('currentIndex'),

        /**
         * When a child view is dragged it changes the `offset`
         * property by the amount it has been dragged. When this
         * changes we need to update all the visible child views
         * to also be offset by the same amount.
         *
         * @private
         */
        _offsetDidChange: function() {
            var offset = this.get('offset');

            if (!SC.none(offset)) {
                var itemView,
                    nowShowing = this.get('nowShowing'),
                    frame = this.get('frame'),
                    width = frame.width,
                    currentIndex = this.get('currentIndex');

                // Only loop through the now showing indexes, if the content was sparsely
                // loaded we would inadvertently load all the content.
                nowShowing.forEach(function (idx) {
                    itemView = this.itemViewForContentIndex(idx);
                    itemView.adjust('left', ((width * (idx - currentIndex)) + offset));
                }, this);
            }
        }.observes('offset'),

        /**
         * Bind to carousel views exampleView property
         * @type {String}
         */
        exampleViewBinding: '.parentView.exampleView'
    })
});