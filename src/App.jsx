import React from 'react'
import Header from './components/Header'
import Nav from "./components/Nav";
import About from './components/About';
import Missing from './components/Missing';
import Home from './components/Home';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import { Route, Routes } from 'react-router-dom';
import EditPost from './components/EditPost';
import { DataProvider } from './context/DataContext';
import Footer from './components/Footer';

const App = () => {

	return (
		<div className='App'>
			<DataProvider>
				<Header title='Algo Social Media' />
				<Nav />
				<Routes>
					<Route path='/' element={<Home />}
					/>
					<Route path='/post'>
						<Route index element={
							<NewPost />} />
						<Route path=':id' element={<PostPage />} />
					</Route>
					<Route path='/edit-post/:id' element={<EditPost />} />
					<Route path='/about' element={<About />} />
					<Route path='*' element={<Missing />} />
				</Routes>
				<Footer />
			</DataProvider>
		</div>
	)
}

export default App