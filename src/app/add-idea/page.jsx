'use client'
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

const AddIdea = () => {

    const { data: session, isPending } = authClient.useSession();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const router = useRouter();
    const user = session?.user;
    console.log(user?.id)

    const onSubmit = async (data) => {
        console.log('Btn Clicked')
        try {
            const res = await fetch('http://localhost:7000/ideas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
                }),
            });

            const res2 = await fetch(`http://localhost:7000/myIdeas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
                    authorId: user?.id,
                }),
            });

            const result = await res.json();
            console.log(result);
            router.push('/');

        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className='flex justify-center my-20'>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <label className="label">Idea Title</label>
                <input type="text" {...register("ideaTitle", { required: true })} className="input" placeholder="Idea Title" />

                <label className="label">Short Description</label>
                <input type="text" {...register("shortDescription", { required: true })} className="input" placeholder="A one liner" />

                <label className="label">Detailed Description</label>
                <textarea {...register("detailedDescription", { required: true })} className="textarea" placeholder="Full Description" />

                <label className="label">Category</label>
                <select {...register("category", { required: true })} className="select">
                    <option value="">Select a category</option>
                    <option value="tech">Tech</option>
                    <option value="health">Health</option>
                    <option value="ai">AI</option>
                    <option value="education">Education</option>
                    <option value="finance">Finance</option>
                    <option value="environment">Environment</option>
                    <option value="social">Social</option>
                    <option value="other">Other</option>
                </select>

                <label className="label">Tags <span className="text-gray-400 text-sm">(optional, comma separated)</span></label>
                <input type="text" {...register("tags")} className="input" placeholder="e.g. startup, mobile, saas" />

                <label className="label">Image URL <span className="text-gray-400 text-sm">(optional)</span></label>
                <input type="url" {...register("imageURL")} className="input" placeholder="https://example.com/image.png" />

                <label className="label">Estimated Budget <span className="text-gray-400 text-sm">(optional)</span></label>
                <input type="number" {...register("estimatedBudget")} className="input" placeholder="e.g. 5000" />

                <label className="label">Target Audience</label>
                <input type="text" {...register("targetAudience", { required: true })} className="input" placeholder="e.g. College students, Small businesses" />

                <label className="label">Problem Statement</label>
                <textarea {...register("problemStatement", { required: true })} className="textarea" placeholder="What problem does this idea solve?" />

                <label className="label">Proposed Solution</label>
                <textarea {...register("proposedSolution", { required: true })} className="textarea" placeholder="How does your idea solve the problem?" />
                <button onClick={handleSubmit(onSubmit)} className="btn btn-neutral mt-4">Add Idea</button>
            </fieldset>
        </div>
    );
};

export default AddIdea;