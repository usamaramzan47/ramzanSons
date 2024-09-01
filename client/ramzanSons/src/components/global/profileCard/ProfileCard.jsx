import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';

function ProfileCard() {

    const { currentUser } = useContext(AuthContext);

    return (
        <div className='border-2 p-3 flex flex-col gap-2 rounded-md shadow-md shadow-zinc-200'>
            <div className="user flex items-center gap-3 py-2">
                <img src={currentUser.photoURL} alt="userImg" className='w-8 h-8 rounded-full object-cover' />
                <div className="name flex flex-col text-sm">
                    <span className='font-semibold'>{currentUser.displayName}</span>
                    <span>Software Engineer</span>
                </div>
            </div>
            <hr />
            <div className="item flex flex-col gap-3 text-14 font-semibold">
                <span className='text-[#878787]  font-bold text-14'>Account Details</span>
                <div className="flex gap-2">
                    <img src="/icons/person.svg" alt="usericon" className='w-4' />
                    <span className='font-normal'>{currentUser.email}</span>
                </div>
                <div className="flex gap-2">
                    <img src="/icons/calendar.svg" alt="usericon" className='w-4' />
                    <span className='font-normal'>04.07.2001</span>
                </div>
            </div>

            <div className="item flex flex-col gap-3 text-14 font-semibold">
                <span className='text-[#878787]  font-bold text-14'>Contact Details</span>
                <div className="flex gap-2">
                    <img src="/icons/smartPhone.svg" alt="usericon" className='w-4' />
                    <span className='font-normal'>+1 123 456 67</span>
                </div>
                <div className="flex gap-2">
                    <img src="/icons/mail.svg" alt="usericon" className='w-4' />
                    <span className='font-normal'>{currentUser.email}</span>
                </div>
                <div className="flex gap-2">
                    <img src="/icons/location.svg" alt="usericon" className='w-4' />
                    <span className='font-normal'>Lahore | Pakistan</span>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard
