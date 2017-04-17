'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server({ 
    debug: {
        log: ['error', 'info'],
        request: ['error', 'info']
    }
});
server.connection({
    port: 3000, host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        request.log(['info'], `Requesting index.`);
        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/favicon',
    handler: function (request, reply) {
        reply();
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }
    server.log(['info'], `Server running at: ${server.info.uri}`);
});