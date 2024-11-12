import DialogContent from "@mui/material/DialogContent";
import { BorrowerJSON } from "./types";

type DialogFormProps = {
    borrower: BorrowerJSON;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function BorrowerDialogContent({ borrower, handleChange }: DialogFormProps) {
    return (
        <>
            <DialogContent>
                <input
                    placeholder="Card Id"
                    name="cardID"
                    value={borrower.cardID}
                    onChange={handleChange}
                />
                <br/>
                <input
                    placeholder="firstname"
                    name="firstname"
                    value={borrower.firstname}
                    onChange={handleChange}
                />
                <br />
                <input
                    placeholder="lastname"
                    name="lastname"
                    value={borrower.lastname}
                    onChange={handleChange}
                />
                <br />
            </DialogContent>
        </>
    );
}
export default BorrowerDialogContent;