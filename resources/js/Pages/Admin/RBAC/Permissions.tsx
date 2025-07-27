import React from 'react';
import { Container } from '@mui/material';
import { TreeView } from '@mui/x-tree-view';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { ExpandMore, ChevronRight } from '@mui/icons-material';

const Permissions = () => {
  return (
    <Container>
      <TreeView
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ChevronRight />}
      >
        <TreeItem nodeId="1" label="Users">
          <TreeItem nodeId="2" label="Create" />
          <TreeItem nodeId="3" label="Read" />
          <TreeItem nodeId="4" label="Update" />
          <TreeItem nodeId="5" label="Delete" />
        </TreeItem>
      </TreeView>
    </Container>
  );
};

export default Permissions;
