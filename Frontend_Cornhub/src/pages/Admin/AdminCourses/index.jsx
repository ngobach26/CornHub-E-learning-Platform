import { useState , useEffect } from "react";
import DataTable from "../../../components/Admin/DataTable";
import Add from "../../../components/Admin/Add";
import api from "../../../services/adminAPI";
import { useAuthContext } from "../../../hooks/useAuthContext";

const columns = [
  { 
    field: "_id", 
    headerName: "ID", 
    width: 50,
  },
  {
    field: "title",
    type: "string",
    headerName: "Course Title",
    width: 100,
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
    width: 100,
    type: "string",
    enum: ['waiting_ac','published','banned','waiting_del','updated']
  },
  {
    field: "language",
    headerName: "Language",
    width: 80,
    type: "string",
  },
  {
    field: "level",
    headerName: "Level",
    width: 100,
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
  },
];

const AdminCourses = () => {
  const [ open, setOpen ] = useState(false);
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

  return (
    <div className="">
      <div className="">
        <div className="mt-10 ml-10 font-mono text-3xl ">Courses Management</div>
        <button className="p-2 mx-10 my-5 bg-red-500 rounded-lg cursor-pointer " onClick={() => setOpen(true)}>ADD COURSE</button>
      </div>
      <DataTable slug="courses" columns={columns} rows={coursesList} />
      
      {open && <Add slug="courses" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default AdminCourses;