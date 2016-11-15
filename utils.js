'use strict'

// splitting ids into chunks of 100 ids
exports.splitIdsInHundreds = function splitIdsInHundreds(ids){
    let result = [];
    for (let i = 0; i <= ids.length; i += 100 ){
        result.push(ids.slice(i, i + 100));
    }
    return result;
}