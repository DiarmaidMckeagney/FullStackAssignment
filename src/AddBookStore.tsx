import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import {addBookStore} from "./BookAPI";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import BookStoreDialogContent from "./BookStoreDialogContent";
import { BookStoreJSON } from "./types";

function AddBookStore() {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    //setting the state of the bookstore
    const [bookStore, setBookStore] = useState<BookStoreJSON>({
        bookStoreId: 0,
        storeName: "",
        address: "",
        managerName: "",
    });

    //calling the addBookStore method
    const { mutate } = useMutation(addBookStore, {
        onSuccess: () => {
            queryClient.invalidateQueries(["bookStore"]);
        },
        onError: (err) => {
            console.error(err);
        },
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //when a change is made in the dialog box, the changes are mapped to the bookStore
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBookStore({ ...bookStore, [event.target.name]: event.target.value });
    };
    //when the save button is pressed, the mutation is called which calls the addBookStore method
    const handleSave = () => {
        mutate(bookStore);
        setBookStore({//resets the bookStore to empty
            bookStoreId: 0,
            storeName: "",
            address: "",
            managerName: ""
        });
        handleClose();
    };

    return (//returns the button that opens the dialog box to add a new bookStore
        <>
            <button onClick={handleClickOpen}>New BookStore</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New BookStore</DialogTitle>
                <BookStoreDialogContent bookStore={bookStore} handleChange={handleChange} />
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddBookStore;