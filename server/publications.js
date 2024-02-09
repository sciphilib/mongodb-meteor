import { Meteor } from 'meteor/meteor';
import { Doctors } from '/imports/api/doctors';
import { Roles } from 'meteor/alanning:roles';

Meteor.publish('doctors.all', function () {
  return Doctors.find({});
});

if (Meteor.isServer) {
  Meteor.publish('users.all', function () {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      return this.ready();
    }

    return Meteor.users.find({}, {fields: {username: 1, roles: 1}});
  });
}
