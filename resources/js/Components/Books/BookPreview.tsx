import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

interface BookPreviewProps {
    open: boolean;
    onClose: () => void;
    book: {
        title: string;
        content: string;
    };
}

const BookPreview = ({ open, onClose, book }: BookPreviewProps) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>
                {book.title}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {book.content}
            </DialogContent>
        </Dialog>
    );
};

export default BookPreview;
