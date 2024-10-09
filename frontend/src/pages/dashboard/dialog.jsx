import React from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function dialog({open, handleOpen, handleDelete}) {
    const handleConfirm = (event) => {
        event.preventDefault(); // Prevent any default action
        console.log("Confirm delete clicked"); // Debug log
        handleDelete(); // Call the delete function
        handleOpen(); // Close dialog after handling delete logic
      };
  return (
    <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Delete Confirmation.</DialogHeader>
        <DialogBody>
          Do you want to delete this employee
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="text" color="black" onClick={handleConfirm}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
  )
}

export default dialog