import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react'

function DialogMessage({submitError,isSubmitting,setSubmitError,errorMeasage}) {
    const submittingDialogStyles = {
        "& .MuiDialog-paper": {
          backgroundColor: "#e0f7fa",
          color: "#006064",
          padding: "20px",
          textAlign: "center",
        },
        "& .MuiDialogTitle-root": {
          fontWeight: "bold",
          fontFamily: "vazir",
        },
      };
      const errorDialogStyles = {
        "& .MuiDialog-paper": {
          backgroundColor: "#ffebee",
          color: "#c62828",
          padding: "20px",
          textAlign: "center",
        },
        "& .MuiDialogTitle-root": {
          fontWeight: "bold",
          fontFamily: "vazir",
        },
      };    
  return (
   <>
    <Dialog
        open={isSubmitting}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={submittingDialogStyles}
      >
        <DialogTitle id="alert-dialog-title">
          {"در حال بررسی اطلاعات"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لطفاً منتظر بمانید، اطلاعات شما در حال بررسی است.
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Dialog
        open={submitError}
        onClose={() => setSubmitError(false)}
        aria-labelledby="alert-dialog-error-title"
        aria-describedby="alert-dialog-error-description"
        sx={errorDialogStyles}
      >
        <DialogTitle id="alert-dialog-error-title">
          {"خطا در ارسال اطلاعات"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-error-description"  fontFamily={'vazir'} color={'red'}>
            مشکلی در ارسال اطلاعات به وجود آمد. لطفاً دوباره تلاش کنید.
          </DialogContentText>
          <DialogContentText id="alert-dialog-error-description" fontFamily={'vazir'}>
          {errorMeasage}
          </DialogContentText>
          
        </DialogContent>
      </Dialog>
   </>
  )
}

export default DialogMessage