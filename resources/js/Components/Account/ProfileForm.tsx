import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Grid, Button } from '@mui/material';

const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
});

type ProfileFormInputs = z.infer<typeof schema>;

const ProfileForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormInputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: ProfileFormInputs) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField required id="name" label="Name" fullWidth {...register('name')} error={!!errors.name} helperText={errors.name?.message} />
                </Grid>
                <Grid item xs={12}>
                    <TextField required id="email" label="Email" fullWidth {...register('email')} error={!!errors.email} helperText={errors.email?.message} />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained">Save</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ProfileForm;
