export type BookJSON = {
    isbn: number;
    price: number;
    year_published: number;
    book_id: bigint;
    book_store: bigint;
    borrow_date: Date;
    borrower: bigint;
    return_date: Date;
    author: string;
    genre: string;
    title: string;

    _links: {
        self: {
            href: string;
        }
    }
}

export type BookStoreJSON = {
    book_store_id: bigint;
    store_name: string;
    address: string;
    manager_name: string;

    _links: {
        self: {
            href: string;
        }
    }
}

export type BorrowerJSON = {
    cardid: number;
    borrower_id: bigint;
    firstname: string;
    lastname: string;

    _links: {
        self: {
            href: string;
        }
    }
}