import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Grid, Button } from '@mui/material';

const schema = z.object({
    current_password: z.string().min(8),
    new_password: z.string().min(8),
    new_password_confirmation: z.string().min(8),
}).refine((data) => data.new_password === data.new_password_confirmation, {
    message: "New passwords don't match",
    path: ["new_password_confirmation"],
});

type PasswordChangeFormInputs = z.infer<typeof schema>;

const PasswordChangeForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<PasswordChangeFormInputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: PasswordChangeFormInputs) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField required id="current_password" label="Current Password" type="password" fullWidth {...register('current_password')} error={!!errors.current_password} helperText={errors.current_password?.message} />
                </Grid>
                <Grid item xs={12}>
                    <TextField required id="new_password" label="New Password" type="password" fullWidth {...register('new_password')} error={!!errors.new_password} helperText={errors.new_password?.message} />
                </Grid>
                <Grid item xs={12}>
                    <TextField required id="new_password_confirmation" label="Confirm New Password" type="password" fullWidth {...register('new_password_confirmation')} error={!!errors.new_password_confirmation} helperText={errors.new_password_confirmation?.message} />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained">Change Password</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default PasswordChangeForm;
