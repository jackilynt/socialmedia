const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reactions');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, //578371345 seconds sincd 1/1/1970
      get: function(createdAt){
        return createdAt //TODO
      }
    },
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


// Create a virtual property `reactionCount` that gets the amount of tags associated with an application
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Thoughts model
const Thoughts = model('Thoughts', thoughtSchema);

module.exports = Thoughts;
