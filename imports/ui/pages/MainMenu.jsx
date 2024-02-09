import React from 'react';
import { useNavigate } from 'react-router-dom';

export const MainMenu = () => {
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    };

    return (
        <div className="main-menu">
            <h1>Policlinic Menu</h1>
	    <div className="form-container">
		<button onClick={() => navigateTo('/doctors')}>Doctors</button>
		<button onClick={() => navigateTo('/patients')}>Patients</button>
		<button onClick={() => navigateTo('/specialties')}>Specialties</button>
		<button onClick={() => navigateTo('/appointments')}>Appointments</button>
		<button onClick={() => navigateTo('/visits')}>Visits</button>
		<button onClick={() => navigateTo('/medications')}>Medications</button>
		<button onClick={() => navigateTo('/procedures')}>Procedures</button>
		<button onClick={() => navigateTo('/tests')}>Tests</button>
	    </div>
        </div>
    );
};
