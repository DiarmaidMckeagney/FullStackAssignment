import {useMutation, useQuery, useQueryClient} from "react-query";
import {deleteBookStore, fetchBookStore} from "./BookAPI"
import {DataGrid, GridCellParams, GridColDef} from "@mui/x-data-grid";
import {v4 as uuidv4} from "uuid";
import {useState} from "react";
import EditBookStore from "./EditBookStore";
import AddBookStore from "./AddBookStore";

function BookStoreQueryClient() {
    const [open, setOpen] = useState(false);

    const queryClient = useQueryClient();
    // using the useQuery hook - 'todos3' is a unique key used to identify the query
    // useQuery returns an object with isLoading, error and data properties
    const { isLoading, error, data } = useQuery("todos3", fetchBookStore);

    //calls the deleteBookStore method
    const { mutate } = useMutation(deleteBookStore, {
        onSuccess: () => {
            setOpen(true);
            queryClient.invalidateQueries({ queryKey: ["bookStore"] });
        },
        onError: (err) => {
            console.error(err);
        },
    });

    //defining all the columns of the data grid.
    const columns: GridColDef[] = [
        {field: "bookStoreId", headerName: "bookStoreId", width: 100},
        {field: "storeName", headerName: "storeName", width: 100},
        {field: "address", headerName: "address", width: 100},
        {field: "managerName", headerName: "managerName", width: 100},
        {
            field: "edit",
            headerName: "",
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => <EditBookStore bookStoreData={params.row} />,//calls the editBookStore component
        },
        {
            field: "delete",//calls the mutation that calls the deleteBookStore method
            headerName: "",
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <button
                    onClick={() => {
                        if (
                            window.confirm(
                                `Are you sure you want to delete ${params.row.storeName} ${params.row.address}?`
                            )
                        ) {
                            mutate(params.row.bookStoreId);
                        }
                    }}
                >
                    Delete
                </button>
            ),
        },
    ];
    // if isLoading is true, then data still being fetched
    if (isLoading) return <p>Loading...</p>;
    return (
        <>
            <AddBookStore />
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