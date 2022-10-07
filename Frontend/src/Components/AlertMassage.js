import { Button, IconButton, Snackbar, Typography } from "@mui/material";
import * as React from "react";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertMassage({alertInfo,setAlertInfo}) {
    function handleClose(event, reason) {
      if (reason === "clickaway") {
        return;
      }
      setAlertInfo({...alertInfo,open:false});
    }
  return (
    
    <div>
      <Snackbar    anchorOrigin={{vertical: "bottom",horizontal: "right"}} open={alertInfo.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertInfo.severity} sx={{ width: '130%' }}>
          <Typography fontSize={20}>{alertInfo.message}</Typography>
        </Alert>
      </Snackbar>
          
  </div>
  );
}
