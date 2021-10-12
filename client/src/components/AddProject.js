import { useState } from 'react'
import axios from 'axios';
import App from '../App.css'

export default function AddProject(props) {

	const API_URL = 'http://localhost:3000';

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [keywords, setKeywords] = useState('');
	

	const handleSubmit = e => {
		e.preventDefault();

		// make a post request to the server with the form fields in the body
		const requestBody = { title, description, keywords };
		axios.post(`${API_URL}/api/projects`, requestBody)
			.then(response => {
				// reset the state and thereby reset the form
				setTitle('');
				setDescription('');
				setKeywords('');
				// we need to trigger 'getAllProjects' in the ProjectListPage component
				props.refreshProjects();
			})
			.catch(err => console.log(err))
	}

	return (
		<div className="contain">
			<h3 ></h3>
			<form onSubmit={handleSubmit}>
				<label htmlFor="title">Title: </label>
				<input
					type="text"
					name="title"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
				<label htmlFor="description">Description: </label>
				<input
					type="text"
					name="description"
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>
				<label htmlFor="keywords">Keywords: </label>
				<input
					type="text"
					name="keywords"
					value={keywords}
					onChange={e => setKeywords(e.target.value)}
				/>
			
				<button type="submit">Add this note ＋</button>
				
			</form>
		</div>
	)
}
