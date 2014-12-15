// ==========================================================================
// Project:   CocktailsCore.EventFeedback Unit Test
// Copyright: ©2014 Tobias Gray
// ==========================================================================

var pane;

(function () {

    pane = SC.ControlTestPane.design()
        .add("simple_view", SC.View.design(CocktailsCore.EventFeedback, {}))
        .add("view_with_layout", SC.View.design(CocktailsCore.EventFeedback, {
            layout: {height: 30, width: 30}
        }));

    module("CocktailsCore.EventFeedback", {
        setup: function () {
            htmlbody('<style> .sc-static-layout { border: 1px red dotted; } </style>');
            pane.standardSetup().setup();
        },
        teardown: function () {
            pane.standardSetup().teardown();
            clearHtmlbody();
        }
    });

    test("Mixing in CocktailsCore.EventFeedback causes no errors", function() {
        ok(pane.view('simple_view'), 'view is created');
        ok(pane.view('simple_view'), 'view is a view');
    });

    test("Calling _radialFeedback with an event attaches an SVG to the view", function() {
        equals(pane.view('simple_view').$('svg').length, 0, 'No SVG attached to view to begin with');
        // mock event
        var evt = SC.Object.create({
            clientX: 0,
            clientY: 0
        })
        pane.view('simple_view')._radialFeedback(evt);
        equals(pane.view('simple_view').$('svg').length, 1, 'An SVG is now appended to the view');
    });

    test("The SVG attached by _radialFeedback is positioned to take up all of the view", function() {
        equals(pane.view('view_with_layout').$('svg').length, 0, 'No SVG attached to view to begin with');
        // mock event
        var evt = SC.Object.create({
            clientX: 0,
            clientY: 0
        })
        pane.view('view_with_layout')._radialFeedback(evt);

        var svg = pane.view('view_with_layout').$('svg'),
            viewLayout = pane.view('view_with_layout').get('layout');

        equals(svg.width(), viewLayout.width, "View and SVG widths match");
        equals(svg.height(), viewLayout.height, "View and SVG height match");
        equals(svg.css('top'), '0px', "SVG is positioned 0px from top");
        equals(svg.css('left'), '0px', "SVG is positioned 0px from left");
        equals(svg.css('position'), 'absolute', "SVG is positioning is absolute");
    });

    test("Calling _radialFeedback without an event or object giving clientX and clientY throws an error", function() {
        equals(pane.view('simple_view').$('svg').length, 0, 'No SVG attached to view to begin with');

        var evt = SC.Object.create({}),// mock bad event
            thrownException = null;// var to store exception

        try {
            pane.view('simple_view')._radialFeedback(evt)
        } catch(e) {
            thrownException = e.message;
        }

        ok(thrownException !== undefined, 'an exception should have been thrown');
        if (thrownException.indexOf !== undefined) {
            ok(thrownException.indexOf('Cant create radial feedback without a clientX and clientY of non-numeric value') !== -1, 'the exception should be about not specifying clientX and clientY');
        }
    });
})();