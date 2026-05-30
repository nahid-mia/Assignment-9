'use client'
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const MyInteractionsPage = () => {

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const [ideas, setIdeas] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentedIdeas, setCommentedIdeas] = useState([]);

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

    useEffect(() => {
        if (!user?.id) return;
        const fetchIdeasFromComments = async () => {
            const elements = await Promise.all(
                comments.map(async ({ ideaId }) => {
                    const res = await fetch(`http://localhost:7000/ideas/${ideaId}`);
                    const data = await res.json();
                    return data[0];
                })
            );
            setCommentedIdeas(elements);
        }
        fetchIdeasFromComments();
    }, [comments, user?.id]);

    console.log(ideas, comments)

    return (
        <div className='w-10/12 bg-gray-200 my-10 mx-auto'>
            <ul className='w-11/12 mx-auto p-5 space-y-3'>
                <div className='bg-slate-500 flex flex-col p-4 gap-4'>
                    <h1 className='text-xl font-semibold'>
                        My Ideas
                    </h1>
                    {ideas.map(idea => {
                        return <li key={idea?._id} className='flex gap-2 items-center p-4 bg-base-200 rounded-r-4xl'>
                            {idea?.imageURL && (
                                <Image src={idea.imageURL} width={100} height={60} alt='idea image' />
                            )}
                            <div className='flex flex-col'>
                                <span>{idea?.ideaTitle}</span>
                                <span>{idea?.shortDescription}</span>
                            </div>
                        </li>
                    })}
                </div>
                <div className='bg-slate-500 flex flex-col p-4 gap-4'>
                    <h1 className='text-xl font-semibold'>
                        My Comments
                    </h1>
                    {comments.map(comment => {
                        const idea = commentedIdeas.find(i => i?._id === comment?.ideaId);
                        return (
                            <li key={comment._id} className='flex gap-2 items-center p-4 bg-base-200 rounded-r-4xl'>
                                {idea?.imageURL && (
                                    <Image src={idea.imageURL} width={100} height={60} alt='idea image' />
                                )}
                                <div className='flex flex-col'>
                                    <span>{idea?.ideaTitle}</span>
                                    <span>Commented: "{comment.text}"</span>
                                </div>
                            </li>
                        );
                    })}
                </div>
            </ul>
        </div>
    );
};

export default MyInteractionsPage;