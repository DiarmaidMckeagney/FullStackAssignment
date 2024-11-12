/*NB: We didn't include _links in the types as they are not returned in the get requests for some reason. They would just always be undefined so we saw no reason to include them.*/

//used to define how the Book table returns data
export type BookJSON = {
    isbn: number;
    price: number;
    year_published: number;
    book_id: number;
    book_store: number;
    borrow_date: Date;
    borrower: number;
    return_date: Date;
    author: string;
    genre: string;
    title: string;
}

export type BookEntry = {
    book: BookJSON;
    id: number;
}

//used to define how the Book table returns data
export type BookStoreJSON = {
    book_store_id: number;
    store_name: string;
    address: string;
    manager_name: string;
}

export type BookStoreEntry = {
    bookStore: BookStoreJSON;
    id: number;
}

//used to define how the Book table returns data
export type BorrowerJSON = {
    cardID: number;
    borrowerId: number;
    firstname: string;
    lastname: string;
}

export type BorrowerEntry = {
    borrower: BorrowerJSON;
    id: number;
}