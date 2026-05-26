'use client'
import IdeaCard from '@/components/IdeaCard';
import React, { useEffect, useState } from 'react';

const AllIdeas = () => {

    const [ideas, setIdeas] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(null);
    const [searchInput, setSearchInput] = useState("");

    const handleSearch = () => {
        setSearchInput(search);
    };

    useEffect(() => {
        const params = new URLSearchParams();
        if (searchInput) params.append("search", searchInput);
        if (category) params.append("category", category);
        if (dateFrom) params.append("dateFrom", dateFrom);
        if (dateTo) params.append("dateTo", dateTo);
        const result = async () => {
            setLoading(true)
            const res = await fetch(`http://localhost:7000/ideas?${params}`);
            const data = await res.json();
            setIdeas(data);
            setLoading(false);
        }
        result();
    }, [searchInput, category, dateFrom, dateTo]);

    useEffect(() => {
        const categoryFetch = async () => {
            const res = await fetch('http://localhost:7000/ideas');
            const ideaCategories = await res.json();
            setCategories(ideaCategories);
        }
        categoryFetch();
    }, [setCategories])

    if (loading) {
        return <span className="loading loading-dots loading-lg"></span>
    }

    return (
        <div className='w-10/12 mx-auto flex flex-col gap-10 my-10'>
            <div className='menu menu-horizontal px-1 gap-3 grid grid-cols-1 sm:grid-cols-2 mx-auto'>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        className="input"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button className="btn btn-primary" onClick={handleSearch}>
                        Search
                    </button>
                </div>
                <li>
                    <details>
                        <summary>Category</summary>
                        <ul className="p-2 bg-base-100 w-40 z-1">
                            <li><button className='btn btn-ghost' onClick={() => setCategory("")}>All</button></li>
                            {categories.map(cat => {
                                return <li key={cat?._id} onClick={() => setCategory(cat?.category)}><button className='btn btn-ghost'>{cat?.category}</button></li>
                            })}
                        </ul>
                    </details>
                </li>
                <div className='flex flex-col'>
                    <input
                        type="date"
                        className="input"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                    />
                    <a className=''>Date From</a>
                </div>

                <div>
                    <input
                        type="date"
                        className="input"
                        value={dateTo}
                        placeholder='Date to'
                        onChange={(e) => setDateTo(e.target.value)}
                    />
                    <a className=''>Date to</a>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setSearch("");
                        setCategory("");
                        setDateFrom("");
                        setDateTo("");
                        setSearchInput("");
                    }}
                >
                    Clear Filters
                </button>
            </div>
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

export default AllIdeas;