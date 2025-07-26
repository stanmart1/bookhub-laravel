import React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';

interface FormatSelectorProps {
    value: string;
    onChange: (event: React.MouseEvent<HTMLElement>, newFormat: string) => void;
}

const FormatSelector = ({ value, onChange }: FormatSelectorProps) => {
    return (
        <ToggleButtonGroup
            value={value}
            exclusive
            onChange={onChange}
            aria-label="text alignment"
        >
            <ToggleButton value="epub" aria-label="epub">
                EPUB
            </ToggleButton>
            <ToggleButton value="pdf" aria-label="pdf">
                PDF
            </ToggleButton>
            <ToggleButton value="mobi" aria-label="mobi">
                MOBI
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default FormatSelector;
