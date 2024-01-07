import { useState , useEffect } from "react";
import DataTable from "../../../components/Admin/DataTable";
import Add from "../../../components/Admin/Add";
import api from "../../../services/adminAPI";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Link } from "react-router-dom";

const columns = [
  { 
    field: "_id", 
    headerName: "ID", 
    width: 50,
  },
  {
    field: "courseTitle",
    type: "string",
    headerName: "Course Title",
    width: 120,
  },
  {
    field: "category",
    headerName: "Category",
    type: "string",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 80,
    type: "string",
    enum: ['waiting_ac','published','banned','waiting_del','updated']
  },
  {
    field: "updatedAt",
    headerName: "Updated Date",
    width: 200,
    type: "string",
  },
  {
    field: "language",
    headerName: "Language",
    width: 80,
    type: "string",
    enum: ['Beginner', 'Intermediate', 'Expert', 'All Levels'],
  },
  {
    field: "totalRating",
    headerName: "Total Rating",
    width: 100,
    type: "number",
    default: 0
  },
  {
    field: "price",
    type: "number",
    headerName: "Price",
    width: 100,
  }
];

const AdminCourses = () => {
  const { user } = useAuthContext();
  const [ coursesList, setCoursesList ] = useState([]);

  console.log(user);

  useEffect(() => {
    const fetchCourseList = async () => {
      try{
        const courses = await api.listCourses(user.token);
        setCoursesList(courses);
      }
      catch(err){
        console.log(err);
      }
    };
    fetchCourseList();
  }, [user.token]);

  const handleDelete = async (courseId) => {
    try{
      await api.deleteCourse(user.token, courseId);
      console.log("Course is deleted successfully!");

      // Reload the courses list whenever a deletion operation is executed.
      const updatedCourses = await api.listCourses(user.token);
      setCoursesList(updatedCourses);
    }
    catch(err){
      console.log(err);
    }
  };

  const handleApprove = async (courseId) => {
    try {
      await api.acceptCourse(user.token, courseId);
      console.log("Course is successfully approved!");
      
      // Reload the courses list whenever a deletion operation is executed.
      const updatedCourses = await api.listCourses(user.token);
      setCoursesList(updatedCourses);
    }
    catch(err){
      console.log(err);
    }
  };

  const handleBan = async (courseId) => {
    try {
      await api.denyCourse(user.token, courseId);
      console.log("Course is banned!");

      // Reload the courses list whenever a deletion operation is executed.
      const updatedCourses = await api.listCourses(user.token);
      setCoursesList(updatedCourses);
    }
    catch(err){
      console.log(err);
    }
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="flex gap-4">
          <Link to={`/course/${params.row._id}`} target="_blank">
            <img src="/view.svg" className="w-5 h-5 cursor-pointer" />
          </Link>
          <div className="">
          </div>
          {params.row.status === 'waiting_del' && (
            <div>
              <button onClick={() => handleApprove(params.row._id)}>
                <img src="/accept.png" className="object-cover w-5 h-5 m-1" />
              </button>
              <button onClick={() => handleDelete(params.row._id)}>
                <img src="/delete.svg" className="object-cover w-5 h-5 m-1" />
              </button>
            </div>
          )}
          {(params.row.status === 'waiting_ac' || params.row.status === 'updated') 
          && (
            <div>
              <button onClick={() => handleApprove(params.row._id)}>
                <img src="/accept.png" className="object-cover w-5 h-5 m-1" />
              </button>
              <button onClick={() => handleBan(params.row._id)}>
                <img src="/reject.png" className="object-cover w-5 h-5 m-1" />
              </button>
            </div>
          )}
          {(params.row.status === 'banned') && (
            <div>
              <button onClick={() => handleApprove(params.row._id)}>
                <img src="/accept.png" className="object-cover w-5 h-5 m-1" />
              </button>
            </div>           
          )}
        </div>
      );
    },
  };

  return (
    <div className="">
      <div className="">
        <div className="my-10 ml-10 font-mono text-3xl ">Courses Management</div>
      </div>
      <DataTable slug="courses" columns={[...columns, actionColumn]} rows={coursesList} />
    
    </div>
  );
};

export default AdminCourses;