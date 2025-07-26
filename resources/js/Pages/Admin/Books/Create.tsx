import React from 'react';
import { Container, Typography } from '@mui/material';
import AdminLayout from '../../../Layouts/AdminLayout';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Grid, Button } from '@mui/material';

const schema = z.object({
    title: z.string().min(1),
    author: z.string().min(1),
    price: z.number().min(0),
});

type BookFormInputs = z.infer<typeof schema>;

const Create = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<BookFormInputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: BookFormInputs) => {
        console.log(data);
    };

    return (
        <AdminLayout>
            <Container>
                <Typography variant="h2" component="h1" gutterBottom>
                    Create Book
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField required id="title" label="Title" fullWidth {...register('title')} error={!!errors.title} helperText={errors.title?.message} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required id="author" label="Author" fullWidth {...register('author')} error={!!errors.author} helperText={errors.author?.message} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required id="price" label="Price" type="number" fullWidth {...register('price', { valueAsNumber: true })} error={!!errors.price} helperText={errors.price?.message} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained">Create</Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </AdminLayout>
    );
};

export default Create;
