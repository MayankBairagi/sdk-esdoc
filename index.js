const  api = require('./src/api');
const  config = require('./src/config');
const objects = require('./src/objects');
const Promise = require('es6-promise').Promise;


module.exports = global.fBird = {
  initialize (options = {}) {
    // set tokens
    config.set('client_id', options.client_id);
    config.set('baseURL', options.baseURL);
  },

  /** API METHODS */
  get (path, params) {
      var result = api.request('GET', path, params);
    return result;
  },

  post (path, data, accessToken, headerChange) {
    return api.request('POST', path, data, accessToken, headerChange);
  },

  // put (path, params) {
  //   return api.request('PUT', path, params);
  // },

  // delete (path) {
  //   return api.request('DELETE', path);
  // },
  //
  // upload (options) {
  //   return api.upload(options);
  // },
  //
  // /** CONNECT METHODS */
  // connect (options) {
  //   console.log('connected to API');
  //   // return connect(options);
  // },

  // isConnected () {
  //   return config.get('oauth_token') !== undefined;
  // },
  //
  // /** RESOLVE METHODS */
  // resolve (url) {
  //   return api.resolve(url);
  // },


  /** PROMISE **/
  Promise: Promise

};
