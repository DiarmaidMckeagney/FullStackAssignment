import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import BookStoreDialogContent from "./BookStoreDialogContent";
import { BookStoreJSON, BookStoreEntry } from "./types";
import { updateBookStore } from "./BookAPI";
import { useMutation, useQueryClient } from "react-query";

type FormProps = {//book store to be edited that is passed into the component
    bookStoreData: BookStoreJSON;
};

function EditBookStore({ bookStoreData }: FormProps) {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);

    //sets the state of the bookStore
    const [bookStore, SetBookStore] = useState<BookStoreJSON>({
        bookStoreId: 0,
        storeName: "",
        address: "",
        managerName: "",
    });

    //calls the updateBookStore method
    const { mutate } = useMutation(updateBookStore, {
        onSuccess: () => {
            queryClient.invalidateQueries(["bookStore"]);
        },
        onError: (err) => {
            console.error(err);
        },
    });

    //when the component is open, the bookStore is set to the values that are passed in
    const handleClickOpen = () => {
        setOpen(true);
        SetBookStore({
            bookStoreId: bookStoreData.bookStoreId,
            storeName: bookStoreData.storeName,
            address: bookStoreData.address,
            managerName: bookStoreData.managerName,
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    //when the save button is pressed, call the mutation to call the updateBookStore method
    const handleSave = () => {
        const id = bookStoreData.bookStoreId;//makes sure the id is the same as it cannot be changed
        const BookStoreEntry: BookStoreEntry= { bookStore, id }; //sets up the BookStoreEntry object
        mutate(BookStoreEntry);//sends the BookStoreEntry to the mutation
        SetBookStore({//resets the bookStore to empty
            bookStoreId: 0,
            storeName: "",
            address: "",
            managerName: ""
        });
        setOpen(false);
    };

    //when a change is made in the dialog box, the changes are mapped to the bookStore
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        SetBookStore({ ...bookStore, [event.target.name]: event.target.value });
    };

    return (//returns a button to open the dialog box to edit a row.
        <>
            <button onClick={handleClickOpen}>Edit</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit BookStore</DialogTitle>
                <BookStoreDialogContent bookStore={bookStore} handleChange={handleChange} />
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditBookStore;