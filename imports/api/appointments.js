import SimpleSchema from 'simpl-schema';
import 'meteor/aldeed:collection2/static';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Appointments = new Mongo.Collection('appointments');

if (Meteor.isServer) {
    Meteor.publish('appointments.all', function () {
	return Appointments.find();
    });
}

const AppointmentsSchema = new SimpleSchema({
    doctorId: { type: String },
    weekday: { type: String, allowedValues: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
    beginTime: { type: String },
    endTime: { type: String },
    office: { type: String },
    cabinet: { type: Number },
});

Appointments.attachSchema(AppointmentsSchema);

Meteor.methods({
    'appointments.insert'(doctorId, weekday, beginTime, endTime, office, cabinet) {
	check(doctorId, String);
	check(weekday, String);
	check(beginTime, String);
	check(endTime, String);
	check(office, String);
	check(cabinet, Number);

	if (!Roles.userIsInRole(this.userId, ['admin', 'editor'])) {
	    throw new Meteor.Error('not-authorized', 'You do not have permission to perform this action.');
	}

	Appointments.insert({
	    doctorId,
	    weekday,
	    beginTime,
	    endTime,
	    office,
	    cabinet
	});
    },

    'appointments.remove'(appointmentId) {
	check(appointmentId, String);

	if (!Roles.userIsInRole(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'You are not authorized to perform this action.');
        }

	Appointments.remove(appointmentId);
    },
});
