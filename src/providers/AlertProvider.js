import React, { useMemo } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Skeleton from "@material-ui/lab/Skeleton";

export const AlertContext = React.createContext(() => {});

const AlertProvider = ({ children }) => {
  const [message, setMessage] = React.useState("");

  return (
    <>
      <Dialog
        fullWidth
        open={message}
        onClose={() => setMessage("")}
        aria-labelledby="validation"
        aria-describedby="validation remarks"
      >
        <DialogTitle id="alert-dialog-title">Validation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message || (
              <>
                <Skeleton />
                <Skeleton />
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMessage("")} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <AlertContext.Provider value={setMessage}>
        {children}
      </AlertContext.Provider>
    </>
  );
};

export default AlertProvider;
