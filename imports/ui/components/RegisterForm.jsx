import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { useNavigate } from 'react-router-dom';

export const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    };

    const submit = e => {
        e.preventDefault();

        Accounts.createUser({username, email, password}, err => {
            if (err) {
                alert(err.reason);
            } else {
		navigateTo('/menu')
                console.log("User registered successfully!");
            }
        });
    };

    return (
        <form onSubmit={submit} className="register-form">
            <div className="form-field">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    required
                    onChange={e => setUsername(e.target.value)}
                />
            </div>
            <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="form-field">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};
