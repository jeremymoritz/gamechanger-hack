// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { rigLogin, projects } from './extensionConfig'
Cypress.Commands.add('configureDeveloperRig', (options = { log: true }) => {
  cy.window(options).then(win =>
    win.localStorage.setItem('rigLogin', JSON.stringify(rigLogin))
  )
  cy.window(options).then(win =>
    win.localStorage.setItem('currentProjectIndex', 0)
  )
  cy.window(options).then(win =>
    win.localStorage.setItem('projects', JSON.stringify(projects))
  )
})

Cypress.Commands.add('withinExtension', (callback, options = { log: true }) => {
  cy.configureDeveloperRig(options)
  cy.visit('/extension-views', options)
  return cy

    .get('.rig-frame.extension-frame', options)
    .iframe(options)
    .find('iframe.extension-frame', options)
    .iframe(options)
    .find('iframe', options)
    .iframe(options)
    .find('#app', options)
    .within($app => {
      callback($app)
    })
})
