import axios from 'axios';
import { Component } from 'react';
import { Link } from 'react-router-dom';

const Apikey = "9e8e70d0bbd4184fc062a6193a25da14"

class HomeViews extends Component {
    state = {
        movies: [],
    };

async componentDidMount(){
    const response = await axios
    .get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${Apikey}`)
     //console.log(response.data.results)
    this.setState({movies: response.data.results})
    
}

render(){
    const { movies } = this.state;
    const baseUrl = 'https://image.tmdb.org/t/p/w500';
        return(
            <>
         <h1 className="Heading"><span>Trending today</span></h1>
            <ul className="ImageGallery">
            {movies.map(movie =>(
                <Link 
                to={{
                    pathname: `/movies/${movie.id}`,
                    state: {
                        from: this.props.location,
                        search: `${this.props.query}`,
                    },
                }}>
                <li key={movie.id} className ="ImageGalleryItem">
                    <img
                        src={baseUrl + movie.poster_path}
                        alt={movie.title}
                        width = "250"
                        className = "ImageGalleryItem_image"
                    />
                    <h2 className="MovieTitle">{movie.title}</h2>
                    <span role="img" aria-label="star">
                  ⭐️ <span>{movie.vote_average}</span>
                </span>
                </li>
                 </Link>))}
            </ul>
            </>         
        )} 
    }

export default HomeViews;

                    
