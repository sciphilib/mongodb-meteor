import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Procedures = new Mongo.Collection('procedures');

if (Meteor.isServer) {
    Meteor.publish('procedures.all', function () {
        return Procedures.find();
    });
}

Meteor.methods({
    'procedures.insert'(name) {
        check(name, String);

	if (!Roles.userIsInRole(this.userId, ['admin', 'editor'])) {
	    throw new Meteor.Error('not-authorized', 'You do not have permission to perform this action.');
	}
	
        Procedures.insert({ name });
    },
    'procedures.remove'(procedureId) {
        check(procedureId, String);

	if (!Roles.userIsInRole(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'You are not authorized to perform this action.');
        }
	
        Procedures.remove(procedureId);
    }
});
