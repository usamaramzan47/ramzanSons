import { useLocation } from 'react-router-dom';


function ShopDetails() {

    const location = useLocation();
    const { item } = location.state || {};

    return (
        <div className="p-2 ">
            <div className='border-2 p-3 flex flex-col gap-2 rounded-md shadow-md shadow-zinc-200 dark:text-white'>
                <div className="user flex items-center gap-3 py-2">
                    <img src={item?.img} alt="userImg" className='w-8 h-8 rounded-full object-cover' />
                    <div className="name flex flex-col text-sm">
                        <span className='font-semibold'>{item?.shop_name}</span>
                        <span>{item?.shop_id}</span>
                    </div>
                </div>
                <hr />
                <div className="wrapper flex justify-between gap-10">
                    <div className="item? flex flex-col gap-3 text-14 font-semibold">
                        <span className='text-[#878787]  font-bold text-14'>Contact Details</span>
                        <div className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" /></svg>
                            <span className='font-normal'>{item?.shop_num}</span>
                        </div>
                        <div className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
                            <span className='font-normal'>email</span>
                        </div>
                        <div className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" /></svg>
                            <span className='font-normal'>{item?.shop_address}</span>
                        </div>
                        <span className='text-[#878787]  font-bold text-14'>Group Detail</span>
                        <div className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M360-320q33 0 56.5-23.5T440-400q0-33-23.5-56.5T360-480q-33 0-56.5 23.5T280-400q0 33 23.5 56.5T360-320Zm240 0q33 0 56.5-23.5T680-400q0-33-23.5-56.5T600-480q-33 0-56.5 23.5T520-400q0 33 23.5 56.5T600-320ZM480-520q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520Zm0 440q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                            <span className='font-normal'>{item?.group_id}</span>
                        </div>
                        <div className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M360-320q33 0 56.5-23.5T440-400q0-33-23.5-56.5T360-480q-33 0-56.5 23.5T280-400q0 33 23.5 56.5T360-320Zm240 0q33 0 56.5-23.5T680-400q0-33-23.5-56.5T600-480q-33 0-56.5 23.5T520-400q0 33 23.5 56.5T600-320ZM480-520q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520Zm0 440q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                            <span className='font-normal'>{item?.group_name}</span>
                        </div>
                        <span className='text-[#878787]  font-bold text-14'>Register Date</span>
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="20px" fill="#5f6368"><path d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" /></svg>
                            <span className='font-semibold text-12 text-black/70 dark:text-white'>{item?.createdat}</span>
                        </div>
                    </div>
                    <div className="right flex flex-col gap-4 flex-1 border-l-4 border-blue-100 px-2">
                        <label className='text-[#878787]  font-bold text-14'>Description</label>
                        <p className='text-black/70 dark:text-white/80 text-sm'>{item?.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopDetails
