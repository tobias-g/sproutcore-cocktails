// ==========================================================================
// Project:   CocktailsApp - carousel view next button
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsApp, CocktailsCore */

/**
 * View for the carousel items
 */
CocktailsApp.CommonCarouselItemView = SC.View.extend(SC.Gesturable, {

    classNames: ['carousel-item'],

    collectionView: null,
    collectionViewBinding: '.parentView',

    ////////////////////
    // Desktop Events //
    ////////////////////

    mouseDown: function(evt) {
        var collectionView = this.get('collectionView');

        // if no carousel view is set don't do anything
        if(!collectionView) {
            return NO;
        }

        // set moving flag so navigation buttons hide
        collectionView.set('isMoving', true);

        // mark where our mouseDown began
        this.set('clientStart', [evt.clientX, evt.clientY]);
        return YES;
    },

    mouseDragged: function(evt) {
        var xDiff = evt.clientX - this.get('clientStart')[0],
            collectionView = this.get('collectionView');

        // set the collections views offset to the amount dragged
        collectionView.set('offset', xDiff);
    },

    mouseUp: function(evt) {
        var xDiff = evt.clientX - this.get('clientStart')[0],
            collectionView = this.get('collectionView'),
            carouselLength = collectionView.get('length'),
            currentIndex = collectionView.get('currentIndex');

        if(Math.abs(xDiff) > (this.get('frame').width * 0.4)) {
            // change index
            if(xDiff < 0 && currentIndex < carouselLength - 1) {
                collectionView.set('currentIndex', currentIndex + 1);
            }
            else if(xDiff > 0 && currentIndex > 0) {
                collectionView.set('currentIndex', currentIndex - 1);
            }
            else {
                collectionView._currentIndexDidChange();
            }
        }
        else {
            collectionView._currentIndexDidChange();
        }

        collectionView.set('isMoving', false);

        // reset our clientStart property
        this.set('clientStart', null);
    },

    //////////////////
    // Touch Events //
    //////////////////

    /**
     * An array of gestures we want to setup and customize
     * @type {Array}
     */
    gestures: ['carouselSwipeGesture'],

    carouselSwipeGesture: SC.SwipeGesture.extend({
        direction: SC.SWIPE_HORIZONTAL,
        startDistance: 3,
        swipeDistance: 20
    }),

    swipeStart: function(gesture, touch, direction) {
        this.mouseDown(touch);
    },

    swipeChanged: function(gesture, touch, direction) {
        this.mouseDragged(touch);
    },

    swipeEnd: function(gesture, touch, direction) {
        this.mouseUp(touch);
    }
});