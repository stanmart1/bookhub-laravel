import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';

const schema = z.object({
    code: z.string().min(6),
});

type TwoFactorFormInputs = z.infer<typeof schema>;

const TwoFactorForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<TwoFactorFormInputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: TwoFactorFormInputs) => {
        console.log(data);
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    Two-Factor Challenge
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Code"
                        type="text"
                        fullWidth
                        margin="normal"
                        {...register('code')}
                        error={!!errors.code}
                        helperText={errors.code?.message}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default TwoFactorForm;
