const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // must match an actual email address
            match: [/.+@.+\..+/],
        },

        thoughts:
            // array of id values referencing the thought model
            [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Thought',
                },
            ],
        friends:
            // array of id values referencing the user model (self-reference)
            [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
            ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// virtual "friend count" -  retrieves the lenght of the user's friends array field on query

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;

