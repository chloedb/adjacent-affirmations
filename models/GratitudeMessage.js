let { Model, snakeCaseMappers } = require('objection');

class Message extends Model {
  static get columnNameMappers() {
    /*
      In JavaScript we want camel case (e.g., createdAt), but
      in SQL we want snake case (e.g., created_at).

      snakeCaseMappers tells Objection to translate between
      the two.
    */
    return snakeCaseMappers();
  }

  static get tableName() {
    return 'gratitude_messages';

  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'body',
        'first_name',
        'location'
      ],
      properties: {
        id: { type: 'integer' },
        body: { type: 'string', minLength: 1 },
        first_name: { type: 'string' },
        location: { type: 'string'}
      }
    };
  }
}
module.exports = Message;
