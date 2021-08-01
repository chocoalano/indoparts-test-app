import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert';

class Create extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            pass: '',
            alert: null,
            errors: []
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreate = this.handleCreate.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    goToHome() {
        const getAlert = () => (
            <SweetAlert
                success
                title="Success!"
                onConfirm={() => this.onSuccess()}
                onCancel={this.hideAlert()}
                timeout={2000}
                confirmBtnText="Oke Siap"
            >
                Created Data successfully
            </SweetAlert>
        );
        this.setState({
            alert: getAlert()
        });
    }

    onSuccess() {
        this.props.history.push('/');
    }

    hideAlert() {
        this.setState({
            alert: null
        });
    }

    handleCreate(event) {
        event.preventDefault()
        const data = {
            name: this.state.name,
            email: this.state.email,
            pass: this.state.pass,
        }
        axios.post('/api/users', data).then(response => {
            var msg = response.data.success;
            if (msg == true) {
                return this.goToHome();
            }
        })
    }

    hasErrorFor(field) {
        return !!this.state.errors[field]
    }

    renderErrorFor(field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    render() {
        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>Create new Users</div>
                            <div className='card-body'>
                                <form onSubmit={this.handleCreate}>
                                    <div className='form-group'>
                                        <label htmlFor='name'>Name</label>
                                        <input
                                            id='name'
                                            type='text'
                                            className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                                            name='name'
                                            value={this.state.name}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('name')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='email'>Email</label>
                                        <input
                                            id='email'
                                            type='text'
                                            className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                            name='email'
                                            value={this.state.email}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('email')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='pass'>Password</label>
                                        <input
                                            id='pass'
                                            type='password'
                                            className={`form-control ${this.hasErrorFor('pass') ? 'is-invalid' : ''}`}
                                            name='pass'
                                            value={this.state.pass}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('pass')}
                                    </div>
                                    <Link
                                        className='btn btn-secondary'
                                        to={`/`}
                                    >Back
                                    </Link>
                                    <button className='btn btn-primary'>Create</button>
                                    {this.state.alert}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Create