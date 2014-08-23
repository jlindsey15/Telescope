Package.describe({summary: "Telescope My Comments lens"});

Package.on_use(function (api) {

  api.use(['telescope-lib', 'telescope-base'], ['client', 'server']);

  api.add_files(['lib/my-comments.js'], ['client', 'server']);

  api.add_files(['lib/client/routes.js'], ['client']);
});