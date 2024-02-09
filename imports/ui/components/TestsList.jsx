import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Tests } from '/imports/api/tests';
import { AddTestForm } from '/imports/ui/components/AddTestForm';

export const TestsList = () => {
    const [selectedTestId, setSelectedTestId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const tests = useTracker(() => {
        Meteor.subscribe('tests.all');
        return Tests.find({}).fetch();
    });

    const handleAddTestClick = () => {
        setShowAddForm(!showAddForm);
    };

    const handleRemoveTest = () => {
        if (selectedTestId) {
            Meteor.call('tests.remove', selectedTestId, (error) => {
                if (error) {
                    alert('Deletion error: ' + error.message);
                } else {
                    setSelectedTestId(null);
                }
            });
        } else {
            alert('Choose test you want to delete.');
        }
    };

    return (
        <>
	    <div className="form-container">
		    <button onClick={handleAddTestClick}>
			{showAddForm ? 'Cancel' : 'Add'}
		    </button>
		    {showAddForm && <AddTestForm onTestAdded={() => setShowAddForm(false)} />}
		<button onClick={handleRemoveTest}>Delete</button>
	    </div>
            <table>
                <thead>
                    <tr>
                        <th>Test</th>
                    </tr>
                </thead>
                <tbody>
                    {tests.map(test => (
                        <tr key={test._id} 
                            onClick={() => setSelectedTestId(test._id)}
                            style={{backgroundColor: selectedTestId === test._id ? '#e0e0e0' : 'transparent'}}>
                            <td>{test.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
