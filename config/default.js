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