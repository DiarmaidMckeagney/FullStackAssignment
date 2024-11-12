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

    //setting state
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

    //calling the addBook method in BokAPI
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

    //when a change is made in the dialog box, the changes are mapped to the book
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBook({ ...book, [event.target.name]: event.target.value });
    };

    //when the save button is pressed, the mutation is called, which will call the addBook method
    const handleSave = () => {
        mutate(book);
        setBook({//reset the book to empty
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

    return (//returns the button that will call the dialog content box to add a new book
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