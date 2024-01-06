import React from 'react';

const Single = (props) => {
    return (
        <div className="flex">
            <div className="flex-1">
                <div className="">
                    <div className="flex items-center gap-5 mt-10">
                        <img src="/user.jpg" alt="avatar" className='object-cover w-24 h-24 rounded-2xl'/>
                        <h1 className="text-3xl font-medium">{props.title}</h1>
                        <button className='px-1 py-1 text-2xl bg-red-500 rounded-lg'>Update</button>
                    </div>
                    <div className="text-lg">
                        {Object.entries(props.info).map((item) => (
                        <div className="my-7" key={item[0]}>
                            <span className="font-bold mr-2.5 capitalize">{item[0]}</span>
                            <span className="">{item[1]}</span>
                        </div>
                        ))}
                    </div>
                </div>
                <hr className="w-11/12 h-0 mx-0 my-5 border border-gray-700 border-solid" />
            </div>
        </div>
    );
};

export default Single;

