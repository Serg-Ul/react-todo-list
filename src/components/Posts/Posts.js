import React, {memo, useEffect, useState} from 'react';

// redux
import {useDispatch, useSelector} from "react-redux";
import {removeCheckedPosts, removePost} from "../../redux/actions/posts";

// Material UI
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import {isEmpty, isEqual} from 'lodash';

const Posts = memo(() => {
    const posts = useSelector(state => state.posts.posts)
    const dispatch = useDispatch();
    const [checked, setChecked] = useState([]);

    useEffect(() => {
        console.log('rendered')
    },[])

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const removePostHandler = (index) => {
        const newPosts = [...posts];
        newPosts.splice(index, 1);

        dispatch(removePost(newPosts))
    }

    const removeCheckedPostsHandler = () => {
        const newPosts = posts.filter((item, index) => !checked.includes(index));
        const savedPosts = isEqual(newPosts, posts) ? [] : newPosts;

        setChecked([]);
        dispatch(removeCheckedPosts(savedPosts));
    }

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {
                !isEmpty(posts)
                    ? <Box sx={{width: '100%', maxWidth: 360, display: 'flex', justifyContent: 'flex-end'}}>
                        <Button variant="outlined" onClick={removeCheckedPostsHandler}>Remove All</Button>
                    </Box>
                    : null
            }
            <Box>
                <List sx={{width: '100%', maxWidth: 360, minWidth: 360, bgcolor: 'background.paper'}}>
                    {posts.map(({title}, index) => {
                        const labelId = `checkbox-list-label-${index}`;

                        return (
                            <ListItem
                                key={index}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="Delete item"
                                                onClick={() => removePostHandler(index)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                }
                                disablePadding
                            >
                                <ListItemButton role={undefined} onClick={() => handleToggle(index)} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(index) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{'aria-labelledby': labelId}}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={title}/>
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        </Box>
    );
})

export default Posts;