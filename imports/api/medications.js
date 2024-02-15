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

	if (!Roles.userIsInRole(this.userId, ['admin', 'editor'])) {
	    throw new Meteor.Error('not-authorized', 'You do not have permission to perform this action.');
	}
	
        Medications.insert({ name });
    },
    'medications.remove'(medicationId) {
        check(medicationId, String);

	if (!Roles.userIsInRole(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'You are not authorized to perform this action.');
        }
	
        Medications.remove(medicationId);
    }
});
