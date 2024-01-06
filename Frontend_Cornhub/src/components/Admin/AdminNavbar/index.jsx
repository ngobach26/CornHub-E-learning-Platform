import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AdminNavbar() {
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const num_notifications = 3; // Toggle number of notifications to show at the bell icon.
    
    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
    };
      
    return (
        <div className="flex items-center justify-between w-full p-5 bg-white">
            <div className='flex items-center font-bold gap-2.5'>    
                {/* add logo */}
                <Link to="/">
                    <img src="/public/CornHub.png" className="h-10"/>
                </Link>
                <span className="text-black">ADMIN PANEL</span>
            </div>
            <div className='flex items-center gap-5'>
                {isSearchVisible ? (
                    <div>
                        <input type="text" placeholder="Search..." className='text-black border-none' />
                    </div>
                ) : (
                    <button onClick={toggleSearch}>
                        <img src='/Search_Icon.svg' className='h-10 p-1 bg-white rounded-full'/>
                    </button>
                )}
                
                <div className='relative'>
                    <img src='/notification.svg' className='h-8'/>
                    {num_notifications ? (
                        <div>
                            <span className='absolute top-0 right-0 flex items-center justify-center w-3.5 h-3.5 text-xs text-white bg-red-500 rounded-full'>{num_notifications}</span>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
                <div className="flex gap-2.5 items-center">
                    <img className='object-cover h-8 border-black rounded-full'
                        src="/3935309_user_admin_icon.svg"
                        alt=""
                    />
                    <span>Admin</span>
                </div>
            </div>
        </div>
    );
}

export default AdminNavbar;