import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Procedures } from '/imports/api/procedures';
import { AddProcedureForm } from '/imports/ui/components/AddProcedureForm';

export const ProceduresList = () => {
    const [selectedProcedureId, setSelectedProcedureId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const procedures = useTracker(() => {
        Meteor.subscribe('procedures.all');
        return Procedures.find({}).fetch();
    });

    const handleAddProcedureClick = () => {
        setShowAddForm(!showAddForm);
    };

    const handleRemoveProcedure = () => {
        if (selectedProcedureId) {
            Meteor.call('procedures.remove', selectedProcedureId, (error) => {
                if (error) {
                    alert('Deletion error: ' + error.message);
                } else {
                    setSelectedProcedureId(null);
                }
            });
        } else {
            alert('Choose procedure you want to delete.');
        }
    };

    return (
        <>
	    <div className="form-container">
		    <button onClick={handleAddProcedureClick}>
			{showAddForm ? 'Cancel' : 'Add'}
		    </button>
		    {showAddForm && <AddProcedureForm onProcedureAdded={() => setShowAddForm(false)} />}
		<button onClick={handleRemoveProcedure}>Delete</button>
	    </div>
            <table>
                <thead>
                    <tr>
                        <th>Procedure</th>
                    </tr>
                </thead>
                <tbody>
                    {procedures.map(procedure => (
                        <tr key={procedure._id} 
                            onClick={() => setSelectedProcedureId(procedure._id)}
                            style={{backgroundColor: selectedProcedureId === procedure._id ? '#e0e0e0' : 'transparent'}}>
                            <td>{procedure.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
