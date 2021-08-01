import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Show extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: {}
        }
    }

    componentDidMount() {

        const id = this.props.match.params.id

        axios.get(`/api/users/${id}`).then(response => {
            this.setState({
                users: response.data
            })
        })
    }

    render() {
        const { users } = this.state

        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>Detail Name: {users.name}</div>
                            <div className='card-body'>
                                <p>{users.email}</p>
                                <p>{users.created_at}</p>
                                <Link
                                    className='btn btn-primary'
                                    to={`/`}
                                >Back
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Show