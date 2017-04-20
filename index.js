'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server({ 
    debug: {
        log: ['debug'],
        request: ['debug']
    }
});
server.connection({
    port: 3000, host: 'localhost'
});

// Add custom request.id
server.register({
    register: require('./plugin')
});

server.register({
    register: require('good'),
    options: {
        reporters: {
            myConsoleReporter: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ log: '*', response: '*', request: '*', error: '*' }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: require('./handler')
});

// Ignore favicon requests
server.route({method: 'GET', path: '/favicon.ico', handler: function (request, reply) {return reply();}});

server.start((err) => {

    if (err) {
        throw err;
    }
    server.log(['info'], `Server running at: ${server.info.uri}`);
});