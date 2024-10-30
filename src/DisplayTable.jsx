import BorrowerQueryClient from "./BorrowerQueryClient.tsx";
import BookStoreQueryClient from "./BookStoreQueryClient.tsx";
function DisplayTable() {
    return (
        <>
            <BookStoreQueryClient></BookStoreQueryClient>
            <BorrowerQueryClient></BorrowerQueryClient>
        </>
    )
}
export default DisplayTable;

