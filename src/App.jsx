import {QueryClient, QueryClientProvider} from "react-query";

import BookQueryClient from "./BookQueryClient.tsx";
import BorrowerQueryClient from "./BorrowerQueryClient.tsx";
import BookStoreQueryClient from "./BookStoreQueryClient.tsx";

const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BookQueryClient></BookQueryClient>
        </QueryClientProvider>

    );
}

export default App
