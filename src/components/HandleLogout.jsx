'use client'
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import React from 'react';

const HandleLogout = () => {
    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    alert('User Logged out successfully');
                },
            },
        });
        window.location.reload();
        redirect('/login');
    }
    return (
        <button onClick={handleLogout} className="btn btn-neutral">Logout</button>
    );
};

export default HandleLogout;