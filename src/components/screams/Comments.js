import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
const styles = (theme) => ({
  ...theme.spreadThis,
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
    marginLeft: 30,
  },
  commentData: {
    marginLeft: 50,
  },
});

class Comments extends Component {
  render() {
    const { comments, classes } = this.props;

    return (
      <Fragment>
        <Grid container>
          {comments &&
            comments.map((comment, index) => {
              const { body, createdAt, userImage, userHandle } = comment;
              return (
                <Fragment key={createdAt}>
                  <Grid item sm={9}>
                    <Grid container>
                      <Grid item sm={2}>
                        <img
                          src={userImage}
                          alt="Comment"
                          className={classes.commentImage}
                        />
                      </Grid>
                      <Grid item sm={5}>
                        <div className={classes.commentData}>
                          <Typography
                            variant="h5"
                            component={Link}
                            to={`/users/${userHandle}`}
                            color="primary"
                          >
                            {userHandle}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                          </Typography>
                          <hr className={classes.invisibleSeparator} />
                          <Typography variant="body2">{body}</Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  {index !== comments.length - 1 && (
                    <hr className={classes.visibleSeparator} />
                  )}
                </Fragment>
              );
            })}
        </Grid>
      </Fragment>
    );
  }
}
Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default withStyles(styles)(Comments);
