import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import {addBookStore} from "./BookAPI";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import BookStoreDialogContent from "./BookStoreDialogContent";
import { BookStoreJSON } from "./types";

function AddBorrower() {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    const [bookStore, setBookStore] = useState<BookStoreJSON>({
        // @ts-ignore
        bookStoreId: 0,
        storeName: "",
        address: "",
        managerName: "",
    });

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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBookStore({ ...bookStore, [event.target.name]: event.target.value });
    };

    const handleSave = () => {
        mutate(bookStore);
        setBookStore({
            bookStoreId: 0,
            storeName: "",
            address: "",
            managerName: ""
        });
        handleClose();
    };

    return (
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

export default AddBorrower;