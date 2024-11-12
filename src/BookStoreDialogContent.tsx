import DialogContent from "@mui/material/DialogContent";
import {BookStoreJSON} from "./types";

type DialogFormProps = { //props that are passed into the component
    bookStore: BookStoreJSON;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function BookStoreDialogContent({ bookStore, handleChange }: DialogFormProps) {
    return (//returns a dialog box with all fields for a bookStore except the bookStoreId which is auto generated and is not allowed to be changed
        <>
            <DialogContent>
                <input
                    placeholder="storeName"
                    name="storeName"
                    value={bookStore.storeName}
                    onChange={handleChange}
                />
                <br/>
                <input
                    placeholder="address"
                    name="address"
                    value={bookStore.address}
                    onChange={handleChange}
                />
                <br/>
                <input
                    placeholder="managerName"
                    name="managerName"
                    value={bookStore.managerName}
                    onChange={handleChange}
                />
                <br/>
            </DialogContent>
        </>
    );
}

export default BookStoreDialogContent;