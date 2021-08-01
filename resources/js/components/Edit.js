import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert';

class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            alert: null,
            message: '',
            errors: []
        }
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleUpdateArticle = this.handleUpdateArticle.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount() {

        const id = this.props.match.params.id

        axios.get(`/api/users/${id}`).then(response => {
            this.setState({
                name: response.data.name,
                email: response.data.email,
            })
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
                {this.state.message}
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

    handleUpdateArticle(event) {
        event.preventDefault()

        const data = {
            name: this.state.name,
            email: this.state.email
        }

        const id = this.props.match.params.id

        axios.put(`/api/users/${id}`, data)
            .then(response => {
                // redirect to the homepage
                var msg = response.data.success;
                if (msg == true) {
                    this.setState({
                        message: response.data.message
                    })
                    return this.goToHome();
                }

            });
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
        const { data } = this.state
        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>Create new Users</div>
                            <div className='card-body'>
                                <form onSubmit={this.handleUpdateArticle}>
                                    <div className='form-group'>
                                        <label htmlFor='title'>Name</label>
                                        <input
                                            id='name'
                                            type='text'
                                            className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                                            name='name'
                                            value={this.state.name}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('title')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='title'>Email</label>
                                        <input
                                            id='email'
                                            type='email'
                                            className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                            name='email'
                                            value={this.state.email}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('title')}
                                    </div>
                                    <Link
                                        className='btn btn-secondary'
                                        to={`/`}
                                    >Back
                                    </Link>
                                    <button className='btn btn-primary'>Update</button>
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
export default Edit