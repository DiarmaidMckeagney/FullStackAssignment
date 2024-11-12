import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import BorrowerDialogContent from "./BorrowerDialogContent";
import { BorrowerJSON, BorrowerEntry } from "./types";
import { updateBorrower } from "./BookAPI";
import { useMutation, useQueryClient } from "react-query";

type FormProps = {//borrower to be edited that is passed into the component
    borrowerData: BorrowerJSON;
};

function EditBorrower({ borrowerData }: FormProps) {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);

    //sets the state of the borrower
    const [borrower, setBorrower] = useState<BorrowerJSON>({
        borrowerId: borrowerData.borrowerId,
        cardID: borrowerData.cardID,
        firstname: borrowerData.firstname,
        lastname: borrowerData.lastname,

    });

    //calls the updateBorrower method
    const { mutate } = useMutation(updateBorrower, {
        onSuccess: () => {
            queryClient.invalidateQueries(["borrower"]);
        },
        onError: (err) => {
            console.error(err);
        },
    });

    //when the component is open, the borrower is set to the values that are passed in
    const handleClickOpen = () => {
        setOpen(true);
        setBorrower({
            borrowerId: borrowerData.borrowerId,
            cardID: borrowerData.cardID,
            firstname: borrowerData.firstname,
            lastname: borrowerData.lastname,
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    //when the save button is pressed, call the mutation to call the updateBorrower method
    const handleSave = () => {
        const id = borrowerData.borrowerId; //makes sure the id is the same as it cannot be changed
        const BorrowerEntry: BorrowerEntry= { borrower, id };//sets up the BorrowerEntry object
        mutate(BorrowerEntry);//sends the BorrowerEntry to the mutation
        setBorrower({//resets the borrower to empty
            borrowerId: 0,
            cardID: 0,
            firstname: "",
            lastname: "",

        });
        setOpen(false);
    };

    //when a change is made in the dialog box, the changes are mapped to the borrower
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBorrower({ ...borrower, [event.target.name]: event.target.value });
    };

    return (//returns a button to open the dialog box to edit a row.
        <>
            <button onClick={handleClickOpen}>Edit</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Borrower</DialogTitle>
                <BorrowerDialogContent borrower={borrower} handleChange={handleChange} />
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditBorrower;