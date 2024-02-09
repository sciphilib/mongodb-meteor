import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Procedures = new Mongo.Collection('procedures');

if (Meteor.isServer) {
    Meteor.publish('procedures.all', function () {
        return Procedures.find();
    });
}

Meteor.methods({
    'procedures.insert'(name) {
        check(name, String);
        Procedures.insert({ name });
    },
    'procedures.remove'(procedureId) {
        check(procedureId, String);
        Procedures.remove(procedureId);
    }
});
