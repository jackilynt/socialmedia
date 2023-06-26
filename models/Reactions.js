const { Schema, model, Types } = require('mongoose');
const { ObjectId } = require('seed/lib/seed');

// Schema to create Post model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: function(){
        return new Types.ObjectId()
      }
    },
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
    reactionBody: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
    _id: false,
  }
);

// Create a virtual property `getTags` that gets the amount of tags associated with an application
// applicationSchema
//   .virtual('getResponses')
//   // Getter
//   .get(function () {
//     return this.tags.length;
//   });

// Initialize our Application model
//const reactionSchema = model('application', applicationSchema);

module.exports = reactionSchema;


// const { Schema, model, Types } = require('mongoose');

// const reactionSchema = new Schema(
//   {
//     reactionId: {
//       type: Schema.Types.ObjectId,
//       default: function () {
//         return new Types.ObjectId();
//       },
//     },
//     username: {
//       type: String,
//       required: true,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//       get: function (createdAt) {
//         return createdAt.toLocaleString(); // Format the timestamp using a desired method
//       },
//     },
//     reactionBody: {
//       type: String,
//       required: true,
//       minLength: 1,
//       maxLength: 280,
//     },
//   },
//   {
//     toJSON: {
//       virtuals: true,
//     },
//     id: false,
//   }
// );

// module.exports = reactionSchema;
