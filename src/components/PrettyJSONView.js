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
      font-weight: bold;
      color: ${theme.palette.terminal.contrastText};
    `}
  >
    <span
      className={css`
        padding-right: 0.75rem;
        font-size: 0.6875rem;
        color: ${theme.palette.terminal.success};
      `}
    >
      ~>
    </span>
    <span
      className={css`
        color: ${theme.palette.terminal.accentText};
      `}
    >
      react-blockchain-examples{" "}
    </span>
    {`< ${name}_blockchain_data.json`}
    <br />
    {JSON.stringify(data, null, 2)}
    <br />
    <span
      className={css`
        color: ${theme.palette.terminal.accentText};
      `}
    >
      (END)
    </span>
  </pre>
);

export default PrettyJSONView;
