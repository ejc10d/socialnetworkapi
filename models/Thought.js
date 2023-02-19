const { Schema, model, Types } = require('mongoose');
const { Thought } = require('.');
const dateFormat = require('../utils/dateFormat');
const ReactionSchema = require('./Reaction')

const ThoughtSchema = new Schema(
    {
thoughtText: {
    type: String,
    required: true,
    // must be between 1 and 280 characters
    minlength: 1,
    maxlength: 280,
},

createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
},

username: {
type: String,
required: true,
},

reactions: [ReactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id:  false,
    }
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;