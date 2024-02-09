import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Specialties } from '/imports/api/specialties';

export const AddDoctorForm = ({ onDoctorAdded }) => {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [specialty, setSpecialty] = useState('');

    const specialties = useTracker(() => Meteor.subscribe('specialties.all') && Specialties.find({}).fetch());

    const handleSubmit = e => {
	e.preventDefault();
	if (!lastName || !firstName || !middleName || !specialty) return;
	Meteor.call('doctors.insert', lastName, firstName, middleName, specialty, (error) => {
	    if (error) {
		alert(`Failed to add doctor: ${error.message}`);
	    } else {
		onDoctorAdded(); 
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
		<select
		    value={specialty}
		    onChange={(e) => setSpecialty(e.target.value)}
		>
		    {specialties.map(specialty => (
			<option key={specialty._id} value={specialty.name}>
			    {specialty.name}
			</option>
		    ))}
		</select>
		<button type="submit">Add Doctor</button>
	    </div>
	</form>
    );
};
