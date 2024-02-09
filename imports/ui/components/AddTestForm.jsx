import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

export const AddTestForm = ({ onTestAdded }) => {
    const [newTest, setNewTest] = useState('');

    const handleSubmit = e => {
	e.preventDefault();
	if (!newTest) return;
	Meteor.call('tests.insert', newTest, (error) => {
	    if (error) {
		alert(`Failed to add test: ${error.message}`);
	    } else {
		onTestAdded(); 
	    }
	});
    };

    return (
	<form onSubmit={handleSubmit}>
	    <div className="form-container">
		<input
		    type="text"
		    placeholder="Test"
		    value={newTest}
		    onChange={e => setNewTest(e.target.value)}
		/>
		<button type="submit">Add Test</button>
	    </div>
	</form>
    );
};
