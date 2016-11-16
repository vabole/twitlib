/**
 * Created by vabole on 15.11.16.
 */

'use strict';

let TwitLib = require('./twitlib');

let tl = new TwitLib;

tl.getFriends().then(() => {
        //tl.followersToFile('friends');
    require('fs').writeFileSync('testData2.json', JSON.stringify(tl.friends.map(follower => follower)));
    }
)
    .catch(error => {
        console.log(`Error: ${error.stack}`);
    });

