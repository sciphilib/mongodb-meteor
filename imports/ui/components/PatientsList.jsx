import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Patients } from '/imports/api/patients';
import { Visits } from '/imports/api/visits';
import { Doctors } from '/imports/api/doctors';
import { AddPatientForm } from '/imports/ui/components/AddPatientForm';

export const PatientsList = () => {
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showVisits, setShowVisits] = useState(false);

    const patients = useTracker(() => {
        Meteor.subscribe('patients.all');
        return Patients.find({}).fetch();
    });

    useEffect(() => {
	if (selectedPatientId) {
            Meteor.subscribe('patients.all', selectedPatientId);
	}
    }, [selectedPatientId]);

    const visits = useTracker(() => {
        if (selectedPatientId) {
            Meteor.subscribe('visits.forPatient', selectedPatientId);
            return Visits.find({ patientId: selectedPatientId }).fetch();
        }
        return [];
    }, [selectedPatientId]);

    const toggleShowVisits = () => {
        setShowVisits(!showVisits);
    };

    const doctors = useTracker(() => {
	Meteor.subscribe('doctors.all');
	return Doctors.find({}).fetch();
    });

    const getDoctorName = (doctorId) => {
        const doctor = doctors.find(pat => pat._id === doctorId);
        return doctor ? `${doctor.lastName} ${doctor.firstName} ${doctor.middleName}` : 'Unknown Doctor';
    };

    const handleAddPatientClick = () => {
        setShowAddForm(!showAddForm);
    };

    const handleRemovePatient = () => {
        if (selectedPatientId) {
            Meteor.call('patients.remove', selectedPatientId, (error) => {
                if (error) {
                    alert('Deletion error: ' + error.message);
                } else {
                    setSelectedPatientId(null);
                }
            });
        } else {
            alert('Choose patient you want to delete.');
        }
    };

    return (
        <>
  	    <div className="form-container">
  		<button onClick={handleAddPatientClick}>
                    {showAddForm ? 'Cancel' : 'Add'}
  		</button>
  		{showAddForm && <AddPatientForm onPatientAdded={() => setShowAddForm(false)} />}
  		<button onClick={handleRemovePatient}>Delete</button>
  		<button onClick={toggleShowVisits}>Show visits</button>
  	    </div>
            <table>
                <thead>
                    <tr>
                        <th>Last name</th>
                        <th>First name</th>
                        <th>Middle name</th>
                        <th>City</th>
  			<th>Street</th>
  			<th>Building</th>
  			<th>Flat</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(patient => (
                        <tr key={patient._id} 
                            onClick={() => setSelectedPatientId(patient._id)}
                            style={{backgroundColor: selectedPatientId === patient._id ? '#e0e0e0' : 'transparent'}}>
                            <td>{patient.lastName}</td>
                            <td>{patient.firstName}</td>
                            <td>{patient.middleName}</td>
                            <td>{patient.city}</td>
  			    <td>{patient.street}</td>
                            <td>{patient.building}</td>
                            <td>{patient.flat}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
  	    {showVisits && selectedPatientId && (
                <>
                    <h4>Visits for {patients.find(p => p._id === selectedPatientId)?.firstName}</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Doctor</th>
                                <th>Complaints</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visits.map(visit => (
                                <tr key={visit._id}>
                                    <td>{getDoctorName(visit.doctorId)}</td>
                                    <td>{visit.complaints}</td>
                                    <td>{visit.startDate.toLocaleDateString()}</td>
                                    <td>{visit.endDate.toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
};
