import React from "react";
import sha256 from "crypto-js/sha256";

import DefaultBlock from "../DefaultBlock";

class Blockchain extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      distributedChain: [],
      difficulty: props.difficulty || 2
    };
  }

  componentWillMount() {
    this.addBlock();
  }

  calculateHash = blockData => sha256(JSON.stringify(blockData)).toString();

  createGenesisBlock = () => {
    const { chain, updateChain, getBlockObject } = this.props;
    const genesisBlock = {
      ...getBlockObject({ index: 0 }),
      index: 0,
      previousHash: ""
    };
    const generatedBlockData = this.mineBlock(genesisBlock);

    updateChain(
      [...chain].concat([
        {
          ...genesisBlock,
          ...generatedBlockData
        }
      ])
    );
  };

  getLatestBlock = () => {
    const { chain } = this.props;
    const latestBlock = chain[chain.length - 1];
    return latestBlock;
  };

  addBlock = () => {
    const { distributedChain } = this.state;
    const { chain, updateChain, getBlockObject } = this.props;

    if (chain.length < 1) {
      this.createGenesisBlock();
      return;
    }

    const latestBlock = this.getLatestBlock();

    const newBlockData = {
      ...getBlockObject({ index: latestBlock.index + 1 }),
      index: latestBlock.index + 1,
      previousHash: latestBlock.hash
    };

    const generatedBlockData = this.mineBlock(newBlockData);

    const newBlock = { ...newBlockData, ...generatedBlockData };

    updateChain([...chain].concat([newBlock]));
    this.setState({
      distributedChain:
        distributedChain.length < 1
          ? [...chain].concat([newBlock])
          : [...distributedChain].concat([newBlock])
    });
  };

  mineBlock = block => {
    const latestBlock = this.getLatestBlock();
    const { difficulty } = this.state;
    let nonce = latestBlock ? latestBlock.nonce : 0;
    let hash = this.calculateHash(block);
    while (hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      nonce++;
      hash = this.calculateHash({ ...block, nonce });
    }
    console.log("currentBlockData HASH ADDNEW", { ...block, nonce });
    return { hash, nonce };
  };

  isChainValid = () => {
    const { distributedChain } = this.state;
    const {
      chain,
      notify = () => {},
      chainAlteredErrorMessage,
      chainLengthErrorMessage,
      chainValidMessage
    } = this.props;
    const prevBlock = this.getLatestBlock();

    for (let i = 1; i < chain.length; i++) {
      const currentBlock = chain[i];
      const previousBlock = chain[i - 1];
      const {
        hash: currentBlockHash,
        nonce,
        ...currentBlockData
      } = currentBlock;
      if (
        currentBlockHash !==
          this.calculateHash({ ...currentBlockData, nonce }) ||
        currentBlock.previousHash !== previousBlock.hash ||
        distributedChain.length !== chain.length
      ) {
        notify(
          distributedChain.length === chain.length
            ? chainAlteredErrorMessage || {
                title: "Woah!",
                message: `This chain has been altered from it's original state. Check block: ${i}`
              }
            : chainLengthErrorMessage || {
                title: "Woah!",
                message:
                  "Hold on, your chain does not match the other chains on the network.."
              }
        );
        return false;
      }
    }
    notify(
      chainValidMessage || {
        title: "Great!",
        message: "All the blocks in this chain are valid."
      }
    );
    return true;
  };

  deleteBlock = index => {
    const { chain, updateChain } = this.props;
    const filteredChain = chain.filter(block => block.index !== index);
    updateChain(filteredChain);
  };

  render() {
    const { chain, block = <DefaultBlock /> } = this.props;
    const { distributedChain } = this.state;

    const {
      genButton = <button>Generate Block</button>,
      valButton = <button>Validate Chain</button>,
      editBlock
    } = this.props;

    return (
      <div>
        {React.cloneElement(genButton, { onClick: this.addBlock })}
        {React.cloneElement(valButton, {
          onClick: this.isChainValid,
          disabled: chain.length < 2
        })}
        {chain.map((b, i) =>
          React.cloneElement(block, {
            key: i,
            onEdit: editBlock,
            onDelete: this.deleteBlock,
            ...b
          })
        )}
      </div>
    );
  }
}

Blockchain.propTypes = {};

export default Blockchain;
