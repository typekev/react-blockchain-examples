import React from "react";

const PrettyJSONView = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

export default PrettyJSONView;
