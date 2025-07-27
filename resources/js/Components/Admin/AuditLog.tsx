import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

const fetchAuditLogs = async () => {
  const { data } = await axios.get('/api/audit-logs');
  return data;
};

const AuditLog = () => {
  const { data: logs, isLoading, isError } = useQuery(['auditLogs'], fetchAuditLogs);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'user', headerName: 'User', width: 150 },
    { field: 'action', headerName: 'Action', width: 150 },
    { field: 'date', headerName: 'Date', width: 150 },
  ];

  if (isLoading) return <div>Loading audit logs...</div>;
  if (isError) return <div>Error loading audit logs.</div>;

  return <DataGrid rows={logs} columns={columns} />;
};

export default AuditLog;
