import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  TextField,
  Grid
} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";

const Block = ({ index, timestamp, hash, del, onChange, ...fields }) => {
  return (
    <>
      <br />
      <Card variant="outlined">
        <CardHeader
          action={
            <IconButton aria-label="delete" onClick={() => del(index)}>
              <Delete color="error"/>
            </IconButton>
          }
          title={`Block ${index || "GENESIS"}`}
          subheader={`Created on ${new Date(timestamp)}`}
        />
        <CardContent>
          <Grid container spacing={2}>
            {[
              ["index", index],
              ["timestamp", timestamp],
              ["hash", hash],
              ...Object.entries(fields)
            ].map(([key, value]) => (
              <Grid key={key} item>
                <TextField
                  color="secondary"
                  variant="outlined"
                  type={typeof value}
                  label={key}
                  value={value}
                  onChange={e =>
                    onChange({
                      hash,
                      key,
                      value:
                        typeof value === "number"
                          ? Number(e.target.value)
                          : e.target.value
                    })
                  }
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default Block;
