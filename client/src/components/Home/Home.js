import React, { useState } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { getPosts, getPostsBySearch } from '../../actions/posts';
import Pagination from '../Pagination';

import Posts from '../Posts/Posts';
import Form from '../Form/Form';

import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();

    const dispatch = useDispatch();
    
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    };

    const searchPost = () => {
        if(search.trim() !== '' || (tags !== undefined && tags.length !== 0)) {
            dispatch(getPostsBySearch({ search, tags: tags }));
            navigate(`/posts/search?searchQuery=${search|| 'none'}&tags=${tags}`);
        } else {
            dispatch(getPosts());
            navigate('/');
        }
    }

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid className={classes.gridContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField
                                className={classes.searchField}
                                name="search"
                                label="Search memories"
                                variant="outlined"
                                onKeyPress={handleKeyPress}
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <TextField
                                className={classes.searchField}
                                name="tags"
                                label="Search tags (i.e. paris,london)"
                                variant="outlined"
                                onKeyPress={handleKeyPress}
                                fullWidth
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                            <Button onClick={searchPost} variant='contained' className={classes.searchButton} color='primary'>
                                Search
                            </Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;