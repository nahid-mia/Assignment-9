'use client'
import { authClient } from '@/lib/auth-client';
import { redirect, useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const HandleLogout = () => {

    const router = useRouter();
    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success('User Logged out successfully');
                },
            },
        });
        router.refresh();
        redirect('/login');
    }
    return (
        <button onClick={handleLogout} className="btn btn-neutral">Logout</button>
    );
};

export default HandleLogout;