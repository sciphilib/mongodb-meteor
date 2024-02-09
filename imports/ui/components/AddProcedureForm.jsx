import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

export const AddProcedureForm = ({ onProcedureAdded }) => {
    const [newProcedure, setNewProcedure] = useState('');

    const handleSubmit = e => {
	e.preventDefault();
	if (!newProcedure) return;
	Meteor.call('procedures.insert', newProcedure, (error) => {
	    if (error) {
		alert(`Failed to add procedure: ${error.message}`);
	    } else {
		onProcedureAdded(); 
	    }
	});
    };

    return (
	<form onSubmit={handleSubmit}>
	    <div className="form-container">
		<input
		    type="text"
		    placeholder="Procedure"
		    value={newProcedure}
		    onChange={e => setNewProcedure(e.target.value)}
		/>
		<button type="submit">Add Procedure</button>
	    </div>
	</form>
    );
};
