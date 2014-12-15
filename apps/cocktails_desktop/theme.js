// ==========================================================================
// Project:   CocktailsDesktop - theme
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsDesktop */

// This is the theme that defines how your app renders.
//
// Your app is given its own theme so it is easier and less
// messy for you to override specific things just for your
// app.
//
// You don't have to create the whole theme on your own, though:
// your app's theme is based on SproutCore's Ace theme.
CocktailsDesktop.Theme = CocktailsTheme.create({
    name: 'cocktails-desktop'
});

// SproutCore needs to know that your app's theme exists
SC.Theme.addTheme(CocktailsDesktop.Theme);

// Setting it as the default theme makes every pane SproutCore
// creates default to this theme unless otherwise specified.
SC.defaultTheme = 'cocktails-desktop';
