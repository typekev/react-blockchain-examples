import React from 'react';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import sha256 from 'crypto-js/sha256';
import randomstring from 'randomstring';
// import Blockchain from "reblock";

import Button from 'material-ui/Button';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import Blockchain from 'components/Blockchain';
import Block from 'components/Block';
import messages from './messages';

const initialGlobalObject = (data = 0) => {
  return {
    index: 0,
    data: 'No data',
  };
};

const initialState = {
  chain: [],
  open: false,
  title: '',
  message: '',
  currentBlockData: {},
  fields: [],
  transaction: false,
  contract: false,
  globalObject: {},
  wallet: sha256(
    moment().format('LL h:mm:ss:SSS A') + randomstring.generate(64)
  ).toString(),
};

export default class HomePage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  toggleNewObject = type =>
    this.setState({
      title: `New ${type}`,
      message: `Note down the details of your ${type} below.`,
      globalObject: {},
      [type]: !this.state[type],
      open: !this.state.open,
    });

  toggleDialog = (props = {}) => {
    const {
      title = this.state.title,
      message = this.state.message,
      fields = [],
    } = props;
    const { open } = this.state;
    this.setState({
      open: !open,
      title,
      message,
      fields,
    });
  };

  editBlock = index => {
    const { chain, currentBlockData } = this.state;
    this.setState({
      currentBlockData: chain[index],
    });

    this.toggleDialog({
      title: 'Edit block',
      message: 'Edit the fields below to hack the blockchain',
      fields: Object.keys(chain[index]),
    });
  };

  updateChain = chain => this.setState({ chain, globalObject: {} });
  updateGlobalObject = (field, value) =>
    this.setState({
      globalObject: {
        ...this.state.globalObject,
        [field]: value,
      },
    });

  getGlobalObject = data => {
    const { globalObject, wallet } = this.state;
    this.setState({
      transaction: false,
      contract: false,
    });
    const timestamp = moment().format('LL h:mm:ss:SSS A');

    if (Object.keys(globalObject).length === 0) {
      return { ...initialGlobalObject(data), timestamp };
    } else {
      return { ...globalObject, wallet, timestamp };
    }
  };

  render() {
    const {
      chain,
      open,
      title,
      message,
      fields,
      currentBlockData,
      transaction,
      contract,
      globalObject,
      wallet,
    } = this.state;

    const isGlobalObjectEmpty =
      Object.keys(this.state.globalObject).length === 0;

    const actions =
      contract || transaction ? (
        [
          <Button key="Ok" onClick={this.toggleDialog}>
            Ok
          </Button>,
          <Button
            key="Cancel"
            onClick={() =>
              this.toggleNewObject(contract ? 'contract' : 'transaction')
            }
          >
            Cancel
          </Button>,
        ]
      ) : fields.length > 0 ? (
        [
          <Button
            key="Save"
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
          <Button key="Cancel" onClick={this.toggleDialog}>
            Cancel
          </Button>,
        ]
      ) : (
        <Button onClick={this.toggleDialog}>OK</Button>
      );
    const form = fields.map((label, i) => (
      <TextField
        key={i}
        label={
          label.charAt(0).toUpperCase() +
          label
            .slice(1)
            .replace(/([A-Z])/g, ' $1')
            .trim()
            .toLowerCase()
        }
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        value={currentBlockData[label]}
        onChange={e => {
          const { [label]: currentLabel, ...restBlockData } = currentBlockData;
          const newBlockData = { ...restBlockData, [label]: e.target.value };
          this.setState({
            currentBlockData: newBlockData,
          });
        }}
        margin="normal"
      />
    ));

    const contractElement = (
      <div>
        <TextField
          label="Contract title"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          value={globalObject.contractTitle || ''}
          onChange={e =>
            this.updateGlobalObject('contractTitle', e.target.value)
          }
          margin="normal"
        />
        <TextField
          label="Contract details"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          value={globalObject.contractDetails || ''}
          onChange={e =>
            this.updateGlobalObject('contractDetails', e.target.value)
          }
          margin="normal"
          multiline
          rowsMax="4"
        />
        <TextField
          label="Send to"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          value={globalObject.sentTo || ''}
          onChange={e => this.updateGlobalObject('sentTo', e.target.value)}
          margin="normal"
        />
        <TextField
          label="Origin wallet"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          value={wallet}
          margin="normal"
          disabled
        />
      </div>
    );

    const transactionElement = (
      <div>
        <TextField
          type="number"
          min="0"
          label="Transaction amount"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          value={parseFloat(globalObject.transactionAmount) || 0}
          onChange={e =>
            this.updateGlobalObject(
              'transactionAmount',
              parseFloat(e.target.value) > 0 ? parseFloat(e.target.value) : 0
            )
          }
          margin="normal"
        />
        <TextField
          label="Send to"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          value={globalObject.sentTo || ''}
          onChange={e => this.updateGlobalObject('sentTo', e.target.value)}
          margin="normal"
        />
        <TextField
          label="Send from"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          value={wallet}
          margin="normal"
          disabled
        />
      </div>
    );
    return (
      <div className="grid-x grid-padding-y">
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          open={open}
        >
          <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
            {contract
              ? contractElement
              : transaction
              ? transactionElement
              : form}
          </DialogContent>
          <DialogActions>{actions}</DialogActions>
        </Dialog>
        <div className="cell grid-x">
          <Button
            className="auto cell"
            variant="raised"
            color="primary"
            fullWidth
            onClick={() => this.toggleNewObject('contract')}
            disabled={!isGlobalObjectEmpty}
          >
            Create a contract
          </Button>
          <div className="small-1 cell" />
          <Button
            className="auto cell"
            variant="raised"
            color="primary"
            fullWidth
            onClick={() => this.toggleNewObject('transaction')}
            disabled={!isGlobalObjectEmpty}
          >
            Create a transaction
          </Button>
        </div>
        <div className="cell">
          <Blockchain
            genButton={
              <Button variant="raised" color="primary" fullWidth>
                {contract
                  ? 'Generate your contract'
                  : transaction
                  ? 'Generate your transaction'
                  : 'Generate default block'}
              </Button>
            }
            valButton={
              <Button
                variant="raised"
                color="secondary"
                fullWidth
                disabled={!isGlobalObjectEmpty}
              >
                Validate chain
              </Button>
            }
            notify={this.toggleDialog}
            editBlock={this.editBlock}
            chain={chain}
            updateChain={this.updateChain}
            difficulty={chain.length}
            block={<Block />}
            getBlockObject={this.getGlobalObject}
            chainValidMessage={{
              title: 'Looks good!',
              message:
                'This chain has no errors, and it matches the rest of the network',
            }}
          />
        </div>
      </div>
    );
  }
}
