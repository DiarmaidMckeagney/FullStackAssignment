import DialogContent from "@mui/material/DialogContent";
import {BookStoreJSON} from "./types";

type DialogFormProps = {
    bookStore: BookStoreJSON;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function BookStoreDialogContent({ bookStore, handleChange }: DialogFormProps) {
    return (
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