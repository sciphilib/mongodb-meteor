import React from 'react';
import { SpecialtiesList } from '/imports/ui/components/SpecialtiesList';
import { AddSpecialtyForm } from '/imports/ui/components/AddSpecialtyForm';

export const SpecialtiesPage = () => {
    return (
        <div>
            <h2>Specialties</h2>
	    <SpecialtiesList />
        </div>
    );
};
