import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';


const PrivateRoute = ({ auth: { isAuth, isLoading }, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoading ? (
        <div style={{position: 'absolute', left: '50%',
        top: '50%'}}>
          <CircularProgress/> 
        </div>
        
      ) : isAuth ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
)

const mapStateToProps = (state) => ({
  auth: state.auth
})
export default connect(mapStateToProps, null)(PrivateRoute);