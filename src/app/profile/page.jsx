import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';

const MyProfile = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user;
    return (
        <div className='w-6/12 my-20 mx-auto items-center p-20 flex flex-col bg-base-200 rounded-3xl shadow-2xl lg:flex-row gap-10'>
            <div className='w-11/12'>
                <Image src={user?.image} alt='Image not available' width={400} height={250} className='object-cover rounded-full w-full'></Image>
            </div>
            <div className='flex flex-col gap-5'>
                <h2>{user?.name}</h2>
                <p>{user?.email}</p>
            </div>
        </div>
    );
};

export default MyProfile;