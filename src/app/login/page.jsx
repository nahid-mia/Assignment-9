'use client'
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';

const LoginPage = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
    }

    return (
        <div className='flex flex-col justify-center items-center  my-30'>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Login</legend>

                <label className="label">Email</label>
                <input type="email" {...register("email", { required: true })} className="input" placeholder="Email" />

                <label className="label">Password</label>
                <input type="password" {...register("password", { required: true })} className="input" placeholder="Password" />
                <a className='text-red-500 hover:cursor-pointer'>Forgot Password?</a>

                <button className="btn btn-neutral mt-4" onClick={handleSubmit(onSubmit)}>Login</button>
            </fieldset>
            <div className="flex flex-col w-xs px-4">
                <div className="divider">OR</div>
                <button className="btn btn-neutral">Login via <FaGoogle />- GOOGLE</button>
            </div>
            <div className="flex flex-col w-xs px-4">
                <div className="divider">OR</div>
                <Link href={'/signUp'}><button className="btn btn-neutral w-full">Sign Up</button></Link>
            </div>
        </div>
    );
};

export default LoginPage;