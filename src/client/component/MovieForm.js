import { useState } from 'react';
const apiUrl = 'http://localhost:4000';

const MovieForm = ({movies, setMovies}) => {
    const [movie, setMovie] = useState({ 
        title: '', 
        description: '', 
        runtimeMins: 60 
    });

    // handle change=============================
    const handleChange = (e) => {
        const { name, value } = e.target;

        setMovie({
            ...movie,
            [name]: name === 'runtimeMins' ? parseInt(value) : value
        });
    }

    // handle submit movie======================
    const handleSubmitMovie = async (e) => {
        e.preventDefault();

        const res = await fetch(`${apiUrl}/movie`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": localStorage.getItem('user')
			},
			body: JSON.stringify(movie),
		});
		const data = await res.json();
        setMovies([...movies, data]);
        cleanForm();
    };

    const cleanForm = () => {
        setMovie({
            title: '', 
            description: '', 
            runtimeMins: 60 
        })
    }

    return (
		<div>
			<form onSubmit={handleSubmitMovie}>
				<input
					type="text"
					name="title"
					placeholder="Title"
					value={movie.title}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="description"
					placeholder="Description"
					value={movie.description}
					onChange={handleChange}
				/>
				<input
					type="number"
					name="runtimeMins"
					placeholder="Runtime (minutes)"
					value={movie.runtimeMins}
					onChange={handleChange}
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default MovieForm