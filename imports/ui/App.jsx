import React from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { MainMenu } from './pages/MainMenu';
import { DoctorsPage } from './pages/DoctorsPage';
import { SpecialtiesPage } from './pages/SpecialtiesPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { MedicationsPage } from './pages/MedicationsPage';
import { ProceduresPage } from './pages/ProceduresPage';
import { TestsPage } from './pages/TestsPage';
import { VisitsPage } from './pages/VisitsPage';
import { PatientsPage } from './pages/PatientsPage';
import { RegisterForm } from './components/RegisterForm';
import { LoginForm } from './components/LoginForm';

export const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/doctors" element={<DoctorsPage />} />
		<Route path="/specialties" element={<SpecialtiesPage />} />
		<Route path="/appointments" element={<AppointmentsPage />} />
		<Route path="/visits" element={<VisitsPage />} />
		<Route path="/patients" element={<PatientsPage />} />
		<Route path="/medications" element={<MedicationsPage />} />
		<Route path="/procedures" element={<ProceduresPage />} />
		<Route path="/tests" element={<TestsPage />} />
		<Route path="/register" element={<RegisterForm />} />
		<Route path="/login" element={<LoginForm />} />
		<Route path="/menu" element={<MainMenu />} />
            </Routes>
        </Router>
    );
};
