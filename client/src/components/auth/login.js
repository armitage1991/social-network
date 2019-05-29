import React, { Component } from 'react'
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup'
import {loginUser} from '../../actions/authActions'


class Login extends Component {

    constructor(){
        super();
        this.state = {
         
            email:'',
            password:'',
            errors:{}
         
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

        componentDidMount(){
            if(this.props.auth.isAuthenticated){
                this.props.history.push('/dashboard');
            }
        }

        // check if new props are being received
        componentWillReceiveProps(nextProps){

            // check if the user is authenticated

            if(nextProps.auth.isAuthenticated){
                this.props.history.push('/dashboard');
            }
            if(nextProps.errors){
                console.log(nextProps.errors);
                this.setState({errors:nextProps.errors});
                
            } 
        }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});


    }

    onSubmit(e){
        e.preventDefault();

        const loginUser = {
            email:this.state.email,
            password:this.state.password
        }

        this.props.loginUser(loginUser);
    }
    render() {

        const {errors} = this.state;
        return (
            <div>
                 <div className="login">
                    <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Log In</h1>
                        <p className="lead text-center">Sign in to your DevConnector account</p>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                placeholder="Email address"
                                name="email"
                                type="email"
                                value={this.state.email}
                                onChange={this.onChange}
                                error={errors.email}>

                            </TextFieldGroup>
                         
                            <TextFieldGroup
                                placeholder="password"
                                name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                error={errors.password}>

                            </TextFieldGroup>
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}



const mapStateToProps = (state) =>({
    auth: state.auth,
    errors:state.errors
})

Login.propTypes = {
    loginUser:propTypes.func.isRequired,
    auth:propTypes.object.isRequired,
    errors:propTypes.object.isRequired
}

export default connect(mapStateToProps,{loginUser})(Login);
