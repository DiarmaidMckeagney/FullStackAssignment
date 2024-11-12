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
                    placeholder="isbn"
                    name="isbn"
                    value={bookStore.isbn}
                    onChange={handleChange}
                />
                <br/>
                <input
                    placeholder="firstname"
                    name="firstname"
                    value={bookStore.firstname}
                    onChange={handleChange}
                />
                <br />
                <input
                    placeholder="lastname"
                    name="lastname"
                    value={bookStore.lastname}
                    onChange={handleChange}
                />
                <br />
            </DialogContent>
        </>
    );
}
export default BookStoreDialogContent;