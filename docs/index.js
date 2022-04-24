const basicInfo = require('./basicInfo');
const servers = require('./servers');
const tags = require('./tags');
const components = require('./components');
const users = require('./users');
const students = require('./students');
const evaluations = require('./evaluations');

module.exports = {
  ...basicInfo,
  ...servers,
  ...tags,
  ...components,
  // ...users,
  // ...students,
  ...evaluations,
};
