import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, ButtonBase, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { likePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);

  const user = JSON.parse(localStorage.getItem('profile'));

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const  Likes = () => {
      if (likes.length > 0) {
          return likes.find((like) => like === userId)
              ? (
                  <>
                      <ThumbUpAltIcon fontSize='small' />&nbsp;
                      {likes.length > 2 
                          ? `You and ${likes.length - 1} others` 
                              : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
                  </>
              ) : (
                  <><ThumbUpAltOutlinedIcon fontSize='small' />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
              );
      }

      return <><ThumbUpAltOutlinedIcon fontSize='small' /> &nbsp;Like</>;
  };

  const openPost = () => {
      navigate(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.details}>
          {
            post.tags[0] !== '' && post.tags?.length > 0 && (
              <Typography variant="body2" color="textSecondary" component="h2">
                {post.tags.map((tag) => `#${tag} `)}
              </Typography>
            )
          }
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <div className={classes.cardFooter}>
          <Button size='small' color='primary' disabled={!user?.result} onClick={handleLike}>
              <Likes />
          </Button>
        </div>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <div className={classes.cardFooter}>
            <Button size='small' color='primary' onClick={() => setCurrentId(post._id)}>
              <EditIcon fontSize='small' />
                Edit
            </Button>
          </div>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;