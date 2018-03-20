import React from "react";
import { FormattedMessage } from "react-intl";
import moment from "moment";

import Button from "material-ui/Button";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "material-ui/Dialog";
import TextField from "material-ui/TextField";

import Blockchain from "reblock";
import Block from "components/Block";
import messages from "./messages";

export default class HomePage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      chain: [],
      open: false,
      title: "",
      message: "",
      currentBlockData: {},
      fields: []
    };
  }

  getBlockObject = data => {
    return {
      index: 0,
      timestamp: moment().format("LL h:mm:ss:SSS A"),
      data: "Block " + data.index
    };
  };

  toggleDialog = (props = {}) => {
    const {
      title = this.state.title,
      message = this.state.message,
      fields = []
    } = props;
    this.setState({ open: !this.state.open, title, message, fields });
  };

  editBlock = index => {
    const { chain, currentBlockData } = this.state;
    this.setState({
      currentBlockData: chain[index]
    });

    this.toggleDialog({
      title: "Edit block",
      message: "Edit the fields below to hack the blockchain",
      fields: Object.keys(chain[index])
    });
  };

  updateChain = chain => this.setState({ chain });

  render() {
    const {
      chain,
      open,
      title,
      message,
      fields,
      currentBlockData
    } = this.state;
    const actions =
      fields.length > 0
        ? [
            <Button
              color="primary"
              onClick={() => {
                let newChain = chain;
                newChain[currentBlockData.index] = currentBlockData;
                this.updateChain(newChain);
                this.toggleDialog();
              }}
            >
              Save
            </Button>,
            <Button onClick={this.toggleDialog}>Cancel</Button>
          ]
        : [<Button onClick={this.toggleDialog}>OK</Button>];
    const form = fields.map((label, i) => (
      <TextField
        key={i}
        label={label.charAt(0).toUpperCase() + label.slice(1)}
        InputLabelProps={{
          shrink: true
        }}
        fullWidth
        value={currentBlockData[label]}
        onChange={e => {
          const { [label]: currentLabel, ...restBlockData } = currentBlockData;
          const newBlockData = { ...restBlockData, [label]: e.target.value };
          this.setState({
            currentBlockData: newBlockData
          });
        }}
        margin="normal"
      />
    ));
    return (
      <div>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          open={open}
        >
          <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message}
              <div>{form}</div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>{actions}</DialogActions>
        </Dialog>

        <Blockchain
          genButton={
            <Button variant="raised" color="primary" fullWidth>
              Generate block
            </Button>
          }
          valButton={
            <Button variant="raised" color="secondary" fullWidth>
              Validate chain
            </Button>
          }
          notify={this.toggleDialog}
          editBlock={this.editBlock}
          chain={chain}
          updateChain={this.updateChain}
          difficulty={2}
          block={<Block />}
          getBlockObject={this.getBlockObject}
          chainValidMessage={{
            title: "Looks good!",
            message: "This chain has no errors, and it matches the rest of the network"
          }}
        />
      </div>
    );
  }
}
