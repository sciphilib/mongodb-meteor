import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

export const UsersManagement = () => {
  const users = useTracker(() => {
    Meteor.subscribe('users.all');
    return Meteor.users.find().fetch();
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleCreateUser = e => {
    e.preventDefault();
    Meteor.call('users.create', username, password, role, (error) => {
      if (error) {
        alert(`Failed to create user: ${error.message}`);
      } else {
        setUsername('');
        setPassword('');
        setRole('');
        alert('User created successfully!');
      }
    });
  };

  // Добавьте здесь логику для отображения и удаления пользователей

  return (
    <div>
	<LoginForm />
      {/* Список пользователей с возможностью удаления */}
    </div>
  );
};

export const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submit = e => {
        e.preventDefault();

        Meteor.loginWithPassword(username, password, (error) => {
            if (error) {
                console.log(error.reason);
            } else {
                // Пользователь успешно вошел в систему
                // Перенаправление или другие действия
            }
        });
    };

    return (
        <form onSubmit={submit} className="login-form">
            <label htmlFor="username">Username</label>
            <input
                type="text"
                placeholder="Username"
                name="username"
                required
                onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
                type="password"
                placeholder="Password"
                name="password"
                required
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Log In</button>
        </form>
    );
};

const createUser = (username, password) => {
    Accounts.createUser({username, password}, (error) => {
        if (error) {
            console.error("Ошибка создания пользователя:", error);
        } else {
            // Пользователь создан и автоматически вошел в систему
            // Перенаправление или другие действия
        }
    });
};
