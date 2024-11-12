import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import BookDialogContent from "./BookDialogContent";
import {BookJSON, BookEntry} from "./types";
import { updateBook } from "./BookAPI";
import { useMutation, useQueryClient } from "react-query";

type FormProps = {
    bookData: BookJSON;
};

function EditBook({ bookData }: FormProps) {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);

    const [book, SetBook] = useState<BookJSON>({
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

    const { mutate } = useMutation(updateBook, {
        onSuccess: () => {
            queryClient.invalidateQueries(["book"]);
        },
        onError: (err) => {
            console.error(err);
        },
    });

    const handleClickOpen = () => {
        setOpen(true);
        SetBook({
            isbn: bookData.isbn,
            price:  bookData.price,
            yearPublished:  bookData.yearPublished,
            bookId:  bookData.bookId,
            bookStore:  bookData.bookStore,
            borrowDate:  bookData.borrowDate,
            borrowerId:  bookData.borrowerId,
            returnDate:  bookData.returnDate,
            author:  bookData.author,
            genre:  bookData.genre,
            title:  bookData.title,
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        const id = bookData.bookId;
        const BookEntry: BookEntry= { book, id };
        mutate(BookEntry);
        SetBook({
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
        setOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        SetBook({ ...book, [event.target.name]: event.target.value });
    };

    return (
        <>
            <button onClick={handleClickOpen}>Edit</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Book</DialogTitle>
                <BookDialogContent book={book} handleChange={handleChange} />
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditBook;