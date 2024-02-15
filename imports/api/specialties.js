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

	if (!Roles.userIsInRole(this.userId, ['admin', 'editor'])) {
	    throw new Meteor.Error('not-authorized', 'You do not have permission to perform this action.');
	}
	
        Specialties.insert({ name });
    },
    'specialties.remove'(specialtyId) {
        check(specialtyId, String);

	if (!Roles.userIsInRole(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'You are not authorized to perform this action.');
        }
	
        Specialties.remove(specialtyId);
    }
});
