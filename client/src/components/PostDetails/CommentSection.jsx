import React, { useState } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleClick =  async () => {
        const finalComment = `${user.result.name}: ${comment}`;

        const newComments = await dispatch(commentPost(finalComment, post._id));

        setComments(newComments);
        setComment('');
    }

    return (
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                <Typography gutterBottom variant='h6'>Comments</Typography>
                {
                    comments?.length > 0 ? (
                        comments.map((c, i) => (
                            <Typography key={i} gutterBottom variant='subtitle1'>
                                <strong>{c.split(': ')[0]}</strong>
                                {c.split(':')[1]}
                            </Typography> 
                         ))
                    ) : (
                        <Typography>Be the first to comment below!</Typography>
                    )
                }
            </div>
            {user?.result?.name && (
            <div style={{ width: '70%', marginTop: '25px' }}>
                <TextField
                    fullWidth
                    minRows={4}
                    variant='outlined'
                    label='Comment'
                    multiline
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button style={{ marginTop: '10px' }} color='primary' fullWidth disabled={!comment} variant='contained' onClick={handleClick} >
                    Comment
                </Button>
            </div>
            )}
        </div>
    );
};

export default CommentSection;