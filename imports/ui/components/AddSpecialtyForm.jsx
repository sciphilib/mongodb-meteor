import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

export const AddSpecialtyForm = ({ onSpecialtyAdded }) => {
    const [newSpecialty, setNewSpecialty] = useState('');

    const handleSubmit = e => {
	e.preventDefault();
	if (!newSpecialty) return;
	Meteor.call('specialties.insert', newSpecialty, (error) => {
	    if (error) {
		alert(`Failed to add specialty: ${error.message}`);
	    } else {
		onSpecialtyAdded(); 
	    }
	});
    };

    return (
	<form onSubmit={handleSubmit}>
	    <div className="form-container">
		<input
		    type="text"
		    placeholder="Specialty"
		    value={newSpecialty}
		    onChange={e => setNewSpecialty(e.target.value)}
		/>
		<button type="submit">Add Specialty</button>
	    </div>
	</form>
    );
};
