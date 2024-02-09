import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Specialties } from '/imports/api/specialties';
import { Doctors } from '/imports/api/doctors';
import { Patients } from '/imports/api/patients';

export const AddVisitForm = ({ onVisitAdded }) => {
    const [selectedDoctorId, setSelectedDoctorId] = useState('');
    const [selectedPatientId, setSelectedPatientId] = useState('');
    const [complaints, setComplaints] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const doctors = useTracker(() => Meteor.subscribe('doctors.all') && Doctors.find().fetch());
    const patients = useTracker(() => Meteor.subscribe('patients.all') && Patients.find().fetch());

    const handleSubmit = e => {
	e.preventDefault();
	if (!selectedDoctorId || !selectedPatientId || !complaints || !startDate || !endDate) return;
	Meteor.call('visits.insert', selectedDoctorId, selectedPatientId, complaints, new Date(startDate), new Date(endDate) , (error) => {
	    if (error) {
		alert(`Failed to add visit: ${error.message}`);
	    } else {
		onVisitAdded(); 
	    }
	});
    };

    return (
	<form onSubmit={handleSubmit}>
	    <div className="form-container">
		<select value={selectedDoctorId} onChange={e => setSelectedDoctorId(e.target.value)}>
		    <option value="">Select Doctor</option>
		    {doctors.map(doctor => (
                        <option key={doctor._id} value={doctor._id}>
			    {doctor.lastName} {doctor.firstName} {doctor.middleName}
                        </option>
		    ))}
                </select>
		<select value={selectedPatientId} onChange={e => setSelectedPatientId(e.target.value)}>
		    <option value="">Select Patient</option>
		    {patients.map(patient => (
                        <option key={patient._id} value={patient._id}>
			    {patient.lastName} {patient.firstName} {patient.middleName}
                        </option>
		    ))}
                </select>
		<input
		    type="text"
		    placeholder="Complaints"
		    value={complaints}
		    onChange={e => setComplaints(e.target.value)}
		/>
		<input
		    type="date"
		    placeholder="Start Date"
		    value={startDate}
		    onChange={e => setStartDate(e.target.value)}
		/>
		<input
		    type="date"
		    placeholder="End Date"
		    value={endDate}
		    onChange={e => setEndDate(e.target.value)}
		/>
		<button type="submit">Add Visit</button>
	    </div>
	</form>
    );
};
