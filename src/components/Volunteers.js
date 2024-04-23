import React from 'react';
import { Table } from 'react-bootstrap';

import Header from './Header';
import Footer from "../components/Footer";

const Volunteers = () => {
    const volunteersData = [
        { id: 1, name: 'Volunteer 1', email: 'volunteer1@example.com' },
        { id: 2, name: 'Volunteer 2', email: 'volunteer2@example.com' },
    ];

    return (
        <div>
            <Header />
            <h2>Volunteers</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {volunteersData.map((volunteer) => (
                        <tr key={volunteer.id}>
                            <td>{volunteer.id}</td>
                            <td>{volunteer.name}</td>
                            <td>{volunteer.email}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Footer />
        </div>
    );
};

export default Volunteers;
