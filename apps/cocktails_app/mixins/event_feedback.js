/**
 * Mixin used for views that have events where we want to give
 * feedback when an event occurs. This mixin holds methods for
 * feedback for taps or clicks used throughout the application.
 * @type {Object}
 */
CocktailsApp.EventFeedback = {

    /**
     * Give a radial feedback for an event by creating a circle and
     * animating it to get larger and fade out at the point of where
     * the event occurred on the view.
     *
     * Mostly used by click or tap events to give feedback to a user
     * of where the click or tap happened.
     *
     * Once done the callback is called to perform the intended behavior
     * of the event.
     *
     * @param  {SC.Event}   evt         The event to create the radial animation from
     * @param  {Function} callback      The method to call when the animation is done
     */
    _radialFeedback: function(evt, callback) {
        var layer = this.get('layer'),      // get layer
            svg = Snap(svg),                // create SVG
            offset = $(layer).offset(),     // find layer offset
            x = evt.clientX - offset.left,  // use offset to calculate contact point x
            y = evt.clientY - offset.top;   // use offset to calculate contact point y
            id = this.getPath('content.id'),// store cocktail ID we want to navigate to
            callback = callback || null;

        // append the SVG to the cocktail list item
        layer.appendChild( svg.node );

        // make sure our SVG is positioned correctly
        $(svg.node).css({
            position:'absolute',
            background: 'none',
            top:0,
            left: 0
        })

        // create a circle at the point of contact
        var circle = svg.circle( x , y , 2 );
        circle.attr({"fill-opacity": 0.5});

        // animate circle
        circle.animate({r: 100, "fill-opacity": 0}, 200, null, callback);

        // some cleanup
        svg = null;
    }
}