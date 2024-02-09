import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

export const AddMedicationForm = ({ onMedicationAdded }) => {
    const [newMedication, setNewMedication] = useState('');

    const handleSubmit = e => {
	e.preventDefault();
	if (!newMedication) return;
	Meteor.call('medications.insert', newMedication, (error) => {
	    if (error) {
		alert(`Failed to add medication: ${error.message}`);
	    } else {
		onMedicationAdded(); 
	    }
	});
    };

    return (
	<form onSubmit={handleSubmit}>
	    <div className="form-container">
		<input
		    type="text"
		    placeholder="Medication"
		    value={newMedication}
		    onChange={e => setNewMedication(e.target.value)}
		/>
		<button type="submit">Add Medication</button>
	    </div>
	</form>
    );
};
