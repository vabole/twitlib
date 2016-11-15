/**
 * Created by vabole on 15.11.16.
 */

'use strict';

let TwitLib = require('./twitlib');

let tl = new TwitLib;

tl.getFollowers().then(() => {
        tl.followersToFile('followers');
        console.log(tl.followers.length);
    }
)
    .catch(error => {
        console.log(`Error: ${error.stack}`);
    });

//console.log(tl.followers);