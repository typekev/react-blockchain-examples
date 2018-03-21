import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

const styles = {
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

function Block(props) {
  const {
    classes,
    index,
    timestamp,
    data,
    onDelete,
    onEdit,
    contractTitle,
    contractDetails,
    sentTo,
    transactionAmount,
    wallet,
    ...rest
  } = props;

  return (
    <div>
      <Card>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            {`Block ${index} was created on ${timestamp}`}
          </Typography>
          <Typography variant="headline" component="h2">
            {contractTitle ? "Contract" : data || "Transaction"}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {contractDetails
              ? `${wallet} created a contract titled '${contractTitle}' for ${sentTo}`
              : transactionAmount
                ? `${wallet} sent ${sentTo} ${transactionAmount} Devocoins.`
                : "Nothing to see here."}
          </Typography>
          <Typography component="h3" className={classes.pos} color="primary">
            <strong>{contractTitle}</strong>
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {contractDetails}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => onEdit(index)}>Edit</Button>
          <Button color="primary" onClick={() => onDelete(index)}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

Block.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Block);
