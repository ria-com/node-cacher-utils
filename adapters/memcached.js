/**
 * @module cacher-utils/adapters/memcached
 */
(function () {
    "use strict";
    var config = require('config'),
        qMemcached = require('memcache-promise'),
        storage = new qMemcached(
            config.memcached.servers,
            config.memcached.options
        );

    /**
     * @type {qMemcached}
     */
    module.exports = storage;
}());