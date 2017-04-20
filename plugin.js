'use strict';

const internals = {};

function plugin(server, options, next) {
    server.ext('onRequest', function handleRequestMarker(request, reply) {
        // Set unique id
        request.id = Math.floor(Math.random() * 1000);

        return reply.continue();
    });

    return next();
}

module.exports.register = plugin;

module.exports.register.attributes = {
    name: 'plugin',
    version: '1.0.0'
};