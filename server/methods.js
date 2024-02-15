import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { check } from 'meteor/check';

Meteor.methods({
    'assignUserRole'(userId, roles) {
        check(userId, String);
        check(roles, [String]);

        if (!Roles.userIsInRole(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'You are not authorized to perform this action.');
        }

        Roles.addUsersToRoles(userId, roles);
    },

    'users.updateRole'(userId, newRole) {
	check(userId, String);
	check(newRole, String);

	if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
	    throw new Meteor.Error('not-authorized', 'Только администратор может изменять роли.');
	}

	Roles.addUsersToRoles(userId, newRole);
    },

    'users.remove'(userId) {
        check(userId, String);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized', 'You must be logged in to perform this action.');
        }

        if (!Roles.userIsInRole(this.userId, 'admin')) {
            throw new Meteor.Error('not-authorized', 'You do not have permission to perform this action.');
        }

        if (userId === this.userId) {
            throw new Meteor.Error('invalid-operation', 'You cannot remove yourself.');
        }

        Meteor.users.remove(userId);
    },
});
