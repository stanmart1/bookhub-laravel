import React from 'react';
import { Select, MenuItem } from '@mui/material';

const RoleManager = ({ roles, user, onUpdate }) => {
  return (
    <Select value={user.role} onChange={(e) => onUpdate(user.id, e.target.value)}>
      {roles.map((role) => (
        <MenuItem key={role.id} value={role.name}>
          {role.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default RoleManager;
