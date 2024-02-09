import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Specialties = new Mongo.Collection('specialties');

if (Meteor.isServer) {
    Meteor.publish('specialties.all', function () {
        return Specialties.find();
    });
}

Meteor.methods({
    'specialties.insert'(name) {
        check(name, String);
        Specialties.insert({ name });
    },
    'specialties.remove'(specialtyId) {
        check(specialtyId, String);
        Specialties.remove(specialtyId);
    }
});
