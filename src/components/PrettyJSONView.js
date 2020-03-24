import React from "react";
import { css } from "emotion";
import theme from "../theme";

console.log(theme);
const PrettyJSONView = ({ data, name }) => (
  <pre
    className={css`
      margin: 0;
      height: 100%;
      overflow: scroll;
    `}
  >
    <span
      className={css`
        color: ${theme.palette.primary.contrastText};
      `}
    >
      ➜{" "}
    </span>
    <span
      className={css`
        color: ${theme.palette.primary.contrastText};
      `}
    >
      react-blockchain-examples{" "}
    </span>
    {`< ${name}_blockchain_data.json`}
    <br />
    {JSON.stringify(data, null, 2)}
    <br />
    (END)
  </pre>
);

export default PrettyJSONView;
