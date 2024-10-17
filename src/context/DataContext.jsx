import React, { createContext, useEffect, useState } from 'react'
import { format } from 'date-fns';
import api from '../api/posts'
import useWindowSize from '../hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';
import { useNavigate } from 'react-router-dom';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState('');
    const [posts, setPosts] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const navigate = useNavigate();
    const { width } = useWindowSize();
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:8080/posts');

    // useEffect(() => {
    // 	const fetchPosts = async () => {
    // 		try {
    // 			const response = await api.get('/posts');
    // 			setPosts(response.data);
    // 		} catch (err) {
    // 			if (err.response) {
    // 				console.log(err.response.data);
    // 				console.log(err.response.status);
    // 				console.log(err.response.headers);
    // 			} else {
    // 				console.log(`Error : ${err.message}`);
    // 			}
    // 		}
    // 	}

    // 	fetchPosts();
    // }, []);
    useEffect(() => {
        setPosts(data);
    }, [data]);

    useEffect(() => {
        const filterResults = posts.filter((post) =>
            ((post.body).toLocaleLowerCase())
                .includes(search.toLocaleLowerCase())
            || ((post.title).toLocaleLowerCase())
                .includes(search.toLocaleLowerCase()));

        setSearchResults(filterResults.reverse());
    }, [posts, search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? parseInt(posts[posts.length - 1].id) + 1 : 1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = { id: id.toString(), title: postTitle, datetime, body: postBody };
        try {
            const response = await api.post('/posts', newPost);
            const allPosts = [...posts, response.data];
            setPosts(allPosts);
            setPostTitle('');
            setPostBody('');
            navigate('/');
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else {
                console.log(`Error : ${err.message}`);
            }
        }
    }

    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const editedPost = { id: id.toString(), title: editTitle, datetime, body: editBody };
        try {
            const response = await api.put(`/posts/${id}`, editedPost);
            setPosts(posts.map(p => p.id == id ? { ...response.data } : p));
            setEditBody('');
            setEditTitle('');
            navigate('/');
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else {
                console.log(`Error : ${err.message}`);
            }
        }
    }

    const handleDelete = async (id) => {
        try {
            await api.delete(`/posts/${id}`);
            const postList = posts.filter(p => p.id !== id);
            setPosts(postList);
            navigate('/');
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else {
                console.log(`Error : ${err.message}`);
            }
        }
    }

    return (
        <DataContext.Provider value={{
            width, search, setSearch, searchResults, fetchError, isLoading,
            handleSubmit, postTitle, setPostTitle, postBody, setPostBody,
            posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle,
            handleDelete
        }}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContext