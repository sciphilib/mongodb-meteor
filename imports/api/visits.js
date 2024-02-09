import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import 'meteor/aldeed:collection2/static';
import { check } from 'meteor/check';

export const Visits = new Mongo.Collection('visits');

if (Meteor.isServer) {
    Meteor.publish('visits.all', function () {
	return Visits.find();
    });

    Meteor.publish('visits.forPatient', function (patientId) {
	if (!this.userId) {
	    return this.ready();
	}

	return Visits.find({ patientId: patientId });
    });
}

const VisitsSchema = new SimpleSchema({
  doctorId: {
    type: String,
  },
  patientId: {
    type: String,
  },
  complaints: {
    type: String,
    optional: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
});

Visits.attachSchema(VisitsSchema);

Meteor.methods({
  'visits.insert'(doctorId, patientId, complaints, startDate, endDate) {
    check(doctorId, String);
    check(patientId, String);
    check(complaints, String);
    check(startDate, Date);
    check(endDate, Date);

    // if (!this.userId) {
    //   throw new Meteor.Error('not-authorized');
    // }

    Visits.insert({
      doctorId,
      patientId,
      complaints,
      startDate,
      endDate,
    });
  },

  'visits.remove'(visitId) {
    check(visitId, String);

    // if (!this.userId) {
    //   throw new Meteor.Error('not-authorized');
    // }

    Visits.remove(visitId);
  },
});
