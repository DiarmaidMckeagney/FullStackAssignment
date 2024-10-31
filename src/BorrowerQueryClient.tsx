import { useQuery } from "react-query";
import {fetchBorrower} from "./BookAPI";
import {v4 as uuidv4} from 'uuid';
import {
    DataGrid,
    GridColDef
} from "@mui/x-data-grid";

function BookQueryClient() {
    // using the useQuery hook - 'todos' is a unique key used to identify the query
    // useQuery returns an object with isLoading, error and data properties


    const { isLoading, error, data } = useQuery("todos2", fetchBorrower);

    const columns: GridColDef[] = [
        {field: "borrowerId", headerName: "Card Id", width: 200},
        {field: "cardID", headerName: "Borrower Id", width: 200},
        {field: "firstname", headerName: "Firstname", width: 200},
        {field: "lastname", headerName: "Lastname.", width: 200},
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


export default BookQueryClient;