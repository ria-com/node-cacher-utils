var utils = require('./'),
    co = require('co'),
    storage = utils.getCacheStorage();


co(function *(){
    var result = yield storage.set("test",260,60);
    console.log(result);
    result = yield storage.get("test");
    console.log(result);
}).catch(onerror);

function onerror(err) { console.error(err.stack); }



