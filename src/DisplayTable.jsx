import BorrowerQueryClient from "./BorrowerQueryClient.tsx";
import BookStoreQueryClient from "./BookStoreQueryClient.tsx";
import BookQueryClient from "./BookQueryClient.tsx";

//displays each of the three tables.
function DisplayTable() {
    return (
        <>
            <BookStoreQueryClient></BookStoreQueryClient>
            <BorrowerQueryClient></BorrowerQueryClient>
            <BookQueryClient></BookQueryClient>
        </>
    )
}
export default DisplayTable;

