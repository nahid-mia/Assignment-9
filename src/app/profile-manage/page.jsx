'use client'
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

const ProfileManage = () => {

    const router = useRouter();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { data: session, isPending } = authClient.useSession();

    const user = session?.user;
    console.log(user)

    const onSubmit = async (data) => {
        const res = await fetch(`http://localhost:7000/user/${user?.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const result = await res.json();
        router.push('/');
        router.refresh();
    }

    return (
        <div className='my-20 flex mx-auto justify-center'>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Update User</legend>

                <label className="label">Name</label>
                <input type="text" defaultValue={user?.name} {...register("name")} className="input" placeholder={user?.name} />

                <label className="label">Image URL</label>
                <input type="url" defaultValue={user?.image} {...register("image")} className="input" placeholder={user?.image} />

                <button className="btn btn-neutral mt-4" onClick={handleSubmit(onSubmit)} disabled={isPending} >Update</button>
            </fieldset>
        </div>
    );
};

export default ProfileManage;