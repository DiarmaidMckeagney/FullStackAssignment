import DialogContent from "@mui/material/DialogContent";
import { BorrowerJSON } from "./types";

type DialogFormProps = {//props that are passed into the component
    borrower: BorrowerJSON;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function BorrowerDialogContent({ borrower, handleChange }: DialogFormProps) {
    return (//returns a dialog box with all fields for a borrower except the borrowerId which is auto generated and is not allowed to be changed
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