import { useQuery } from "react-query";
import {fetchBookStore} from "./BookAPI"
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {v4 as uuidv4} from "uuid";

function BookStoreQueryClient() {
    // using the useQuery hook - 'todos3' is a unique key used to identify the query
    // useQuery returns an object with isLoading, error and data properties
    const { isLoading, error, data } = useQuery("todos3", fetchBookStore);
    //defining all the columns of the data grid.
    const columns: GridColDef[] = [
        {field: "bookStoreId", headerName: "bookStoreId", width: 100},
        {field: "storeName", headerName: "storeName", width: 100},
        {field: "address", headerName: "address", width: 100},
        {field: "managerName", headerName: "managerName", width: 100},
    ];
    // if isLoading is true, then data still being fetched
    if (isLoading) return <p>Loading...</p>;
    return (
        <>
            <DataGrid
                //dataGrid used to display the data.
                rows={data}
                columns={columns}
                // option if you don't want to highlight selected row
                disableRowSelectionOnClick={true}
                //all rows must have unique id defined using getRowId. We had to use the uuidv4 library to generate the key because our Queries only contain the JSON of the data and doesn't contain any _links for some reason.
                getRowId={(row) => uuidv4()}
            />
        </>
    );
}

export default BookStoreQueryClient;