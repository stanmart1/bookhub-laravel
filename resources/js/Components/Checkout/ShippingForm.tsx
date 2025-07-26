import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField, Grid } from '@mui/material';

const schema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    address1: z.string().min(1),
    address2: z.string().optional(),
    city: z.string().min(1),
    state: z.string().min(1),
    zip: z.string().min(1),
    country: z.string().min(1),
});

type ShippingFormInputs = z.infer<typeof schema>;

const ShippingForm = () => {
    const { register, formState: { errors } } = useForm<ShippingFormInputs>({
        resolver: zodResolver(schema),
    });

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <TextField required id="firstName" label="First name" fullWidth autoComplete="given-name" {...register('firstName')} error={!!errors.firstName} helperText={errors.firstName?.message} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField required id="lastName" label="Last name" fullWidth autoComplete="family-name" {...register('lastName')} error={!!errors.lastName} helperText={errors.lastName?.message} />
            </Grid>
            <Grid item xs={12}>
                <TextField required id="address1" label="Address line 1" fullWidth autoComplete="shipping address-line1" {...register('address1')} error={!!errors.address1} helperText={errors.address1?.message} />
            </Grid>
            <Grid item xs={12}>
                <TextField id="address2" label="Address line 2" fullWidth autoComplete="shipping address-line2" {...register('address2')} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField required id="city" label="City" fullWidth autoComplete="shipping address-level2" {...register('city')} error={!!errors.city} helperText={errors.city?.message} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField id="state" label="State/Province/Region" fullWidth {...register('state')} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField required id="zip" label="Zip / Postal code" fullWidth autoComplete="shipping postal-code" {...register('zip')} error={!!errors.zip} helperText={errors.zip?.message} />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField required id="country" label="Country" fullWidth autoComplete="shipping country" {...register('country')} error={!!errors.country} helperText={errors.country?.message} />
            </Grid>
        </Grid>
    );
};

export default ShippingForm;
