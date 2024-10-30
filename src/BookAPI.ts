import { BookJSON, BookStoreJSON, BorrowerJSON } from "./types";
import axios from 'axios';

// @ts-ignore
export const fetchBooks= async (): Promise<BookJSON[]> => {
    const response = await axios.get("http://localhost:8080/api/books");
    return response.data;
};

// @ts-ignore
export const fetchBookStore= async (): Promise<BookStoreJSON[]> => {
    const response = await axios.get("http://localhost:8080/api/bookStore");
    return response.data;
};

// @ts-ignore
export const fetchBorrower= async (): Promise<BorrowerJSON[]> => {
    const response = await axios.get("http://localhost:8080/api/borrower");
    return response.data;
};

