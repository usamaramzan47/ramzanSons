import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups, createGroup, deleteGroup, updateGroup } from '../../features/shopGroups/shopGroupSlice';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useNetworkStatus from '../../hooks/useNetworkStatus';

function Pricing() {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenDel, setIsOpenDel] = useState(false);
    const [editGroup, setEditGroup] = useState(null);
    const [delError, setDelError] = useState('');
    const [delGroup, setDelGroup] = useState(null);
    const [newGroup, setNewGroup] = useState({
        group_name: '',
        description: 'no description'
    });
    const shopGroupData = useSelector((state) => state.shopGroup.shopGroupsData);
    const shopGroupError = useSelector((state) => state.shopGroup.error);
    const shopGroupStatus = useSelector((state) => state.shopGroup.status);

    const modalRef = useRef(null); // Reference to the modal container
    const isOnline = useNetworkStatus();

    useEffect(() => {
        if (isOnline)
            dispatch(fetchGroups());

    }, [dispatch]);

    // handle focus on input fileds of pop_up
    useEffect(() => {
        if (isOpen && modalRef.current) {
            const focusableElements = modalRef.current.querySelectorAll('input, button');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            const trapFocus = (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus(); // Move focus to the last element
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus(); // Move focus to the first element
                    }
                }
            };

            document.addEventListener('keydown', trapFocus);

            // Focus the first element when modal opens
            firstElement.focus();

            return () => {
                document.removeEventListener('keydown', trapFocus);
            };
        }
    }, [isOpen]);


    if (shopGroupStatus === 'loading') {
        return (
            <div className="">Loading Groups...</div>
        );
    }

    // handle input values
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewGroup((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // hanlde submit logic for create new group
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newGroup.group_name.trim()) {
            try {
                if (shopGroupData?.some(item => item.group_name.toLowerCase() === newGroup.group_name.toLowerCase())) // return true if match
                    return toast.error('name already exist!');
                else {
                    if (editGroup === null) { // case when create box open
                        const res = dispatch(createGroup({ newGroup }));
                        if (res?.arg.newGroup === newGroup)
                            toast.success("successful created!")
                    } else { // case when edit Box open
                        const res = dispatch(updateGroup({ groupId: editGroup, UpdateGroupData: newGroup }));
                        if (res?.arg.UpdateGroupData === newGroup)
                            toast.success("successful Updated!")

                        setEditGroup(null)
                    }
                }
            } catch (error) {
                toast.error("error occered!", error)
            }

            setNewGroup({
                group_name: '',
                description: 'no description'
            }); // Reset after submission
            setIsOpen(false);
        } else {
            alert('Group name cannot be empty');
        }
    };

    const handleDel_popUp = () => {
        //open same dialog box
        setIsOpen(!isOpen)
        setIsOpenDel(!isOpenDel)
        newGroup.group_name = ''

    }
    const handleDelete = async (e) => {
        e.preventDefault();
        if (newGroup.group_name === (delGroup == null ? '' : delGroup.group_name)) {
            // Dispatch the delete action
            const result = await dispatch(deleteGroup(delGroup.group_id));
            setDelError('')
            setIsOpen(!isOpen)
            setIsOpenDel(!isOpenDel)
            newGroup.group_name = ''
            setDelGroup(null)
            if (!result.error)
                toast.success('Successful Delete!')
            else
                toast.warning(result.payload)

        } else {
            setDelError("Name Does Not Match");

        }
    };

    return (
        <>
            {/* pop up */}
            {
                isOpen && (
                    <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex justify-center z-10">
                        <form
                            ref={modalRef}
                            onSubmit={isOpenDel ? handleDelete : handleSubmit}
                            className="bg-white dark:bg-[#1E293B] dark:text-white p-6 rounded shadow-lg w-96 h-max sticky top-20"
                        >
                            <h2 className="text-lg font-bold mb-4">{isOpenDel ? 'Confirm Delete' : editGroup === null ? 'New Group' : 'Edit Group'}</h2>
                            {isOpenDel && <p className="mb-4 text-sm">To confirm deletion of the Group <strong className='text-red-500'>{delGroup?.group_name}</strong>, please enter the Group name below:</p>}
                            <input
                                className="border p-2 w-full mb-4 dark:bg-[#1E293B]"
                                placeholder="Enter group name"
                                value={newGroup.group_name}
                                required
                                name='group_name'
                                onChange={handleChange}
                            />
                            {delError && <p className="text-red-500 mb-4">{delError}</p>}
                            {!isOpenDel && <input
                                className="border p-2 w-full mb-4 dark:bg-[#1E293B]"
                                placeholder="Enter group description"
                                value={newGroup.description}
                                required
                                name='description'
                                onChange={handleChange}
                            />}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                                    onClick={() => { setIsOpen(false); setIsOpenDel(false); setEditGroup(null) }}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className={`bg-${isOpenDel ? 'red' : 'blue'}-500 text-white px-4 py-2 rounded`}>
                                    {isOpenDel ? 'Delete' : editGroup === null ? 'Create' : 'Update'}
                                </button>
                            </div>
                        </form >
                    </div >
                )
            }
            <div className="p-4 flex flex-col h-screen">
                {shopGroupError && <p className='text-red-500'>{shopGroupError}</p>}
                <div className="btn_wrap float-end">
                    <button
                        type="button"
                        onClick={() => { setIsOpen(!isOpen); setNewGroup({ group_name: '', description: 'no description' }) }}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            Create New Group
                        </span>
                    </button>
                </div>
                <div className="wrapp flex gap-4 flex-wrap">
                    {Array.isArray(shopGroupData) && shopGroupData?.map((item, index) => (
                        <div key={index} className="w-[18rem] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">
                            <svg
                                className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="currentColor"
                            >
                                <path d="M600-320h120q17 0 28.5-11.5T760-360v-240q0-17-11.5-28.5T720-640H600q-17 0-28.5 11.5T560-600v240q0 17 11.5 28.5T600-320Zm40-80v-160h40v160h-40Zm-280 80h120q17 0 28.5-11.5T520-360v-240q0-17-11.5-28.5T480-640H360q-17 0-28.5 11.5T320-600v240q0 17 11.5 28.5T360-320Zm40-80v-160h40v160h-40Zm-200 80h80v-320h-80v320ZM80-160v-640h800v640H80Zm80-560v480-480Zm0 480h640v-480H160v480Z" />
                            </svg>

                            <Link to="/priceDetail" state={{ item }}>
                                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-1">{item.group_name}</h5>
                            </Link>
                            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400 line-clamp-2">
                                {item.description}
                            </p>
                            <div className="wrap flex justify-between items-center">
                                <div
                                    onClick={() => {
                                        setIsOpen(!isOpen);
                                        setNewGroup({ group_name: item.group_name, description: item.description });
                                        setEditGroup(item.group_id)
                                    }}
                                    className="cursor-pointer inline-flex font-medium items-center dark:text-slate-300 text-blue-600 hover:underline group">
                                    Edit pricing
                                    <svg
                                        className="w-3 h-3 ms-2.5 rtl:rotate-[270deg] transition-all duration-200 group-hover:scale-150"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 18 18"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                                        />
                                    </svg>
                                </div>
                                {/* del icon  */}
                                <svg onClick={() => { setDelGroup(item); handleDel_popUp() }} className='cursor-pointer hover:scale-125 transition-transform duration-100' name='ic_delete' xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#EA3323"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                            </div>
                        </div>
                    ))}
                </div>

            </div >

        </>
    );
}

export default Pricing;
