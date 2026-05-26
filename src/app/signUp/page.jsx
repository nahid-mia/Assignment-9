'use client'
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

const SignUpPage = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        const { data: res, error } = await authClient.signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
            image: data.image,
        });
        redirect('/');
    }

    return (
        <div className='flex flex-col justify-center items-center  my-30'>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Register</legend>

                <label className="label">Name</label>
                <input type="text" {...register("name")} className="input" placeholder="Your Name" />

                <label className="label">Email</label>
                <input type="email" {...register("email", { required: true })} className="input" placeholder="Email" />

                <label className="label">Image URL</label>
                <input type="url" {...register("image")} className="input" placeholder="image url" />

                <label className="label">Password</label>
                <input type="password" {...register("password", { required: true })} className="input" placeholder="Password" />

                <button className="btn btn-neutral mt-4" onClick={handleSubmit(onSubmit)}>Register</button>
            </fieldset>
        </div>
    );
};

export default SignUpPage;