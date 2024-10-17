import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const PostLayout = () => {
    return (
        <>
            <Link to='/post-page/1'>Post 1</Link><br />
            <Link to='/post-page/2'>Post 2</Link><br />
            <Link to='/post-page/3'>Post 3</Link><br />
            <Link to='/post-page/new-post'>New Post</Link>
            <br />
            <br />
            <Outlet />
        </>
    )
}

export default PostLayout