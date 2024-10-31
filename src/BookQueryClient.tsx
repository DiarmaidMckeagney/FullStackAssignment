import { useQuery } from "react-query";
import {fetchBooks} from "./BookAPI";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {v4 as uuidv4} from "uuid";

function BookQueryClient() {
    // using the useQuery hook - 'todos' is a unique key used to identify the query
    // useQuery returns an object with isLoading, error and data properties
    const { isLoading, error, data } = useQuery("todos1", fetchBooks);
    const columns: GridColDef[] = [
        {field: "bookId", headerName: "book_id", width: 200},
        {field: "isbn", headerName: "isbn", width: 200},
        {field: "price", headerName: "price", width: 200},
        {field: "yearPublished", headerName: "year_published", width: 200},
        {field: "bookStore", headerName: "book_store", width: 200},
        {field: "borrowDate", headerName: "borrow_date", width: 200},
        {field: "borrowerId", headerName: "borrower", width: 200},
        {field: "returnDate", headerName: "return_date", width: 200},
        {field: "author", headerName: "author", width: 200},
        {field: "genre", headerName: "genre", width: 200},
        {field: "title", headerName: "title", width: 200},
    ];
    // if isLoading is true, then data still being fetched
    if (isLoading) return <p>Loading...</p>;

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
    )
}

export default BookQueryClient;