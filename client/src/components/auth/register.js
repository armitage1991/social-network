import React, { Component } from 'react'
import TextFieldGroup from'../common/TextFieldGroup'
import {withRouter} from 'react-router-dom';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {registeruser} from '../../actions/authActions'

 class Register extends Component {

    constructor(){
        super();
        this.state = {
            name:'',
            email:'',
            password:'',
            password2:'',
            errors:{}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

        // check if new props are being received
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors:nextProps.errors
            });
            
        }
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
        
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }


    onSubmit(e){
        e.preventDefault();

        const newUser = {
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            password2:this.state.password2
        }


         this.props.registeruser(newUser, this.props.history);

        console.log(newUser);
    }
    render() {

        const {errors} = this.state;
        return (
            <div>
                <div className="register">
                    <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your DevConnector account</p>
                        <form onSubmit={this.onSubmit}>
                              
                            <TextFieldGroup
                                    placeholder="name"
                                    name="name"
                                    type="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    error={errors.name}>
                            </TextFieldGroup>

                            <TextFieldGroup
                                    placeholder="E-mail address"
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email}>
                            </TextFieldGroup>

                            
                            
                            <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                            <TextFieldGroup
                                    placeholder="password"
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    error={errors.password}>
                            </TextFieldGroup>
                            <TextFieldGroup
                                    placeholder="password"
                                    name="password2"
                                    type="password"
                                    value={this.state.password2}
                                    onChange={this.onChange}
                                    error={errors.password2}>
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

Register.propTypes = {
    registeruser:propTypes.func.isRequired,
    auth:propTypes.object.isRequired,
    errors:propTypes.object.isRequired
}

const mapStateToProps = (state) =>({
    auth:state.auth,
    errors:state.errors
});

export default connect(mapStateToProps,{registeruser})(withRouter(Register));
