import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profileAction'
import Spinner from '../common/Spinner';

 class Dashboard extends Component {
     componentDidMount(){
         this.props.getCurrentProfile();


     }
    render() {

        const {user} = this.props.auth;
        const{profile,loading} = this.props.profile

        let dashboardContent;

        console.log(this.props.profile)

        if(profile === null || loading){
            dashboardContent = <h4><Spinner></Spinner></h4>
        }else{
            // Check if logged user has a profile

            if(Object.keys(profile).length > 0){
                dashboardContent = <h1>Hello</h1>
            }else{
                dashboardContent = (
                    <div> 
                        <p className="lead text-muted"> Welcome {user.name}</p>
                        <p> you have no profile</p>
                        <Link to="/create-profile" className="btn tbn-lg btn-info">Create profile</Link>
                    </div>
                )
            }
        }
        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
                Hi there
            </div>
        )
    }
}

Dashboard.propTypes = {
    getCurrentProfile:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    profile:PropTypes.object.isRequired
}

const mapStateToProps = state=> ({
    profile:state.profile,
    auth:state.auth
})

export default connect(mapStateToProps,{getCurrentProfile})(Dashboard);
