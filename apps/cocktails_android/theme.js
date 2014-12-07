// ==========================================================================
// Project:   CocktailsAndroid - theme
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsAndroid */

// This is the theme that defines how your app renders.
//
// Your app is given its own theme so it is easier and less
// messy for you to override specific things just for your
// app.
//
// You don't have to create the whole theme on your own, though:
// your app's theme is based on SproutCore's Ace theme.
CocktailsAndroid.Theme = CocktailsTheme.create({
    name: 'cocktails-android'
});

// SproutCore needs to know that your app's theme exists
SC.Theme.addTheme(CocktailsAndroid.Theme);

// Setting it as the default theme makes every pane SproutCore
// creates default to this theme unless otherwise specified.
SC.defaultTheme = 'cocktails-android';
