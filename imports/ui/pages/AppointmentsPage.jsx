import React from 'react';
import { AppointmentsList } from '/imports/ui/components/AppointmentsList';
import { AddDoctorForm } from '/imports/ui/components/AddDoctorForm';

export const AppointmentsPage = () => {
    return (
        <div>
            <h2>Appointments</h2>
	    <AppointmentsList />
        </div>
    );
};
