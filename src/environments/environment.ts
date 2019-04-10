// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  qa: false,
 baseServerUrl: 'http://localhost:53006/api',
  authServerURl: 'http://localhost:53006/oauth/token',
  // securityServerURL: 'http://localhost:59381/api'
 // baseServerUrl: "http://172.20.50.124/PRServicesDev/api",
  //AuthServerURl:"http://localhost:59381/api",
 // authServerURl:"http://172.20.50.124/PRServicesDev/oauth/token"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
