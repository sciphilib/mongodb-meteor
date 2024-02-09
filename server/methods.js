import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
    'users.create'(username, password, role) {
	const userId = Accounts.createUser({username, password});

	if (role) {
	    Roles.addUsersToRoles(userId, [role]);
	}
    },

    'users.remove'(userId) {
	if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
	    throw new Meteor.Error('not-authorized');
	}

	Meteor.users.remove(userId);
    },

    'createNewUser'(userData) {
        // Проверка данных пользователя, например, с помощью simple-schema
        // Создание пользователя
        Accounts.createUser(userData);
    },
    
});
