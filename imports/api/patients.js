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

	// if (!this.userId) {
	//   throw new Meteor.Error('not-authorized');
	// }

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
        Patients.remove(doctorId);
    }
});
