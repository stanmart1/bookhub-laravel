import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
});

type ResetPasswordFormInputs = z.infer<typeof schema>;

const ResetPasswordForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormInputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: ResetPasswordFormInputs) => {
        console.log(data);
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                    Reset Password
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
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        {...register('password_confirmation')}
                        error={!!errors.password_confirmation}
                        helperText={errors.password_confirmation?.message}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Reset Password
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default ResetPasswordForm;
