import Image from 'next/image';
import React from 'react';

const DetailsPage = async ({ params }) => {

    const { id } = await params;
    const res = await fetch(`http://localhost:7000/ideas/${id}`);
    const data = await res.json();
    const idea = data[0];
    const { category, detailedDescription, estimatedBudget, ideaTitle, imageURL, problemStatement, proposedSolution, tags, targetAudience } = idea;
    return (
        <div className='w-10/12 mx-auto my-20'>
            <div className="hero bg-base-200 min-h-screen rounded-3xl">
                <div className="hero-content flex-col gap-20 lg:flex-row-reverse">
                    <Image src={imageURL} alt={ideaTitle} width={400} height={250}></Image>
                    <div>
                        <h1 className="text-5xl font-bold">{ideaTitle}</h1>
                        <p>{category}</p>
                        <p className="py-6">
                            {detailedDescription}
                        </p>
                        <p>Problem: {problemStatement}</p>
                        <p>Solution: {proposedSolution}</p>
                        <ul className='flex gap-2'>
                            <li>Tags:</li>
                            {tags.map((tag, index) => {
                                return <li key={index}>{tag}</li>
                            })}
                        </ul>
                        <div className='flex flex-col gap-2 mt-2 items-center'>
                            <p>{targetAudience}</p>
                            <p>Budget: {estimatedBudget}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;