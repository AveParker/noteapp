import { Link } from 'react-router-dom';

// here we destructure the fields from the props object
export default function ProjectCard({ title, description, keywords, _id }) {
	console.log(title);
	return (
		<div>
			<Link to={`/projects/${_id}`}>
				<h3>{title}</h3>
			</Link>
			<p>{description}</p>
			<p>{keywords}</p>
		</div>
	)
}
