const { Schema, model } = require('mongoose');
const thought


const userSchema = new Schema(
    {
username: {
    type: String,
    required: true,
    max_length: 50,
},
email: {
    type: String,
    required: true,
    unique: true,
    // must be an actual email
}
thoughts: {
    // array of id values referencing the thought model
}
friends
    // array of id values referencing the user model (self-reference)
    }
)

// virtual "friend count" -  retrieves the lenght of the user's friends array field on query

