Package.describe({
  name: 'diegonc:autoform-materialnote',
  summary: 'Materialnote editor for aldeed:autoform',
  version: '1.2.1',
  git: 'https://github.com/diegonc/meteor-autoform-materialnote'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'templating',
    'underscore',
    'reactive-var',
    'aldeed:autoform@5.8.0',
    'cerealkiller:materialnote@1.2.1'
  ], 'client');

  api.addFiles([
    'lib/client/ckMaterializeOverrides.js',
    'lib/client/templates.html',
    'lib/client/templates.js',
    'lib/client/autoform-materialnote.js',
    'lib/client/styles.css'
  ], 'client');
});
