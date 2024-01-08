import React from 'react';

const Single = (props) => {
    const prop_item = ["_id", "email", "publishedCourse", "joinedCourses", "createdAt", "updatedAt"];
    return (
        <div className="flex">
            <div className="flex-1">
                <div className="">
                    <div className="flex items-center gap-5 mt-10">
                        <img src="/user.jpg" alt="avatar" className='object-cover w-24 h-24 rounded-2xl'/>
                        <h1 className="text-3xl font-medium">{props.firstName} {props.lastName}</h1>
                    </div>
                    <div className="text-lg text-left">
                        {Object.entries(props).filter(([key]) => prop_item.includes(key)).
                        map(([key, value]) => (
                        <div className="my-7" key={key}>
                            <span className="font-bold mr-2.5 capitalize">{key}</span>
                            {typeof value === 'object' ? (
                                <span className="">
                                {/* Handle the object value (e.g., stringify or extract properties) */}
                                Course-ID: {value.courseId ? value.courseId : 'None'} - Completed Lessons: {value.completedLessons ? value.completedLessons : 'None'} {/*- ID: {value._id ? value._id : 'None'}*/}
                                </span>
                            ) : (
                                <span className="">{value}</span>
                            )}
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

