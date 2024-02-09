import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

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

	// if (!this.userId) {
	//   throw new Meteor.Error('not-authorized');
	// }

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
        Doctors.remove(doctorId);
    }
});
