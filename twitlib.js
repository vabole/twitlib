/**
 * Created by vabole on 12.11.16
 */

'use strict';

const tokens = require('./tokens.json');
const utils = require('./utils');
const Twit = require('twit');
const fs = require('fs');

module.exports = class TwitLib {
    constructor() {
        this.twit = new Twit(tokens);
        this.friends = [];
    }

    getFriends(username){
        let options = {stringify_ids: true, count: 5000}
        if (username){
            options.screen_name = username;
        }

        return  this.twit.get('friends/ids', options)

                .then( ({data: {ids, next_cursor_str: cursor }}) => {
                    fs.writeFileSync('testData.json', JSON.stringify(ids));
                    return utils.splitIdsInHundreds(ids)
                })
                .then(separatedIDs => {
                    return Promise.all(separatedIDs.map(hundredIDs => {
                        return this.twit.get('users/lookup', {user_id: hundredIDs})
                    }))
                        .then(result => {
                            result.forEach(({data: ids}) => {
                                this.friends = this.friends.concat(ids);
                            })
                        })
                })
                .catch(error => {
                    console.log(`Error: ${error.stack}`);
                })
        }
};