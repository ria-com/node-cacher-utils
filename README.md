node-cacher-utils
===================

Part of [co-cacher](https://github.com/ria-com/node-co-cacher) & [cacher-promise](https://github.com/ria-com/node-cacher-promise) 


example
=======

```javascript
var utils = require('./'),
    co = require('co'),
    storage = utils.getCacheStorage();


co(function *(){
    var result = yield storage.set("test",260,60);
    var result = yield storage.get("test");
    console.log(result);
}).catch(onerror);

function onerror(err) { console.error(err.stack); }
```

adapters
========

   * memcached
   * redis
   
   
config
======
```javascript
module.exports = {
    // https://github.com/3rd-Eden/node-memcached
    memcached: {
        servers: 'localhost:11211', // You can either use: String, Array, Object
        options: {
            poolSize: 20
        }
    },
    // https://github.com/mjackson/then-redis
    redis: {
        url: 'tcp://localhost:6379'
    },
    cache: {
        expires: 120, // Default cache expires in seconds
        storage: 'memcached',
        key: {
            prefix: 'cw_',
            crc32: false
        }
    }
};
```

