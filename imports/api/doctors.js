import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

export const Doctors = new Mongo.Collection('doctors');

if (Meteor.isServer) {
    Meteor.publish('doctors.all', function () {
	return Doctors.find();
    });
}

Meteor.methods({
    'doctors.insert'(lastName, firstName, middleName, specialty) {
	check(lastName, String);
	check(firstName, String);
	check(middleName, String);
	check(specialty, String);

	if (!this.userId) {
	    console.log('No user ID found');
	    throw new Meteor.Error('not-authorized', 'You must be logged in to perform this action.');
	}
	console.log('User ID:', this.userId, 'Roles:', Roles.getRolesForUser(this.userId));


	if (!Roles.userIsInRole(this.userId, ['admin', 'editor'])) {
	    throw new Meteor.Error('not-authorized', 'You do not have permission to perform this action.');
	}

	Doctors.insert({
	    lastName,
	    firstName,
	    middleName,
	    specialty,
	    createdAt: new Date(),
	});
    },
    'doctors.remove'(doctorId) {
        check(doctorId, String);

	if (!this.userId) {
	    console.log('No user ID found');
	    throw new Meteor.Error('not-authorized', 'You must be logged in to perform this action.');
	}
	console.log('User ID:', this.userId, 'Roles:', Roles.getRolesForUser(this.userId));

	if (!Roles.userIsInRole(this.userId, ['admin'])) {
	    throw new Meteor.Error('not-authorized', 'You do not have permission to perform this action.');
	}
	
        Doctors.remove(doctorId);
    }
});
