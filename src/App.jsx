import {QueryClient, QueryClientProvider} from "react-query";
import BookStoreQueryClient from "./BookStoreQueryClient.tsx";
import BorrowerQueryClient from "./BorrowerQueryClient.tsx";

const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BookStoreQueryClient></BookStoreQueryClient>
            <BorrowerQueryClient></BorrowerQueryClient>
        </QueryClientProvider>
    );
}

export default App
