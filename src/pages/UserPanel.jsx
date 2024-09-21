import React from 'react';

const UserPanel = ({ user }) => {
  return (
    <div className="container mt-4">
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <p>Profile created on: {user.createdAt}</p>
    </div>
  );
};

export default UserPanel;