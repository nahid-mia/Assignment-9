import React from 'react';
import IdeaCard from './IdeaCard';

const FeaturedSection = async () => {

    const res = await fetch('http://localhost:7000/ideas/featured');
    const ideas = await res.json();

    return (
        <div className='flex flex-col items-center my-20 w-10/12 mx-auto'>
            <div><h1 className='text-2xl font-bold mb-5'>Featured Startups</h1></div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
                {ideas.map(idea => {
                    return <IdeaCard key={idea?._id} idea={idea}></IdeaCard>
                })}
            </div>
        </div>
    );
};

export default FeaturedSection;