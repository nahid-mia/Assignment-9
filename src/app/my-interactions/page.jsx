'use client'
import { authClient } from '@/lib/auth-client';
import React, { useEffect, useState } from 'react';

const MyInteractionsPage = () => {

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const [ideas, setIdeas] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (!user?.id) return;
        const fetchInteraction = async () => {
            const res = await fetch(`http://localhost:7000/myIdeas/author/${user?.id}`);
            const res2 = await fetch(`http://localhost:7000/comments/author/${user?.id}`);
            const data = await res.json();
            const data2 = await res2.json();
            setIdeas(data);
            setComments(data2);
        }
        fetchInteraction();
    }, [user?.id])

    console.log(ideas, comments)

    return (
        <div className='w-10/12 bg-gray-200 my-10 mx-auto'>
            <ul className='w-11/12 mx-auto p-5 space-y-3'>
                {ideas.map(idea => {
                    return <li key={idea?._id} className='flex  justify-between p-4 bg-base-200 rounded-r-4xl'>{idea?.ideaTitle}</li>
                })}
                {comments.map(comment => {
                    return <li key={comment?._id} className='flex  justify-between p-4 bg-base-200 rounded-r-4xl'>{comment?.text}</li>
                })}
            </ul>
        </div>
    );
};

export default MyInteractionsPage;