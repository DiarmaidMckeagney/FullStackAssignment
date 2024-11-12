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
    const [borrower, setBorrower] = useState<BorrowerJSON>({
        // @ts-ignore
        borrowerId: 0,
        cardID: 0,
        firstname: "",
        lastname: "",
    });

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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBorrower({ ...borrower, [event.target.name]: event.target.value });
    };

    const handleSave = () => {
        mutate(borrower);
        setBorrower({
            // @ts-ignore
            borrowerId: 0,
            cardID: 0,
            firstname: "",
            lastname: "",
        });
        handleClose();
    };

    return (
        <>
            <button onClick={handleClickOpen}>New Car</button>
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