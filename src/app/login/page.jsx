'use client'
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';

const LoginPage = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const router = useRouter();

    const onSubmit = async (data) => {
        const user = data;
        const { data: res, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
        });


        if (data) {
            router.push('/');
            router.refresh();
        }

        if (error) {
            alert("Error");
        }
    }

    const GoogleLogin = async () => {
        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: '/',
        });

        if (error) {
            alert(error.message)
        }

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
                <button onClick={() => GoogleLogin()} className="btn btn-neutral">Login via <FaGoogle />- GOOGLE</button>
            </div>
            <div className="flex flex-col w-xs px-4">
                <div className="divider">OR</div>
                <Link href={'/signUp'}><button className="btn btn-neutral w-full">Sign Up</button></Link>
            </div>
        </div>
    );
};

export default LoginPage;