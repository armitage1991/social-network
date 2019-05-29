import React from 'react'
import {Route,Redirect} from 'react-router-dom';
import {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'


const PrivateROute = ({component:Component,auth,...rest}) => (
    <Route {...rest}
            render = {props =>
                auth.isAuthenticated === true ? (<Component {...props}/>):(<Redirect to="/login"></Redirect>)
            }
    ></Route>
);

PrivateROute.prototypes = {
    auth:PropTypes.object.isRequired
}

const mapStateToProps = state =>({
    auth:state.auth
})


export default connect(mapStateToProps)(PrivateROute);
