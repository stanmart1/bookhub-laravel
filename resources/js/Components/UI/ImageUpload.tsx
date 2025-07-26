import React, { useState } from 'react';
import { Button, Box, Avatar } from '@mui/material';

interface ImageUploadProps {
    onUpload: (file: File) => void;
}

const ImageUpload = ({ onUpload }: ImageUploadProps) => {
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            onUpload(file);
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={preview ?? undefined} sx={{ width: 100, height: 100 }} />
            <Button variant="contained" component="label">
                Upload File
                <input type="file" hidden onChange={handleFileChange} accept="image/*" />
            </Button>
        </Box>
    );
};

export default ImageUpload;
