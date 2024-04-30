import React from 'react';
import { Table } from 'react-bootstrap';

const JoinNowUsers = ({ users }) => {
  return (
    <div>
      {users && users.length > 0 ? (
        <div>
          <h2>Join Now Users</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Contact No</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.contactNo}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div>
          <h2>No Users Found</h2>
        </div>
      )}
    </div>
  );
};

export default JoinNowUsers;
