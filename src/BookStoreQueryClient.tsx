import { useQuery } from "react-query";
import {fetchBookStore} from "./BookAPI"
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {v4 as uuidv4} from "uuid";

function BookStoreQueryClient() {
    // using the useQuery hook - 'todos' is a unique key used to identify the query
    // useQuery returns an object with isLoading, error and data properties
    const { isLoading, error, data } = useQuery("todos3", fetchBookStore);
    const columns: GridColDef[] = [
        {field: "bookStoreId", headerName: "bookStoreId", width: 200},
        {field: "storeName", headerName: "storeName", width: 200},
        {field: "address", headerName: "address", width: 200},
        {field: "managerName", headerName: "managerName", width: 200},
    ];
    // if isLoading is true, then data still being fetched
    if (isLoading) return <p>Loading...</p>;
    // error will be true if there is an error during fetch
    return (
        <>
            <DataGrid
                rows={data}
                columns={columns}
                // option if you don't want to highlight selected row
                disableRowSelectionOnClick={true}
                //all rows must have unique id defined using getRowId
                getRowId={(row) => uuidv4()}
            />
        </>
    );
}

export default BookStoreQueryClient;