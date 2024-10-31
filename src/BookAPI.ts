import { BookJSON, BookStoreJSON, BorrowerJSON } from "./types";
import axios from 'axios';

//used to get data from the books table
// @ts-ignore
export const fetchBooks= async (): Promise<BookJSON[]> => {
    const response = await axios.get("http://localhost:8080/api/books");
    return response.data;
};

//used to get data from the book store table
// @ts-ignore
export const fetchBookStore= async (): Promise<BookStoreJSON[]> => {
    const response = await axios.get("http://localhost:8080/api/bookStore");
    return response.data;
};

//used to get data from the borrower table
// @ts-ignore
export const fetchBorrower= async (): Promise<BorrowerJSON[]> => {
    const response = await axios.get("http://localhost:8080/api/borrower");
    return response.data;
};

