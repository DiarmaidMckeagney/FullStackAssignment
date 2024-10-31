import {QueryClient, QueryClientProvider} from "react-query";
import DisplayTable from "./DisplayTable.jsx";

//create a new query client object
const queryClient = new QueryClient();

function App() {
    //displays the DisplayTable component
    return (
        <QueryClientProvider client={queryClient}>
           <DisplayTable></DisplayTable>
        </QueryClientProvider>
    );
}

export default App
