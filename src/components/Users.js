import React from 'react';
import { Table } from 'react-bootstrap';

import Header from "../components/Header";
import Footer from "../components/Footer";

const UsersTable = ({ users }) => {
  if (!users || users.length === 0) {
    return (
      <div>
        <h2>No Users Found</h2>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div>
        <h2>Join Now Users</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Why do you want to join us?</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.WhyDoYouWantToJoinUs}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Footer />
    </div>
  );
};

export default UsersTable;
