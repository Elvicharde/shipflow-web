import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import BulkList from '../pages/BulkShipments/BulkList';
import BulkUpload from '../pages/BulkShipments/BulkUpload';
import ShipmentDetails from '../pages/ShipmentDetails/ShipmentDetails';
import Settings from '../pages/Settings/Settings';

const Routes: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/bulk" exact component={BulkList} />
                <Route path="/bulk/upload" component={BulkUpload} />
                <Route path="/shipments/:id" component={ShipmentDetails} />
                <Route path="/settings" component={Settings} />
            </Switch>
        </Router>
    );
};

export default Routes;