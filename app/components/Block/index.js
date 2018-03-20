import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

function Block(props) {
  const { classes, index, timestamp, data, onDelete, onEdit, ...rest } = props;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            {timestamp}
          </Typography>
          <Typography variant="headline" component="h2">
            {`Block ${index}`}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {data}
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
