const Joi = require('joi');

module.exports = {
  functions: {
    play: {
      queryStringParameters: {
        withPlayerMove: Joi.string().valid(['rock', 'paper', 'scissors']).required()
      }
    }
  }
};
