'use strict';

const Joi = require('joi');
const Hoek = require('hoek');

const internals = {
    schema: Joi.object().keys({
        parentRequest: Joi.object({})
    })
};

class Api {
    read(url, options, callback) {
        const validation = Joi.validate(options, internals.schema);
        const settings = validation.value;
        // Mock API call
        setTimeout(() => {
            settings.parentRequest.log(['timings'], 'DNS lookup took XYZ ms.');
            callback(null, 'OK');
        }, 400);
    }
}

module.exports = Api;