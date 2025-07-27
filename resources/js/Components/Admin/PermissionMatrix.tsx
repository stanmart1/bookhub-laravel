import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from '@mui/material';

const PermissionMatrix = ({ roles, permissions, onUpdate }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Permission</TableCell>
            {roles.map((role) => (
              <TableCell key={role.id}>{role.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {permissions.map((permission) => (
            <TableRow key={permission.id}>
              <TableCell>{permission.name}</TableCell>
              {roles.map((role) => (
                <TableCell key={role.id}>
                  <Checkbox
                    checked={role.permissions.includes(permission.name)}
                    onChange={(e) => onUpdate(role.id, permission.id, e.target.checked)}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PermissionMatrix;
