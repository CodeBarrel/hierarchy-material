// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  tree_backend: 'http://dev.treeback.com',
  firebase: {
    apiKey: "AIzaSyAIeYPVaOpfduMdvUEK3m3RaTzZwLoIMIY",
    authDomain: "hierarchy-tree.firebaseapp.com",
    databaseURL: "https://hierarchy-tree.firebaseio.com",
    projectId: "hierarchy-tree",
    storageBucket: "hierarchy-tree.appspot.com",
    messagingSenderId: "1033294933797"
  }
};
