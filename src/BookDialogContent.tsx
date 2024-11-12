import DialogContent from "@mui/material/DialogContent";
import {BookJSON} from "./types";

type DialogFormProps = {
    book: BookJSON;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function BookDialogContent({ book, handleChange }: DialogFormProps) {
    return (
        <>
            <DialogContent>
                <input
                    placeholder="isbn"
                    name="isbn"
                    value={book.isbn}
                    onChange={handleChange}
                />
                <br/>
                <input
                    placeholder="price"
                    name="price"
                    value={book.price}
                    onChange={handleChange}
                />
                <br/>
                <input
                    placeholder="year_published"
                    name="year_published"
                    value={book.yearPublished}
                    onChange={handleChange}
                />
                <br/>
                <input
                    placeholder="book_store"
                    name="book_store"
                    value={book.bookStore}
                    onChange={handleChange}
                />
                <br/>
                <input
                    type="datetime-local"
                    placeholder="borrow_date"
                    name="borrow_date"
                    onChange={handleChange}
                />
                <br/>
                <input
                    placeholder="borrower"
                    name="borrower"
                    value={book.borrowerId}
                    onChange={handleChange}
                />
                <br/>
                <input
                    type="datetime-local"
                    placeholder="return_date"
                    name="return_date"
                    onChange={handleChange}
                />
                <br/>
                <input
                    placeholder="author"
                    name="author"
                    value={book.author}
                    onChange={handleChange}
                />
                <br/>
                <input
                    placeholder="genre"
                    name="genre"
                    value={book.genre}
                    onChange={handleChange}
                />
                <br/>
                <input
                    placeholder="title"
                    name="title"
                    value={book.title}
                    onChange={handleChange}
                />
                <br/>
            </DialogContent>
        </>
    );
}

export default BookDialogContent;