import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Tests = new Mongo.Collection('tests');

if (Meteor.isServer) {
    Meteor.publish('tests.all', function () {
        return Tests.find();
    });
}

Meteor.methods({
    'tests.insert'(name) {
        check(name, String);
        Tests.insert({ name });
    },
    'tests.remove'(testId) {
        check(testId, String);
        Tests.remove(testId);
    }
});
