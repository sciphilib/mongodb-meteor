import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import '/imports/api/doctors';
import '/imports/api/specialties';
import '/imports/api/patients';
import '/imports/api/appointments';
import '/imports/api/visits';
import '/imports/api/medications';
import '/imports/api/procedures';
import '/imports/api/tests';
import '/server/publications.js';
import '/server/methods.js';

Meteor.startup(async () => {

    Roles.createRole('admin', {unlessExists: true});
    Roles.createRole('viewer', {unlessExists: true});
    Roles.createRole('editor', {unlessExists: true});
    const adminUser = Meteor.users.findOne({ username: 'admin' });
    if (adminUser) {
	Roles.addUsersToRoles(adminUser._id, ['admin']);
    }
    Roles.addUsersToRoles(adminUser._id, ['admin']);
    const userRoles = Roles.getRolesForUser(adminUser);
    console.log(userRoles);

});
