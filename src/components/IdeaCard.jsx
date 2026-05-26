import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const IdeaCard = ({ idea }) => {
    const { _id, category, ideaTitle, targetAudience, imageURL, shortDescription } = idea;
    return (
        <div className="hover-3d">
            <div className="card bg-base-100 shadow-sm">
                <div className='w-full'>
                    <Image src={imageURL} alt='Image not available' width={400} height={250} className='object-cover w-full'></Image>
                </div>
                <div className="card-body items-center">
                    <h2 className="card-title">{ideaTitle}</h2>
                    <p>Category: {category}</p>
                    <p>{shortDescription}</p>
                    <p>{targetAudience}</p>
                    <div className="card-actions ">
                        <button className="btn btn-primary"><Link href={`/ideas/${_id}`}>See Details</Link></button>
                    </div>
                </div>
            </div>


            <div className="pointer-events-none"></div>
            <div className="pointer-events-none"></div>
            <div className="pointer-events-none"></div>
            <div className="pointer-events-none"></div>
            <div className="pointer-events-none"></div>
            <div className="pointer-events-none"></div>
            <div className="pointer-events-none"></div>
            <div className="pointer-events-none"></div>
        </div >
    );
};

export default IdeaCard;