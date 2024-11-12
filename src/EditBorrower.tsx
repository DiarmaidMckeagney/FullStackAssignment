import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import BorrowerDialogContent from "./BorrowerDialogContent";
import { BorrowerJSON, BorrowerEntry } from "./types";
import { updateBorrower } from "./BookAPI";
import { useMutation, useQueryClient } from "react-query";

type FormProps = {
    borrowerData: BorrowerJSON;
};

function EditBorrower({ borrowerData }: FormProps) {
    const queryClient = useQueryClient();

    const [open, setOpen] = useState(false);
    // @ts-ignore
    // @ts-ignore
    const [borrower, setBorrower] = useState<BorrowerJSON>({
        borrowerId: borrowerData.borrowerId,
        cardID: borrowerData.cardID,
        firstname: borrowerData.firstname,
        lastname: borrowerData.lastname,

    });

    const { mutate } = useMutation(updateBorrower, {
        onSuccess: () => {
            queryClient.invalidateQueries(["borrower"]);
        },
        onError: (err) => {
            console.error(err);
        },
    });

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

    const handleSave = () => {
        const id = borrowerData.borrowerId;
        const BorrowerEntry: BorrowerEntry= { borrower, id };
        mutate(BorrowerEntry);
        setBorrower({
            borrowerId: 0,
            cardID: 0,
            firstname: "",
            lastname: "",

        });
        setOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBorrower({ ...borrower, [event.target.name]: event.target.value });
    };

    return (
        <>
            <button onClick={handleClickOpen}>Edit</button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit car</DialogTitle>
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