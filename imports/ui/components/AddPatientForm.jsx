import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';

export const AddPatientForm = ({ onPatientAdded }) => {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [building, setBuilding] = useState('');
    const [flat, setFlat] = useState('');

    const handleSubmit = e => {
	e.preventDefault();
	if (!lastName || !firstName || !middleName || !city || !street || !building || !flat) return;
	Meteor.call('patients.insert', lastName, firstName, middleName, city, street, building, flat, (error) => {
	    if (error) {
		alert(`Failed to add patient: ${error.message}`);
	    } else {
		onPatientAdded(); 
	    }
	});
    };

    return (
	<form onSubmit={handleSubmit}>
	    <div className="form-container">
		<input
		    type="text"
		    placeholder="Last Name"
		    value={lastName}
		    onChange={e => setLastName(e.target.value)}
		/>
		<input
		    type="text"
		    placeholder="First Name"
		    value={firstName}
		    onChange={e => setFirstName(e.target.value)}
		/>
		<input
		    type="text"
		    placeholder="Middle Name"
		    value={middleName}
		    onChange={e => setMiddleName(e.target.value)}
		/>
		<input
		    type="text"
		    placeholder="City"
		    value={city}
		    onChange={e => setCity(e.target.value)}
		/>
		<input
		    type="text"
		    placeholder="Street"
		    value={street}
		    onChange={e => setStreet(e.target.value)}
		/>
		<input
		    type="text"
		    placeholder="Building"
		    value={building}
		    onChange={e => setBuilding(e.target.value)}
		/>
		<input
		    type="text"
		    placeholder="Flat"
		    value={flat}
		    onChange={e => setFlat(e.target.value)}
		/>
		<button type="submit">Add Patient</button>
	    </div>
	</form>
    );
};
