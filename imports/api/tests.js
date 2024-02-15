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

	if (!Roles.userIsInRole(this.userId, ['admin', 'editor'])) {
	    throw new Meteor.Error('not-authorized', 'You do not have permission to perform this action.');
	}
	
        Tests.insert({ name });
    },
    'tests.remove'(testId) {
        check(testId, String);

	if (!Roles.userIsInRole(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'You are not authorized to perform this action.');
        }
	
        Tests.remove(testId);
    }
});
