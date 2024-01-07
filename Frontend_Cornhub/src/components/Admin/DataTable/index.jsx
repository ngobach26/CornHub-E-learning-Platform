import { DataGrid, GridToolbar} from "@mui/x-data-grid";
import { Link } from "react-router-dom"; 

const DataTable = (props) => {
    return (
        <div className="">
          <DataGrid 
            getRowId={(row) => row._id}
            className="p-5 bg-white"
            rows={props.rows}
            columns={[...props.columns]}
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
            disableRowSelectionOnClick
            disableColumnFilter
            disableDensitySelector
            disableColumnSelector
          />
        </div>
    );
};

export default DataTable;
