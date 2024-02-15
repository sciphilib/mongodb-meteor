import { Meteor } from 'meteor/meteor';
import { Doctors } from '/imports/api/doctors';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

Meteor.publish('allUsers', function () {
    if (!this.userId || !Roles.userIsInRole(this.userId, ['admin'])) {
	return this.ready();
    }

    return Meteor.users.find({}, {
	fields: {
	    username: 1,
	    roles: 1,
	}
    });
});
