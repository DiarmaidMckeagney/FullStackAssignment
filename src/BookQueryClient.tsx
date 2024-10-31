import { useQuery } from "react-query";
import {fetchBooks} from "./BookAPI";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {v4 as uuidv4} from "uuid";

function BookQueryClient() {
    // using the useQuery hook - 'todos1' is a unique key used to identify the query
    // useQuery returns an object with isLoading, error and data properties
    const { isLoading, error, data } = useQuery("todos1", fetchBooks);
    //defining all the columns of the data grid.
    const columns: GridColDef[] = [
        {field: "bookId", headerName: "book_id", width: 100},
        {field: "isbn", headerName: "isbn", width: 100},
        {field: "price", headerName: "price", width: 100},
        {field: "yearPublished", headerName: "year_published", width: 100},
        {field: "bookStore", headerName: "book_store", width: 100},
        {field: "borrowDate", headerName: "borrow_date", width: 100},
        {field: "borrowerId", headerName: "borrower", width: 100},
        {field: "returnDate", headerName: "return_date", width: 100},
        {field: "author", headerName: "author", width: 100},
        {field: "genre", headerName: "genre", width: 100},
        {field: "title", headerName: "title", width: 100},
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
    )
}

export default BookQueryClient;