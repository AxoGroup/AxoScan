module.exports = {
  // Specifies that Babel should run in "automatic" mode for JSX runtime
  // This is useful if you're using React or another JSX library
  presets: [
    // Preset for compiling ES2015+ syntax
    ["@babel/preset-env", {
      // Targets the current version of Node to ensure compatibility
      targets: { node: "current" },
      // Enables transformation of ES modules to CommonJS for Jest
      modules: "commonjs",
      // Use corejs and the proposal polyfills
      useBuiltIns: "usage",
      corejs: 3,
    }],
    ["@babel/preset-react"]
  ]
}