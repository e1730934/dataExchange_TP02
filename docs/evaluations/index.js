const addEvaluation = require('./addEvaluation');
const delEvaluation = require('./delEvaluation');

module.exports = {
  paths:{
      '/addEvaluation': {
          ...addEvaluation
      },
      '/delEvaluation/:id': {
          ...delEvaluation
      }
  }
};
