import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import BookStoreDialogContent from "./BookStoreDialogContent";
import { BookStoreJSON, BookStoreEntry } from "./types";
import { updateBookStore } from "./BookAPI";
import { useMutation, useQueryClient } from "react-query";

type FormProps = {
    bookStoreData: BookStoreJSON;
};

function EditBorrower({ bookStoreData }: FormProps) {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);

    const [bookStore, SetBookStore] = useState<BookStoreJSON>({
        bookStoreId: bookStoreData.bookStoreId,
        storeName: bookStoreData.storeName,
        address: bookStoreData.address,
        managerName: bookStoreData.managerName,

    });

    const { mutate } = useMutation(updateBookStore, {
        onSuccess: () => {
            queryClient.invalidateQueries(["bookStore"]);
        },
        onError: (err) => {
            console.error(err);
        },
    });

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

    const handleSave = () => {
        const id = bookStoreData.bookStoreId;
        const BookStoreEntry: BookStoreEntry= { bookStore, id };
        mutate(BookStoreEntry);
        SetBookStore({
            bookStoreId: 0,
            storeName: "",
            address: "",
            managerName: ""

        });
        setOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        SetBookStore({ ...bookStore, [event.target.name]: event.target.value });
    };

    return (
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

export default EditBorrower;