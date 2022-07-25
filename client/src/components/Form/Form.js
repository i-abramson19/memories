import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';


import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        title: '', message: '', tags: '', selectedFile: ''
    });
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(post) setPostData(post);
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (postData.title === '' || postData.message === '') {
            toast.error('Please enter a title and message for your memory.');

            return
        }

        if(currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            toast.success('Post updated!');
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }

        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' })
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Please sign in to create and like memories.
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Edit' : 'Create'} a Memory</Typography>
                <TextField 
                    name='title' 
                    variant='outlined' 
                    label='Title' 
                    fullWidth
                    required
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}    
                />
                <TextField 
                    name='messsage' 
                    variant='outlined' 
                    label='Message' 
                    fullWidth
                    required
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}    
                />
                <TextField 
                    name='tags' 
                    variant='outlined' 
                    label='Tags (i.e. peru,europe)' 
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}    
                />
                <Typography>
                    * required fields
                </Typography>
                <div className={classes.fileInput}>
                    <FileBase
                        type='file'
                        multiple={false}
                        value={postData.selectedFile}
                        onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;