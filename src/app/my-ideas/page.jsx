import IdeaCard from '@/components/IdeaCard';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const MyIdeas = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user;

    const res = await fetch(`http://localhost:7000/myIdeas/${user?.id}`);
    const ideas = await res.json();
    console.log(ideas)

    return (
        <div className='flex flex-col items-center my-20 gap-10 w-10/12 mx-auto'>
            <h1 className='text-2xl font-bold'>My Ideas</h1>
            <div>
                {ideas?.length === 0 ?
                    (
                        <>
                            <div className='p-20 w-full bg-base-200 text-center text-2xl'>
                                <h1>No idea Found</h1>
                            </div>
                        </>
                    )
                    :
                    (
                        <>
                            <div className='grid gap-8 w-11/12 mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                                {
                                    ideas.map(idea => {
                                        return <IdeaCard key={idea?._id} idea={idea}></IdeaCard>
                                    })
                                }
                            </div>
                        </>
                    )}
            </div>
        </div>
    );
};

export default MyIdeas;