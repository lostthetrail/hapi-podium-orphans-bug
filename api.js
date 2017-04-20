'use strict';

const Joi = require('joi');
const Hoek = require('hoek');

const internals = {
    schema: Joi.object().keys({
        parentRequest: Joi.object({})
    })
};

class Api {
    read(url, options) {
        Joi.validate(options, internals.schema, (err, settings) => {
            // Mock API call
            setTimeout(() => {
                settings.parentRequest.log(['timings'], 'DNS lookup took XYZ ms.');
            }, 400)
        });
    }
}

module.exports = Api;