import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Patients = new Mongo.Collection('patients');

if (Meteor.isServer) {
    Meteor.publish('patients.all', function () {
	return Patients.find();
    });
}

Meteor.methods({
    'patients.insert'(lastName, firstName, middleName, city, street, building, flat) {
	check(lastName, String);
	check(firstName, String);
	check(middleName, String);
	check(city, String);
	check(street, String);
	check(building, String);
	check(flat, String);

	if (!Roles.userIsInRole(this.userId, ['admin', 'editor'])) {
	    throw new Meteor.Error('not-authorized', 'You do not have permission to perform this action.');
	}

	Patients.insert({
	    lastName,
	    firstName,
	    middleName,
	    city,
	    street,
	    building,
	    flat,
	    createdAt: new Date(),
	});
    },
    'patients.remove'(doctorId) {
        check(doctorId, String);

	if (!Roles.userIsInRole(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'You are not authorized to perform this action.');
        }
	
        Patients.remove(doctorId);
    }
});
