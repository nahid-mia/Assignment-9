'use client';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const CommentSection = ({ id }) => {

    const ideaId = id;
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const authorId = user?.id;
    const authorName = user?.name || 'Anonymous User';
    const [comments, setComments] = useState([]);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const router = useRouter();

    const handleAdd = async (data) => {
        const createdAt = new Date().toLocaleString();
        const res = await fetch('http://localhost:7000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...data,
                ideaId,
                authorId,
                authorName,
                createdAt
            })
        });
        if (res.ok) {
            window.location.reload();
        }
    }
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`http://localhost:7000/comments/${ideaId}`);
                const data = await res.json();
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchComments();
    }, [ideaId]);

    return (
        <div className='w-10/12 bg-gray-200 my-10 mx-auto'>

            <div className='flex flex-col gap-3 p-5'>
                <button className='btn btn-primary w-fit' onClick={handleSubmit(handleAdd)}>Add Comment?</button>
                <textarea {...register("text")} className="textarea" placeholder="Write what you Think!" />
            </div>

            <ul className='w-11/12 mx-auto p-5 space-y-3'>
                {comments.map(comment =>
                (<div key={comment._id}>
                    {comment.authorId === authorId ?
                        (<li className='flex  justify-between p-4 bg-base-200 rounded-r-4xl'>
                            <div className='flex gap-3 flex-col'>
                                <div className='flex gap-2'>
                                    <h4>{comment.authorName}</h4>
                                    <a>{comment.createdAt}</a>
                                </div>
                                <p>{comment.text}</p>
                            </div>
                            <div className='flex gap-2'>
                                <button className='btn btn-ghost'>
                                    Edit
                                </button>
                                <button className='btn btn-ghost'>
                                    Delete
                                </button>
                            </div>
                        </li>)
                        :
                        (<li className='flex flex-col gap-3 p-4 bg-base-200 rounded-r-4xl'>
                            <div className='flex gap-2'>
                                <h4>{comment.authorName}</h4>
                                <a>{comment.createdAt}</a>
                            </div>
                            <p>{comment.text}</p>
                        </li>)}
                </div>)
                )}
            </ul>
        </div>
    );
};

export default CommentSection;