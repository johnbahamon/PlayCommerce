// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyApasa7tg_CeXaPRcmTCLDkwBcmgXl_-LE',
    authDomain: 'bigsaledev.firebaseapp.com',
    databaseURL: 'https://bigsaledev.firebaseio.com',
    projectId: 'bigsaledev',
    storageBucket: 'bigsaledev.appspot.com',
    messagingSenderId: '1072537226666'
  },
  urlApi: 'http://localhost:3001/'
  // urlApi: 'https://demo.playcommerce.org/'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
