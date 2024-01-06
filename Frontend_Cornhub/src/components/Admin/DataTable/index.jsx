import { DataGrid, GridToolbar} from "@mui/x-data-grid";
import { Link } from "react-router-dom"; 

const DataTable = (props) => {
    const actionColumn = {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => {
          return (
            <div className="flex gap-4">
              <Link to={`/${props.slug}/${params.row.id}`}>
                <img src="/view.svg" className="w-5 h-5 cursor-pointer" />
              </Link>
              <div className="">
                <img src="/delete.svg" className="object-cover w-8 h-8 rounded-3xl" />
              </div>
            </div>
          );
        },
    };

    return (
        <div className="">
          <DataGrid 
            getRowId={(row) => row._id}
            className="p-5 bg-white"
            rows={props.rows}
            columns={[...props.columns, actionColumn]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            disableColumnFilter
            disableDensitySelector
            disableColumnSelector
          />
        </div>
    );
};

export default DataTable;
