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
        isbn: 0,
        price: 0,
        yearPublished: 0,
        bookId: 0,
        bookStore: 0,
        borrowDate: null,
        borrowerId: 0,
        returnDate: null,
        author: "",
        genre: "",
        title: "",
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
            yearPublished: 0,
            bookId: 0,
            bookStore: 0,
            borrowDate: null,
            borrowerId: 0,
            returnDate: null,
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
                <DialogTitle>New Book</DialogTitle>
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