import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Doctors } from '/imports/api/doctors';

export const AddAppointmentForm = ({ onAppointmentAdded }) => {
    const [weekday, setWeekday] = useState('');
    const [beginTime, setBeginTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [office, setOffice] = useState('');
    const [cabinet, setCabinet] = useState('');
    const [selectedDoctorId, setSelectedDoctorId] = useState('');

    const doctors = useTracker(() => Meteor.subscribe('doctors.all') && Doctors.find().fetch());

    const handleSubmit = e => {
	e.preventDefault();
	if (!weekday || !beginTime || !endTime || !office || !cabinet || !selectedDoctorId) return;
	Meteor.call('appointments.insert', selectedDoctorId, weekday, beginTime, endTime, office, parseInt(cabinet, 10), (error) => {
	    if (error) {
		alert(`Failed to add appointment: ${error.message}`);
	    } else {
		onAppointmentAdded(); 
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
                <input type="text"
		       placeholder="Weekday"
		       value={weekday}
		       onChange={e => setWeekday(e.target.value)}
		/>
                <input type="time"
		       value={beginTime}
		       onChange={e => setBeginTime(e.target.value)}
		/>
                <input type="time"
		       value={endTime}
		       onChange={e => setEndTime(e.target.value)}
		/>
                <input type="text"
		       placeholder="Office"
		       value={office}
		       onChange={e => setOffice(e.target.value)}
		/>
                <input type="number"
		       placeholder="Cabinet"
		       value={cabinet}
		       onChange={e => setCabinet(e.target.value)}
		/>
                <button type="submit">Add Appointment</button>
	    </div>
	</form>
    );
};
