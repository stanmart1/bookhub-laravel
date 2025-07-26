import React from 'react';
import { Container, Typography } from '@mui/material';
import AdminLayout from '../../../Layouts/AdminLayout';
import { TreeView, TreeItem } from '@mui/lab';
import { ExpandMore, ChevronRight } from '@mui/icons-material';

const Permissions = () => {
    return (
        <AdminLayout>
            <Container>
                <Typography variant="h2" component="h1" gutterBottom>
                    Permission Management
                </Typography>
                <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMore />}
                    defaultExpandIcon={<ChevronRight />}
                    sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                >
                    <TreeItem nodeId="1" label="Users">
                        <TreeItem nodeId="2" label="Create" />
                        <TreeItem nodeId="3" label="Read" />
                        <TreeItem nodeId="4" label="Update" />
                        <TreeItem nodeId="5" label="Delete" />
                    </TreeItem>
                    <TreeItem nodeId="6" label="Books">
                        <TreeItem nodeId="7" label="Create" />
                        <TreeItem nodeId="8" label="Read" />
                        <TreeItem nodeId="9" label="Update" />
                        <TreeItem nodeId="10" label="Delete" />
                    </TreeItem>
                </TreeView>
            </Container>
        </AdminLayout>
    );
};

export default Permissions;
