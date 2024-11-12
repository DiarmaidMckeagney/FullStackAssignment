import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import BookDialogContent from "./BookDialogContent";
import {BookJSON, BookEntry} from "./types";
import { updateBook } from "./BookAPI";
import { useMutation, useQueryClient } from "react-query";

type FormProps = {//book to be updated that is passed in
    bookData: BookJSON;
};

function EditBook({ bookData }: FormProps) {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);

    //sets the state of the book
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

    //calls the updateBook method
    const { mutate } = useMutation(updateBook, {
        onSuccess: () => {
            queryClient.invalidateQueries(["book"]);
        },
        onError: (err) => {
            console.error(err);
        },
    });

    //when the component is opened, set the data to what has been passed in
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

    //when the save button is pressed, call the mutation to call the updateBook method
    const handleSave = () => {
        const id = bookData.bookId;//makes sure the id is the same as it cannot be changed
        const BookEntry: BookEntry= { book, id }; //sets up the Book Entry object
        mutate(BookEntry);//sends the BookEntry to the mutation
        SetBook({//resets the book to empty
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

    //when a change is made in the dialog box, the changes are mapped to the book
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        SetBook({ ...book, [event.target.name]: event.target.value });
    };

    return (//returns a button to open the dialog box to edit a row.
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