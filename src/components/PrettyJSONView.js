import React from "react";
import { css } from "emotion";

const PrettyJSONView = ({ data, name }) => (
  <pre
    className={css`
      margin: 0;
      height: 100%;
      overflow: scroll;
    `}
  >
    ➜ react-blockchain-examples git:(master) ✗{" "}
    {`< ${name}_blockchain_data.json`}
    <br />
    {JSON.stringify(data, null, 2)}
    <br />
    (END)
  </pre>
);

export default PrettyJSONView;
