import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Medications = new Mongo.Collection('medications');

if (Meteor.isServer) {
    Meteor.publish('medications.all', function () {
        return Medications.find();
    });
}

Meteor.methods({
    'medications.insert'(name) {
        check(name, String);
        Medications.insert({ name });
    },
    'medications.remove'(medicationId) {
        check(medicationId, String);
        Medications.remove(medicationId);
    }
});
