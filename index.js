'use strict';

const Hapi = require('hapi');
const Api = require('./api');

const api = new Api();

const server = new Hapi.Server({ 
    debug: {
        log: ['debug'],
        request: ['debug']
    }
});
server.connection({
    port: 3000, host: 'localhost'
});

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
    handler: function (request, reply) {
        api.read('/example', {parentRequest: request}, (err, value) => {
            return reply(value);
        });
    }
});

// Ignore favicon requests
server.route({method: 'GET', path: '/favicon.ico', handler: function (request, reply) {return reply();}});

server.start((err) => {

    if (err) {
        throw err;
    }
    server.log(['info'], `Server running at: ${server.info.uri}`);
});