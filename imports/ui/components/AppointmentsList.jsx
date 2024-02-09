import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Appointments } from '/imports/api/appointments';
import { Doctors } from '/imports/api/doctors';
import { AddAppointmentForm } from '/imports/ui/components/AddAppointmentForm';

export const AppointmentsList = () => {
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const doctorsLoading = useTracker(() => {
	const handle = Meteor.subscribe('doctors.all');
	return !handle.ready();
    });

    const doctors = useTracker(() => Doctors.find().fetch(), []);
    
    const appointments = useTracker(() => {
        Meteor.subscribe('appointments.all');
        return Appointments.find({}).fetch();
    });

    const handleAddAppointmentClick = () => {
        setShowAddForm(!showAddForm);
    };

    const handleRemoveAppointment = () => {
        if (selectedAppointmentId) {
            Meteor.call('appointments.remove', selectedAppointmentId, (error) => {
                if (error) {
                    alert('Deletion error: ' + error.message);
                } else {
                    setSelectedAppointmentId(null);
                }
            });
        } else {
            alert('Choose appointment you want to delete.');
        }
    };

    const getDoctorName = (doctorId) => {
        const doctor = doctors.find(doc => doc._id === doctorId);
        return doctor ? `${doctor.lastName} ${doctor.firstName} ${doctor.middleName}` : 'Unknown Doctor';
    };

    return (
        <>
	    <div className="form-container">
		<button onClick={handleAddAppointmentClick}>
                    {showAddForm ? 'Cancel' : 'Add'}
		</button>
		{showAddForm && <AddAppointmentForm onAppointmentAdded={() => setShowAddForm(false)} />}
		<button onClick={handleRemoveAppointment}>Delete</button>
	    </div>
            <table>
                <thead>
                    <tr>
                        <th>Doctor</th>
                        <th>Weekday</th>
                        <th>Begin Time</th>
                        <th>End Time</th>
                        <th>Office</th>
                        <th>Cabinet</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => (
                        <tr key={appointment._id} 
                            onClick={() => setSelectedAppointmentId(appointment._id)}
                            style={{backgroundColor: selectedAppointmentId === appointment._id ? '#e0e0e0' : 'transparent'}}>
                            <td>{getDoctorName(appointment.doctorId)}</td>
                            <td>{appointment.weekday}</td>
                            <td>{appointment.beginTime}</td>
                            <td>{appointment.endTime}</td>
                            <td>{appointment.office}</td>
                            <td>{appointment.cabinet}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
