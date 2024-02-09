import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Doctors } from '/imports/api/doctors';
import { Appointments } from '/imports/api/appointments';
import { AddDoctorForm } from '/imports/ui/components/AddDoctorForm';

export const DoctorsList = () => {
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showAppointments, setShowAppointments] = useState(false);

    const doctors = useTracker(() => {
        Meteor.subscribe('doctors.all');
        return Doctors.find({}).fetch();
    });

    useEffect(() => {
	if (selectedDoctorId) {
            Meteor.subscribe('appointments.all', selectedDoctorId);
	}
    }, [selectedDoctorId]);

    const appointments = useTracker(() => {
	return Appointments.find({ doctorId: selectedDoctorId }).fetch();
    });

    const toggleShowAppointments = () => {
        setShowAppointments(!showAppointments);
    };

    const handleAddDoctorClick = () => {
        setShowAddForm(!showAddForm);
    };

    const handleRemoveDoctor = () => {
        if (selectedDoctorId) {
            Meteor.call('doctors.remove', selectedDoctorId, (error) => {
                if (error) {
                    alert('Deletion error: ' + error.message);
                } else {
                    setSelectedDoctorId(null);
                }
            });
        } else {
            alert('Choose doctor you want to delete.');
        }
    };

 return (
        <>
            <div className="form-container">
                <button onClick={handleAddDoctorClick}>
                    {showAddForm ? 'Cancel' : 'Add Doctor'}
                </button>
                {showAddForm && <AddDoctorForm onDoctorAdded={() => setShowAddForm(false)} />}
                <button onClick={handleRemoveDoctor}>Delete Doctor</button>
                <button onClick={toggleShowAppointments}>Show Appointments</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Last name</th>
                        <th>First name</th>
                        <th>Middle name</th>
                        <th>Specialization</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map(doctor => (
                        <tr key={doctor._id} 
                            onClick={() => setSelectedDoctorId(doctor._id)}
                            style={{backgroundColor: selectedDoctorId === doctor._id ? '#e0e0e0' : 'transparent'}}>
                            <td>{doctor.lastName}</td>
                            <td>{doctor.firstName}</td>
                            <td>{doctor.middleName}</td>
                            <td>{doctor.specialty}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showAppointments && selectedDoctorId && (
                <>
                    <h4>Appointments for selected doctor</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Weekday</th>
                                <th>Begin Time</th>
                                <th>End Time</th>
                                <th>Office</th>
                                <th>Cabinet</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(appointment => (
                                <tr key={appointment._id}>
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
            )}
        </>
    );
};
