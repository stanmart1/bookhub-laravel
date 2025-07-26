import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';

const schema = z.object({
    email: z.string().email(),
});

type ForgotPasswordFormInputs = z.infer<typeof schema>;

const ForgotPasswordForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormInputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: ForgotPasswordFormInputs) => {
        console.log(data);
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    Forgot Password
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Send Password Reset Link
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default ForgotPasswordForm;
