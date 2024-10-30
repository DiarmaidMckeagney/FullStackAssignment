import { useQuery } from "react-query";
import {fetchBooks} from "./BookAPI.ts";

function BookQueryClient() {
    // using the useQuery hook - 'todos' is a unique key used to identify the query
    // useQuery returns an object with isLoading, error and data properties
    const { isLoading, error, data } = useQuery("todos", fetchBooks);
    // if isLoading is true, then data still being fetched
    if (isLoading) return <p>Loading...</p>;
    // error will be true if there is an error during fetch
    if (error) return <p>An error has occurred: {error.message}</p>;
    return (
        <table className="table table-striped">
            <tbody>
                {data.map((todo) => (
                    <tr key={todo._links.self.href}>
                        <td>{todo.book_id}</td>
                        <td>{todo.isbn}</td>
                        <td>{todo.price}</td>
                        <td>{todo.year_published}</td>
                        <td>{todo.book_store}</td>
                        <td>{todo.borrow_date}</td>
                        <td>{todo.borrower}</td>
                        <td>{todo.return_date}</td>
                        <td>{todo.author}</td>
                        <td>{todo.genre}</td>
                        <td>{todo.title}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default BookQueryClient;