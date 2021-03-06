import axios from 'axios';
import { useState, useEffect } from 'react'
import App from '../App.css'

export default function EditProjectPage(props) {

	const API_URL = 'http://localhost:3000';

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [keywords, setKeywords] = useState('');

	const projectId = props.match.params.id;

	useEffect(() => {
		axios.get(`${API_URL}/api/projects/${projectId}`)
			.then(response => {
				console.log('use effect');
				setTitle(response.data.title);
				setDescription(response.data.description);
				setKeywords(response.data.keywords)
			})
			.catch(err => console.log(err))
	}, [])

	const deleteProject = () => {
		axios.delete(`${API_URL}/api/projects/${projectId}`)
			.then(() => {
				// redirect to the project list
				props.history.push('/projects');
			})
			.catch(err => console.log(err));
	}

	const handleSubmit = e => {
		e.preventDefault();
		const requestBody = { title, description, keywords };
		axios.put(`${API_URL}/api/projects/${projectId}`, requestBody)
			.then(response => {
				// this is a redirect using react router dom 
				props.history.push(`/projects/${projectId}`);
			})
			.catch(err => console.log(err))
	}

	return (
		<div>
			<h3>Edit your note, after saving the list will be updated!</h3>
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
				<button type="submit" className="button">+ SAVE</button>
				
				<button onClick={deleteProject} className="button" >- DELETE</button>
			</form>
	

		</div>
	)
}
