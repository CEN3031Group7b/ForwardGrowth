import React from 'react';
import { Route, Redirect} from 'react-router-dom';

import AdminDashboard from './views/AdminDashboard/AdminDashboard';
import NotFound from "./views/NotFound"


class PrivateRoute extends React.Component {
    //const { authTokens } = useAuth();
    render() {
        return (
            <Route
                {...() =>
                    true ? (
                        <Redirect to="/admin" component={this.props.component}/>
                        
                    ) : (
                            <Redirect to="/login"  />
                        )
                }
            />
        );
    }
}
export default PrivateRoute;

