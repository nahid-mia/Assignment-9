import React from 'react';
import toast from 'react-hot-toast';

const DeleteModal = ({ commentId }) => {

    const handleDelete = async () => {
        const res = await fetch(`http://localhost:7000/comments/${commentId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (res.ok) {
            document.getElementById('my_modal_4').close();
            window.location.reload();
            toast.error('comment Deleted')
        };
    }

    return (
        <div>
            <button className="btn" onClick={() => document.getElementById('my_modal_4').showModal()}>Delete</button>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div>
                        <div>
                            <p>You will be deleting this comment permanently, Are you Sure?</p>
                            <button onClick={handleDelete} className='btn btn-ghost'>
                                Confirm Delete
                            </button>
                            <button className='btn btn-ghost' onClick={() => document.getElementById('my_modal_4').close()}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default DeleteModal;