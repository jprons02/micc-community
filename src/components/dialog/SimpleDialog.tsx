import React from 'react';
import Dialog from '@mui/material/Dialog';
import { IconButton } from '@mui/material';
import Close from '@mui/icons-material/Close';

//Need typescript props for this
interface SimpleDialogProps {
  dialogContent: any;
  open: boolean;
  handleClose: () => void;
}

const SimpleDialog = (props: SimpleDialogProps) => {
  return (
    <React.Fragment>
      <Dialog
        className="simple-dialog-container"
        transitionDuration={{ enter: 600, exit: 200 }}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ position: 'relative' }}>
          <IconButton
            className="simple-dialog-close-button"
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => props.handleClose()}
          >
            <Close />
          </IconButton>
          <img
            style={{ verticalAlign: 'middle', borderStyle: 'none' }}
            src={props.dialogContent}
            width="100%"
          />
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default SimpleDialog;
