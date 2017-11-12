const Realm = require('realm');

const PersonSchema = {
  name: 'Person',
  properties: {
    id: "int",
    name: "string",
    age: "int"
  }
};

module.exports = PersonSchema;