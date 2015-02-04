/**
 * @module cacher-utils
 */
(function () {
    "use strict";
    var config = require('config'),
        crc = require('crc'),
        qMemcached = require('memcache-promise'),
        memcached = new qMemcached(
            config.memcached.servers,
            config.memcached.options
        );

    /**
     * Cacher utils
     */
    module.exports = {
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
        getCacheStorage: function getCacheStorage () {
            return memcached;
        }
    }

}());








/*        function (myFunction, args, options) {
 if (typeof options == 'object') {
 } else {
 var cacheTime = options;
 options = {};
 options.cacheTime = cacheTime;
 }
 var time = options.cacheTime || config.cache.defaultTime;
 var salt = options.salt || '';
 var key = keyMaker(myFunction.name, salt, args);
 var deferred = Q.defer();

 memcached.get(key).then(function (value) {
 if (typeof value != 'undefined' ) {
 deferred.resolve(value);
 } else {
 myFunction.apply(myFunction,args).done(function (value) {
 memcached.set(key,value,time).done();
 deferred.resolve(value);
 },
 deferred.reject
 )
 }
 },
 deferred.reject
 );
 return deferred.promise;

 }*/