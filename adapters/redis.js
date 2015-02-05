/**
 * @module cacher-utils/adapters/memcached
 */
(function () {
    "use strict";
    var config = require('config'),
        redis = require('then-redis'),
        storage = redis.createClient(config.redis.url);

    storage.set = function(key, value, ttl) { return storage.setex(key, ttl, value) };

    /**
     * @type {redis}
     */
    module.exports = storage;
}());