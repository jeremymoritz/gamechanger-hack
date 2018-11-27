// https://docs.cypress.io/guides/guides/plugins-guide.html
/* eslint-disable import/no-extraneous-dependencies global-require */
const webpack = require('@cypress/webpack-preprocessor')

module.exports = (on, config) => {
  on(
    'file:preprocessor',
    webpack({
      webpackOptions: require('@vue/cli-service/webpack.config'),
      watchOptions: {}
    })
  )

  on('before:browser:launch', (browser = {}, args) => {
    if (browser.name === 'chrome') {
      args.push('--disable-site-isolation-trials')
      return args
    }
  })

  return Object.assign({}, config, {
    baseUrl: 'https://localhost.rig.twitch.tv:3000/',
    // baseUrl: 'https://www.twitch.tv/inventonater',
    chromeWebSecurity: false,
    fixturesFolder: 'tests/e2e/fixtures',
    integrationFolder: 'tests/e2e/specs',
    screenshotsFolder: 'tests/e2e/screenshots',
    videosFolder: 'tests/e2e/videos',
    supportFile: 'tests/e2e/support/index.js'
  })
}
