import React from 'react';
import { Outlet } from 'react-router-dom';
import { Wizard } from '../../../components/ui/Wizard';

const WizardLayout: React.FC = () => {
    return (
        <div className="wizard-layout">
            <Wizard />
            <Outlet />
        </div>
    );
};

export default WizardLayout;