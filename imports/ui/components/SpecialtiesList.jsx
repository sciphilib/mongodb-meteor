import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Specialties } from '/imports/api/specialties';
import { AddSpecialtyForm } from '/imports/ui/components/AddSpecialtyForm';

export const SpecialtiesList = () => {
    const [selectedSpecialtyId, setSelectedSpecialtyId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const specialties = useTracker(() => {
        Meteor.subscribe('specialties.all');
        return Specialties.find({}).fetch();
    });

    const handleAddSpecialtyClick = () => {
        setShowAddForm(!showAddForm);
    };

    const handleRemoveSpecialty = () => {
        if (selectedSpecialtyId) {
            Meteor.call('specialties.remove', selectedSpecialtyId, (error) => {
                if (error) {
                    alert('Deletion error: ' + error.message);
                } else {
                    setSelectedSpecialtyId(null);
                }
            });
        } else {
            alert('Choose specialty you want to delete.');
        }
    };

    return (
        <>
	    <div className="form-container">
		    <button onClick={handleAddSpecialtyClick}>
			{showAddForm ? 'Cancel' : 'Add'}
		    </button>
		    {showAddForm && <AddSpecialtyForm onSpecialtyAdded={() => setShowAddForm(false)} />}
		<button onClick={handleRemoveSpecialty}>Delete</button>
	    </div>
            <table>
                <thead>
                    <tr>
                        <th>Specialty</th>
                    </tr>
                </thead>
                <tbody>
                    {specialties.map(specialty => (
                        <tr key={specialty._id} 
                            onClick={() => setSelectedSpecialtyId(specialty._id)}
                            style={{backgroundColor: selectedSpecialtyId === specialty._id ? '#e0e0e0' : 'transparent'}}>
                            <td>{specialty.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
