/**
 * @module cacher-utils
 */
(function () {
    "use strict";
    var config = require('config'),
        crc = require('crc'),
        defaultAdapter = 'memcached';

    /**
     * Cacher utils
     */
    module.exports = {
        /**
         * keyMaker
         * @param {string} name
         * @param {string} salt
         * @param {Array} args
         * @return {string}
         */
        keyMaker: function keyMaker (name , salt, args) {
            var strArgs = [];
            args.forEach(function(arg) {
                var newArg = arg;
                if (typeof arg == 'object' || arg == 'array') {
                    newArg = JSON.stringify(arg);
                }
                strArgs.push(newArg);
            });
            var suffix = strArgs.join('_');
            if (config.cache.key.crc32) {
                suffix = crc.crc32(suffix).toString(16);
            }
            return config.cache.key.prefix + name + salt + suffix;
        },
        /**
         * Get Cache Storage engine
         * @param {string} adapter
         * @return {*}
         */
        getCacheStorage: function(adapter) {
            adapter = adapter || config.cache.storage;
            if (!(adapter in {'memcached':true,'redis':true})) {
                adapter = defaultAdapter
            }
            return require('./adapters/'+adapter);
        }
    }

}());
