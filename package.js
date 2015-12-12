
Package.describe({
  name: 'andyhqtran:vividui', // http://atmospherejs.com/wave/waveui
  version: '0.0.1',
  summary: 'Vivid - Soft Material UI Kit',
  git: 'https://github.com/andyhqtran/VividUI.git',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@1.2.0');
  api.use('jquery', 'client');
  api.addFiles([
    'dist/css/vivid.css',
    'dist/js/vivid.js'
  ], 'client');
});