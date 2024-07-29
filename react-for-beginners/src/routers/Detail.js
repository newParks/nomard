import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Movie from '../components/Movie';

function Detail(){
    const [movies, setMovies] = useState();
    const [loading , setLoading] = useState(true);
    const {id} = useParams();
    const getMovie = async() => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMovies(json.data.movie)
        setLoading(false);
    }
    useEffect(()=> {
        getMovie();
    }, []);
    return (
        <div>
            <h1>Detail</h1>
            {loading ? <h1>Loading...</h1>: 
                (
                    <div>
                       <Movie 
                        key={movies.id}
                        id={movies.id}
                        medium_cover_image={movies.medium_cover_image}
                        title={movies.title}
                        summary={movies.summary}
                        genres={movies.genres}/>
                    </div>  
                )}
        </div>
    );
}

export default Detail;