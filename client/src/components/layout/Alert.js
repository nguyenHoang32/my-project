import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { removeAlert } from '../../action/alert';
import Alert from '@material-ui/lab/Alert';

const MyAlert = ({ alerts, removeAlert }) => {
  return(
    <React.Fragment>
    {alerts.map((alert) => 
      <Alert variant="filled" severity={alert.type} key={alert.id} onClose={() => {removeAlert(alert.id)}}>
        {alert.msg}
      </Alert>
    ) }
    </React.Fragment>
  )
}
MyAlert.propTypes = {
  alerts: PropTypes.array.isRequired,
  removeAlert: PropTypes.func
}
const mapStateToProps = (state) => ({
  alerts: state.alert
})

export default connect(mapStateToProps, { removeAlert })(MyAlert);