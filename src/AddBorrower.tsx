import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addBorrower } from "./BookAPI";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import BorrowerDialogContent from "./BorrowerDialogContent";
import { BorrowerJSON } from "./types";

function AddBorrower() {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    //sets state of borrower
    const [borrower, setBorrower] = useState<BorrowerJSON>({
        borrowerId: 0,
        cardID: 0,
        firstname: "",
        lastname: "",
    });
    //calls the addBorrower method
    const { mutate } = useMutation(addBorrower, {
        onSuccess: () => {
            queryClient.invalidateQueries(["borrower"]);
        },
        onError: (err) => {
            console.error(err);
        },
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    //when a change is made in the dialog box, the changes are mapped to the borrower
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBorrower({ ...borrower, [event.target.name]: event.target.value });
    };

    //when the save button is pressed, the mutation is called, which will call the addBorrower method
    const handleSave = () => {
        mutate(borrower);
        setBorrower({//resets the borrower to empty
            borrowerId: 0,
            cardID: 0,
            firstname: "",
            lastname: "",
        });
        handleClose();
    };

    return (//returns the button which calls the dialog box to add a new borrower
        <>
            <button onClick={handleClickOpen}>New Borrower</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Borrower</DialogTitle>
                <BorrowerDialogContent borrower={borrower} handleChange={handleChange} />
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddBorrower;