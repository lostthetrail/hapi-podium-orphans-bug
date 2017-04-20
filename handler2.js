const HttpClient = require('@homeaway/http-client');

const httpClient = new HttpClient('bceFooter', {
    baseUrl: 'https://iws.homeaway.com/bizops/bce'
});

module.exports = function(request, reply) {
    return httpClient.get(request, '/footer', {
        params: {
            site: 'homeaway_us'
        }
    })
    .then((response) => {
        return reply(response.payload);
    })
    .catch((err) => {
        return reply(err);
    });
}