import DialogContent from "@mui/material/DialogContent";
import {BookJSON} from "./types";

type DialogFormProps = {//props that are passed in
    book: BookJSON;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function BookDialogContent({ book, handleChange }: DialogFormProps) {
    return (//returns a dialog box with all fields for a book except the bookId which is auto generated and is not allowed to be changed
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
                    placeholder="yearPublished"
                    name="yearPublished"
                    value={book.yearPublished}
                    onChange={handleChange}
                />
                <br/>
                <input
                    placeholder="bookStore"
                    name="bookStore"
                    value={book.bookStore}
                    onChange={handleChange}
                />
                <br/>
                <input
                    type="datetime-local"
                    placeholder="borrowDate"
                    name="borrowDate"
                    onChange={handleChange}
                />
                <br/>
                <input
                    placeholder="borrowerId"
                    name="borrowerId"
                    value={book.borrowerId}
                    onChange={handleChange}
                />
                <br/>
                <input
                    type="datetime-local"
                    placeholder="returnDate"
                    name="returnDate"
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