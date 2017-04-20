const Api = require('./api');

const api = new Api();

module.exports = function (request, reply) {
    api.read('/example', {parentRequest: request}, (err, value) => {
        return reply(value);
    });
};