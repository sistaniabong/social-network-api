const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
          type: String,
          required: true,
          unique: true,
          trim: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
          match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
        friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
      },
      {
        toJSON: {
            virtuals: true,
        }
    }
);

// Create a virtual property `friendCount` that gets the number of friends
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User;



