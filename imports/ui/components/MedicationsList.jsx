import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Medications } from '/imports/api/medications';
import { AddMedicationForm } from '/imports/ui/components/AddMedicationForm';

export const MedicationsList = () => {
    const [selectedMedicationId, setSelectedMedicationId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const medications = useTracker(() => {
        Meteor.subscribe('medications.all');
        return Medications.find({}).fetch();
    });

    const handleAddMedicationClick = () => {
        setShowAddForm(!showAddForm);
    };

    const handleRemoveMedication = () => {
        if (selectedMedicationId) {
            Meteor.call('medications.remove', selectedMedicationId, (error) => {
                if (error) {
                    alert('Deletion error: ' + error.message);
                } else {
                    setSelectedMedicationId(null);
                }
            });
        } else {
            alert('Choose medication you want to delete.');
        }
    };

    return (
        <>
	    <div className="form-container">
		    <button onClick={handleAddMedicationClick}>
			{showAddForm ? 'Cancel' : 'Add'}
		    </button>
		    {showAddForm && <AddMedicationForm onMedicationAdded={() => setShowAddForm(false)} />}
		<button onClick={handleRemoveMedication}>Delete</button>
	    </div>
            <table>
                <thead>
                    <tr>
                        <th>Medication</th>
                    </tr>
                </thead>
                <tbody>
                    {medications.map(medication => (
                        <tr key={medication._id} 
                            onClick={() => setSelectedMedicationId(medication._id)}
                            style={{backgroundColor: selectedMedicationId === medication._id ? '#e0e0e0' : 'transparent'}}>
                            <td>{medication.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
