/**
 * Created by vabole on 12.11.16
 */

'use strict';

const tokens = require('./tokens.json');
const utils = require('./utils');
const Twit = require('twit');

module.exports = class TwitLib {
    constructor() {
        this.twit = new Twit(tokens);
        this.followers = [];
    }

    /***
     * Wrapper for Twit.get() function call
     * @param path: API endpoint
     * @param params API parameters
     * @returns {Promise}
     */
    _twitterGet(path, params) {
        return new Promise(function (resolve, reject) {
            this.twit.get(path, params, function (error, data, response) {
                if (response.statusCode == 429) {
                    console.log('timeout reached');
                    setTimeout(resolve(twitterGet(path, params)), 1000);
                }
                if (response.statusCode != 200) {
                    reject(new Error(response.statusCode));
                }
                if (data.errors) {
                    reject(new Error(data.errors))
                }
                resolve(data);
            })
        })
    }

    /***
     * Wrapper for Twit.post() function call
     * @param path: API endpoint
     * @param params API parameters
     * @returns {Promise}
     */
    _twitterPost(path, params) {
        return new Promise(function (resolve, reject) {
            this.twit.post(path, params, function (error, data, response) {
                if (response.statusCode == 429) {
                    console.log('timeout reached');
                    setTimeout(resolve(twitterGet(path, params)), 1000);
                }
                if (response.statusCode != 200) {
                    reject(new Error(response.statusCode));
                }
                if (data.errors) {
                    reject(new Error(data.errors))
                }
                resolve(data);
            })
        })
    }
    getFollowers(){
        this._twitterGet('friends/ids')
            .then(data => {
                return utils.splitIdsInHundreds(data.ids)
            })
            .then(separatedIDs => {
                return Promise.all(separatedIDs.map(hundredIDs => {
                    return twitterGet('users/lookup', {user_id: hundredIDs})

                }))
                    .then(results => {
                        let result = [];
                        results.forEach(innerArray => {
                            result = result.concat(innerArray);
                        })
                        return result;
                    })
                    .then(result => {
                        result.forEach(user => {
                            this.followers.push(user);
                        })
                    })
            })
            .catch(error => {
                console.log(`Error: `);
                throw new Error(error);
            })
    }

    writeOut(){

    }
}



