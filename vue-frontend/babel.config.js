module.exports = {
  presets: [
    [
      '@vue/app',
      {
        useBuiltIns: 'entry'
      }
    ]
  ],
  minified: false,
  retainLines: true,
  plugins: [
    [
      'transform-imports',
      {
        vuetify: {
          transform: 'vuetify/es5/components/${member}',
          preventFullImport: true
        }
      }
    ]
  ]
}
