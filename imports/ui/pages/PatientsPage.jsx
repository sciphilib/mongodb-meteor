import React from 'react';
import { PatientsList } from '/imports/ui/components/PatientsList';
import { AddDoctorForm } from '/imports/ui/components/AddDoctorForm';

export const PatientsPage = () => {
    return (
        <div>
            <h2>Patients</h2>
	    <PatientsList />
        </div>
    );
};
