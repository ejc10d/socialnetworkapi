const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
thoughtText: {
    type: String,
    required: true,
    // must be between 1 and 280 characters
},
createdAt: {
    type: Date
}