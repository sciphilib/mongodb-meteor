import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

export const UsersList = () => {
    const [roles, setRoles] = useState({});

    const users = useTracker(() => {
        Meteor.subscribe('allUsers');
        return Meteor.users.find({}, { sort: { createdAt: -1 } }).fetch();
    });

    const updateRole = (userId, newRole) => {
        Meteor.call('users.updateRole', userId, newRole, (error) => {
            if (error) {
                alert(`Update error: ${error.message}`);
            } else {
                alert('Role successfully updated');
                setRoles(prevRoles => ({ ...prevRoles, [userId]: '' }));
            }
        });
    };

    const handleRoleChange = (userId, role) => {
        setRoles(prevRoles => ({ ...prevRoles, [userId]: role }));
    };

    const removeUser = (userId) => {
        if (confirm('Are you sure you want to delete this user?')) {
            Meteor.call('users.remove', userId, (error) => {
                if (error) {
                    alert(`Removal error: ${error.message}`);
                } else {
                    alert('User successfully removed');
                }
            });
        }
    };

    return (
        <div>
            <h2>Users List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.username} - Roles: {user.roles ? user.roles.join(', ') : 'None'}
                        <input
                            type="text"
                            placeholder="New role"
                            value={roles[user._id] || ''}
                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        />
                        <button onClick={() => updateRole(user._id, roles[user._id])}>Update Role</button>
                        <button onClick={() => removeUser(user._id)}>Delete User</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
