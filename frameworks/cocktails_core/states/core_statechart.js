// ==========================================================================
// Project:   CocktailsCore - statechart
// Copyright: @2014 Tobias Gray.
// ==========================================================================
/*globals CocktailsCore */

sc_require('states/ready_state');
sc_require('states/primary_nav_state');
sc_require('states/application_state');

/**
* Global state-chart for the cocktails application. Documentation and diagrams
* can be found at http://www.folder6.com/cocktails/statechart.html
* @type {SC.Statechart}
*/
CocktailsCore.CoreStatechart = SC.Statechart.extend({
  /**
  * set to YES for helpful console messages when moving
  * between states.
  * @type {Boolean}
  */
  trace: NO,

  /**
  * all states in the root state are concurrent
  * @type {Boolean}
  * @private
  */
  statesAreConcurrent: YES,

  /**
  * The ready state is entered once the application loads and on
  * enterState will append the views and populate the primary
  * controllers content.
  * @type {SC.Statechart}
  */
  readyRootState: SC.State.plugin('CocktailsCore.ReadyRootState'),

  /**
  * Primary navigation menu can be in two states (visible or hidden).
  * This state-chart manages these states
  * @type {SC.Statechart}
  */
  primaryNavMenuState: SC.State.plugin('CocktailsCore.PrimaryNavState'),

  /**
  * This is the main bulk of the applications state management. It
  * covers the main views state and its components sub-states.
  *
  * generally the main views are accessed via routes which enter
  * these states and the state-chart for that main view will dive
  * deeper into more granular states.
  * @type {SC.Statechart}
  */
  applicationState: SC.State.plugin('CocktailsCore.ApplicationRootState')
});
