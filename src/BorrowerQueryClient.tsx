import { useQuery } from "react-query";
import {fetchBorrower} from "./BookAPI";
import {v4 as uuidv4} from 'uuid';
import {
    DataGrid,
    GridColDef
} from "@mui/x-data-grid";

function BookQueryClient() {
    // using the useQuery hook - 'todos2' is a unique key used to identify the query
    // useQuery returns an object with isLoading, error and data properties
    const { isLoading, error, data } = useQuery("todos2", fetchBorrower);
    //defining all the columns of the data grid.
    const columns: GridColDef[] = [
        {field: "borrowerId", headerName: "Card Id", width: 100},
        {field: "cardID", headerName: "Borrower Id", width: 100},
        {field: "firstname", headerName: "Firstname", width: 100},
        {field: "lastname", headerName: "Lastname.", width: 100},
    ];
    // if isLoading is true, then data still being fetched
    if (isLoading) return <p>Loading...</p>;
    //returns the data grid containing the data from the query
    return (
        <>
            <DataGrid
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


export default BookQueryClient;