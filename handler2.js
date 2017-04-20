const HttpClient = require('@homeaway/http-client');

const httpClient = new HttpClient('bceFooter', {
    baseUrl: 'https://iws.homeaway.com/bizops/bce'
});

module.exports = function(request, reply) {
    httpClient.get(request, '/footer', {
        params: {
            site: 'homeaway_us'
        }
    }, (err, response) => {
        if (err) {
            return reply(err);
        }
        return reply(response.payload);
    });
}