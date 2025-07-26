import React from 'react';
import { Container, Typography } from '@mui/material';
import AdminLayout from '../../../Layouts/AdminLayout';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Grid, Button } from '@mui/material';

const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    role: z.string(),
});

type UserFormInputs = z.infer<typeof schema>;

const Edit = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<UserFormInputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: UserFormInputs) => {
        console.log(data);
    };

    return (
        <AdminLayout>
            <Container>
                <Typography variant="h2" component="h1" gutterBottom>
                    Edit User
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField required id="name" label="Name" fullWidth {...register('name')} error={!!errors.name} helperText={errors.name?.message} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required id="email" label="Email" fullWidth {...register('email')} error={!!errors.email} helperText={errors.email?.message} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required id="role" label="Role" fullWidth {...register('role')} error={!!errors.role} helperText={errors.role?.message} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained">Save</Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </AdminLayout>
    );
};

export default Edit;
