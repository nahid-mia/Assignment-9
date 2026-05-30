'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const EditModal = ({ text, commentId }) => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const handleEdit = async (data) => {
        const editedAt = new Date().toLocaleString();
        const res = await fetch(`http://localhost:7000/comments/${commentId}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ ...data, editedAt })
        }
        );
        if (res.ok) {
            document.getElementById('my_modal_3').close();
            window.location.reload();
            toast.success('Comment Edited');
        }
    }

    return (
        <div>
            <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>Edit</button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div>
                        <textarea {...register("text")} defaultValue={text} className="textarea" placeholder={text} />
                        <div>
                            <button onClick={handleSubmit(handleEdit)} className='btn btn-ghost'>
                                Confirm Edit
                            </button>
                            <button className='btn btn-ghost' onClick={() => document.getElementById('my_modal_3').close()}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default EditModal;