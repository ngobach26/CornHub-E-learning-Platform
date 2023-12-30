import React from 'react';

function Navbar() {
    return (
        <div className="flex items-center justify-between w-full p-5 bg-white">
            <div className='flex items-center font-bold gap-2.5'>    
                {/* add logo */}
                <img src="/CornHub.png" className="h-10"/>
                <span>ADMIN PANEL</span>
            </div>
            <div className='flex items-center gap-5'>
                <img src='/Search_Icon.svg' className='h-6'/>
                <div className='relative'>
                    <img src='/notification.svg' className='h-6'/>
                    <span className='absolute top-0 right-0 flex items-center justify-center w-3.5 h-3.5 text-xs text-white bg-red-500 rounded-full'>1</span>
                </div>
                <img src='/settings.svg'/>
                <div className="flex gap-2.5 items-center">
                    <img className='object-cover w-10 h-10 border-black rounded-full'
                        src="/3935309_user_admin_icon.svg"
                        alt=""
                    />
                    <span>Admin</span>
                </div>
            </div>
        </div>
    );
}

export default Navbar;