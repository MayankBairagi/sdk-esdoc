const config = require('./config');
const objects = require('./objects');
const Promise = require('es6-promise').Promise;
const btoa = require('btoa');


const sendRequest = (method, url, data, accessToken, headerChange) => {
    let xhr;
    const requestPromise = new Promise((resolve) => {

        const isFormData = data;
        xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        if (headerChange === "change") {
            var username = 'accessToken',
                password = accessToken;
            var enco = btoa(username + ':' + password);
            xhr.setRequestHeader('Authorization', 'Basic ' + enco);
        } else {
            var auth = btoa(data);
            xhr.setRequestHeader('Authorization', 'Basic ' + auth);
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve({
                        responseText: xhr.responseText,
                        request: xhr
                    });
                } else {
                    xhr.status;
                }
            }
        };
        xhr.send(data);
    });
    requestPromise.request = xhr;
    return requestPromise;
};
/**
 * Parses the public API's response and constructs error messages
 * @param  {String}         responseText  The API's raw response
 * @param  {XMLHttpRequest} xhr           The original XMLHttpRequest
 * @return {Object({json, error})}        An object containing the response and a possible error
 */

const parseResponse = ({
    responseText,
    request
}) => {
    let error, json;
    try {
        json = JSON.parse(responseText);
    } catch (e) {

    }
    if (!json) {
        if (request) {
            error = {
                message: `HTTP Error: ${request.status}`
            };

        } else {
            error = {
                message: 'Unknown error'
            };
        }
    } else if (json.errors) {
        error = {
            message: ''
        };
        if (json.errors[0] && json.errors[0].error_message) {
            error = {
                message: json.errors[0].error_message
            };
        }
    }

    if (error) {
        error.status = request.status;
    }

    //console.log('if i am getting an error is', error);
    //console.log('if i am getting an json is', json);
    return {
        json, error
    };
};
/**
 * Parses the public API's request
 * @param  {data}           The original XMLHttpRequest
 */

const parseRequest = (data) => {
    let parseData ;
    if (typeof(data) === 'string') {
        return data;
    }
    else{
        parseData = JSON.stringify(data);
        return parseData;
    }
};
/**
 * Executes the public API request
 * @param  {String}     method    The HTTP method (GET, POST, PUT, DELETE)
 * @param  {String}     url       The resource's url
 * @param  {Object}     data      Data to send along with the request
 * @param  {Function=}  progress  upload progress handler
 * @return {Promise}
 */
const sendAndFollow = (method, url, data, accessToken, headerChange) => {
    const requestData = parseRequest(data);
    const requestPromise = sendRequest(method, url, requestData, accessToken, headerChange);
    const followPromise = requestPromise.then(({responseText,request}) => {
        const response = parseResponse({responseText,request});
        if (request.status !== 200 && response.error) {
            throw response.error;
        } else {
            return response.json;
        }

    });

    followPromise.request = requestPromise.request;
    return followPromise;
};

module.exports = {
    /**
     * Executes the public API request
     * @param  {String}            method HTTP method
     * @param  {String}            path   The resource's path
     * @param  {(Object|FormData)} params Parameters that will be sent
     * @param  {Function=}         progress  optional upload progress handler
     * @return {Promise}
     */
    request(method, path, data, accessToken, headerChange = {} = () => {}) {

        const oauthToken = config.get('oauth_token');
        const additionalParams = data;

        let url;

        // prepend `/` if not present
        path = path[0] !== '/' ? `/${path}` : path;

        // construct request url
        url = `${config.get('baseURL')}${path}`;
        // return sendAndFollow(method, url, data, accessToken, headerChange);
        var result = sendAndFollow(method, url, data, accessToken, headerChange);
        return result;
    }
};
