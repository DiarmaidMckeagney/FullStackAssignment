import {BookJSON, BookStoreJSON, BorrowerJSON, BookEntry, BookStoreEntry, BorrowerEntry} from "./types";
import axios from 'axios';

//used to get data from the books table
// @ts-ignore
export const fetchBooks= async (): Promise<BookJSON[]> => {
    const response = await axios.get("http://localhost:8080/api/books");
    return response.data;
};

// @ts-ignore
//deletes a book
export const deleteBooks = async (id: bigint): Promise<BookJSON[]> => {
    const response = await axios.delete("http://localhost:8080/api/books/"+ id);
    return response.data
};

// @ts-ignore
//adds a new book
export const addBook = async (Book: BookJSON): Promise<BookJSON[]> => {
    const response = await axios.post("http://localhost:8080/api/books", Book, {
        headers: { 'Content-Type': 'application/json', },
    });

    return response.data;
};

// @ts-ignore
//edits a book
export const updateBook = async (bookEntry: BookEntry): Promise<BookJSON> => {
    const response = await axios.patch("http://localhost:8080/api/books/"+bookEntry.id, bookEntry.book, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
};

//used to get data from the book store table
// @ts-ignore
export const fetchBookStore= async (): Promise<BookStoreJSON[]> => {
    const response = await axios.get("http://localhost:8080/api/bookStore");
    return response.data;
};

// @ts-ignore
//deletes a bookstore
export const deleteBookStore = async (id: bigint): Promise<BookStoreJSON[]> => {
    const response = await axios.delete("http://localhost:8080/api/bookStore/"+ id);
    return response.data
};

// @ts-ignore
//adds a new book store
export const addBookStore = async (BookStore: BookStoreJSON): Promise<BookStoreJSON[]> => {
    const response = await axios.post("http://localhost:8080/api/bookStore", BookStore, {
        headers: { 'Content-Type': 'application/json', },
    });

    return response.data;
};

// @ts-ignore
//edits a bookstore
export const updateBookStore = async (bookStoreEntry: BookStoreEntry): Promise<BookStoreJSON> => {
    const response = await axios.patch("http://localhost:8080/api/bookStore/"+ bookStoreEntry.id, bookStoreEntry.bookStore, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
};

//used to get data from the borrower table
// @ts-ignore
export const fetchBorrower= async (): Promise<BorrowerJSON[]> => {
    const response = await axios.get("http://localhost:8080/api/borrower");
    return response.data;
};

// @ts-ignore
//deletes a borrower
export const deleteBorrower = async (id:bigint): Promise<BorrowerJSON[]> => {
    const response = await axios.delete("http://localhost:8080/api/borrower/"+ id);
    return response.data
};

// @ts-ignore
//adds a new borrower
export const addBorrower = async (Borrower: BorrowerJSON): Promise<BorrowerJSON[]> => {
    const response = await axios.post("http://localhost:8080/api/borrower", Borrower, {
        headers: { 'Content-Type': 'application/json', },
    });

    return response.data;
};


// @ts-ignore
//edits a borrower
export const updateBorrower = async (borrowerEntry: BorrowerEntry): Promise<BorrowerJSON> => {
    const response = await axios.patch(`http://localhost:8080/api/borrower/${borrowerEntry.id}`, borrowerEntry.borrower, {
        headers: {
            'Content-Type': 'application/json'

        },
    });
};
