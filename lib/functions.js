const Joi = require('joi');
const Validation = require('./validation');
const RPS = require('@lucadv/rock-paper-scissors');

module.exports = {
  play: {
    handler: (event, context, callback) => {
      const result = Joi.validate(
        event.queryStringParameters,
        Validation.functions.play.queryStringParameters
      );
      const corsHeaders = {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
      };
      if (result.error) {
        const err = result.error;
        const boom = {
          error: 'Bad Request',
          message: err.message,
          validation: { source: 'query', keys: [err.details[0].context.key] }
        };
        return callback(null, {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify(boom)
        });
      }
      const playerMove = event.queryStringParameters.withPlayerMove;
      callback(null, {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(RPS(playerMove))
      });
    }
  }
};
