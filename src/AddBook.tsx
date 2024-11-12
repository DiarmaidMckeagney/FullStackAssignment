import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import {addBook} from "./BookAPI";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import BookDialogContent from "./BookDialogContent";
import {BookJSON} from "./types";

function AddBook() {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    const [book, setBook] = useState<BookJSON>({
        // @ts-ignore
        borrower_id: 0,
        cardid: 0,
        firstname: "",
        lastname: "",
    });

    const { mutate } = useMutation(addBook, {
        onSuccess: () => {
            queryClient.invalidateQueries(["book"]);
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
        setBook({ ...book, [event.target.name]: event.target.value });
    };

    const handleSave = () => {
        mutate(book);
        setBook({
            // @ts-ignore
            isbn: 0,
            price: 0,
            year_published: 0,
            book_id: 0,
            book_store: 0,
            borrow_date: null,
            borrower: 0,
            return_date: null,
            author: "",
            genre: "",
            title: "",
        });
        handleClose();
    };

    return (
        <>
            <button onClick={handleClickOpen}>New Book</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New car</DialogTitle>
                <BookDialogContent book={book} handleChange={handleChange} />
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddBook;