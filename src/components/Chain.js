import React, { useState, useEffect, useContext } from "react";
import sha256 from "crypto-js/sha256";
import { Button, ButtonGroup, Container, TextField } from "@material-ui/core";
import { AlertContext } from "../providers/AlertProvider";
import Block from "./Block";

const calculateHash = blockData => sha256(JSON.stringify(blockData)).toString();

const getGenesisBlockData = () => ({
  index: -1,
  hash: ""
});

const getLatestBlock = blockchain =>
  blockchain.length ? blockchain[blockchain.length - 1] : getGenesisBlockData();

const mineBlock = (blockData, previousNonce = 0, difficulty = 0) => {
  let nonce = previousNonce;
  let hash = calculateHash(blockData);
  while (hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
    nonce++;
    hash = calculateHash({ ...blockData, nonce });
  }
  return { ...blockData, hash, nonce };
};

const addBlock = (blockchain, setBlockchain, difficulty) => {
  const {
    index: previousIndex,
    hash: previousHash,
    nonce: previousNonce
  } = getLatestBlock(blockchain);
  const index = previousIndex + 1;
  const timestamp = new Date().getTime();
  const blockData = {
    index,
    timestamp,
    previousHash
  };
  const minedBlock = mineBlock(blockData, previousNonce, difficulty);

  setBlockchain([...blockchain, minedBlock]);
};

const deleteBlock = (blockchain, setBlockchain) => index =>
  setBlockchain(blockchain.filter(block => block.index !== index));

const validate = (blockchainA, blockchainB) =>
  JSON.stringify(blockchainA) ===
  JSON.stringify(blockchainB.slice(0, blockchainA.length));

const editBlock = (blockchain, setBlockchain) => ({ hash, key, value }) =>
  setBlockchain(
    blockchain.map(block =>
      block.hash === hash ? { ...block, [key]: value } : block
    )
  );

const Chain = () => {
  const [blockchain, setBlockchain] = useState([]);
  const [localBlockchain, setLocalBlockchain] = useState([]);
  const [difficulty, setDifficulty] = useState(0);
  const setMessage = useContext(AlertContext);

  useEffect(() => {
    addBlock(blockchain, setBlockchain, difficulty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (blockchain.length > localBlockchain.length) {
      setLocalBlockchain(blockchain);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockchain]);

  useEffect(() => {
    if (validate(blockchain, localBlockchain) && localBlockchain.length > 0) {
      setBlockchain(localBlockchain);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localBlockchain]);

  return (
    <div>
      <ButtonGroup variant="contained">
        <Button
          color="primary"
          onClick={() =>
            addBlock(localBlockchain, setLocalBlockchain, difficulty)
          }
        >
          Generate Block
        </Button>
        <Button
          color="primary"
          onClick={() =>
            setMessage(
              validate(blockchain, localBlockchain)
                ? "Your local blockchain is in consensus with the majority of blockchains on the network."
                : "The local blockchain has is not in consensus!"
            )
          }
        >
          Validate
        </Button>
        <Button
          color="secondary"
          onClick={() => setLocalBlockchain(blockchain)}
        >
          Restore
        </Button>
      </ButtonGroup>
      <br />
      <br />
      <TextField
        variant="outlined"
        label="Difficulty level"
        type="number"
        value={difficulty}
        onChange={e =>
          Number(e.target.value) >= 0 &&
          setDifficulty(e.target.value > 4 ? 5 : Number(e.target.value))
        }
      />
      <Container fixed>
        {localBlockchain.map((blockData, index) => (
          <Block
            key={index}
            index={index}
            del={deleteBlock(localBlockchain, setLocalBlockchain)}
            onChange={editBlock(localBlockchain, setLocalBlockchain)}
            {...blockData}
          />
        ))}
      </Container>
    </div>
  );
};

export default Chain;
