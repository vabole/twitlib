My experiments with Twitter API

Usage

twitter tokens have to be provided in config.json 

```js
const Twitlib = require(twitlib);

let tl = new Twitlib() 

tl.getFriends()
 // got "User Objects" array https://dev.twitter.com/overview/api/users
    .then( userObjects => {})   
```


**Available methods:**

`getfollowers()`
Returns a promise which resolves to the array of friends' [User Objects](https://dev.twitter.com/overview/api/users)