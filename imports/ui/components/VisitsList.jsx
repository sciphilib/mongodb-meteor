import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Visits } from '/imports/api/visits';
import { Patients } from '/imports/api/patients';
import { Doctors } from '/imports/api/doctors';
import { AddVisitForm } from '/imports/ui/components/AddVisitForm';

export const VisitsList = () => {
    const [selectedVisitId, setSelectedVisitId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const visits = useTracker(() => {
        Meteor.subscribe('visits.all');
        return Visits.find({}).fetch();
    });

    const doctorsLoading = useTracker(() => {
	const handle = Meteor.subscribe('doctors.all');
	return !handle.ready();
    });

    const doctors = useTracker(() => Doctors.find().fetch(), []);

    const getDoctorName = (doctorId) => {
        const doctor = doctors.find(doc => doc._id === doctorId);
        return doctor ? `${doctor.lastName} ${doctor.firstName} ${doctor.middleName}` : 'Unknown Doctor';
    };

    const patientLoading = useTracker(() => {
	const handle = Meteor.subscribe('patients.all');
	return !handle.ready();
    });

    const patients = useTracker(() => Patients.find().fetch(), []);

    const getPatientName = (patientId) => {
        const patient = patients.find(doc => doc._id === patientId);
        return patient ? `${patient.lastName} ${patient.firstName} ${patient.middleName}` : 'Unknown Patient';
    };

    const handleAddVisitClick = () => {
        setShowAddForm(!showAddForm);
    };

    const handleRemoveVisit = () => {
        if (selectedVisitId) {
            Meteor.call('visits.remove', selectedVisitId, (error) => {
                if (error) {
                    alert('Deletion error: ' + error.message);
                } else {
                    setSelectedVisitId(null);
                }
            });
        } else {
            alert('Choose visit you want to delete.');
        }
    };

 return (
        <>
            <div className="form-container">
                <button onClick={handleAddVisitClick}>
                    {showAddForm ? 'Cancel' : 'Add Visit'}
                </button>
                {showAddForm && <AddVisitForm onVisitAdded={() => setShowAddForm(false)} />}
                <button onClick={handleRemoveVisit}>Delete Visit</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Doctor</th>
                        <th>Patient</th>
                        <th>Complaints</th>
                        <th>Start Date</th>
			<th>End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {visits.map(visit => (
                        <tr key={visit._id} 
                            onClick={() => setSelectedVisitId(visit._id)}
                            style={{backgroundColor: selectedVisitId === visit._id ? '#e0e0e0' : 'transparent'}}>
                            <td>{getDoctorName(visit.doctorId)}</td>
                            <td>{getPatientName(visit.patientId)}</td>
                            <td>{visit.complaints}</td>
                            <td>{visit.startDate.toLocaleDateString()}</td>
			    <td>{visit.endDate.toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
