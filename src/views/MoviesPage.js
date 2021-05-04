import axios from "axios";
import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Route } from "react-router";
import Searchbar from "../components/Searchbar";
import MovieDetailsPage from "./MovieDetailsPage";
//import searchMovieApi from '../service/movies-api';

const Apikey = "9e8e70d0bbd4184fc062a6193a25da14"

// class MoviesPage extends Component {
//     state = {
//       searchQuery: '',
//       movies: [],
//     };
  
//     componentDidUpdate(prevProps, prevState) {
//         if (prevState.searchQuery !== this.state.searchQuery) {
//           this.fetchMovie();
//         }
//       }


//     onChangeQuery = (query) => {
//       this.setState({
//         searchQuery: query, 
//         movies: [],
//       });
//     };
  
//     fetchMovie =() =>{
//         const {searchQuery} = this.state;
//         const options = {searchQuery};

//         searchMovieApi
//         .fetchMovie(options)
//         .then(({results}) =>{
//             this.setState (prevState =>({movies:[...results]
//             }));
//         })
//     }

class MoviesPage extends Component {
    state = {
        query: '',
        movies: [],
    };

    async componentDidMount(){
        if(this.state.query.length > 0){
            const response = await axios
            .get(`https://api.themoviedb.org/3/search/movie?api_key=${Apikey}&query=${this.state.query}`,)
            .catch(console.log)
            console.log(response)
            this.setState({movies: response.data.results});
            
        }
      }

    componentDidUpdate(prevProps, prevState){
            if(prevState.query !== this.state.query){
                this.fetchMovies();
            }
        }


    async fetchMovies(){
        const {query} = this.state;
        const response = await axios
                .get(`https://api.themoviedb.org/3/search/movie?api_key=${Apikey}&query=${query}`)
                .catch(console.log)
                this.setState({movies: response.data.results})
                console.log(response);
    }

    onChangeQuery = query => {
        this.setState({
         query: query, 
          movies: [],
        }); 
      };

      render(){
        const {movies,query } = this.state;
        const {match} = this.props;
        
        const baseUrl = 'https://image.tmdb.org/t/p/w500';
        
        return(
            <div>
                <Searchbar onSubmit={this.onChangeQuery}/>
                <ul>
                    {movies.map(movie =>(
                        <Link to={{
                            pathname: `/movies/${movie.id}`,
                            state: { query },
                            }}>
                        <li key={movie.id}>
                            <img
                                src={baseUrl + movie.poster_path}
                                alt={movie.title}
                                width = "250"
                            />
                            <h2>{movie.title}</h2>
                            <span role="img" aria-label="star">
                          ⭐️ <span>{movie.vote_average}</span>
                        </span>
                        </li>
                         </Link>))}
                    </ul>
        
                    <Route
                    path={`${match.path}/:movieId`}
                    render={props => {
                        const movieId = Number(props.match.params.movieId);
                        const movie = movies.find(({ id }) => id === movieId);
                        return movie ? <MovieDetailsPage {...props} /> : null;
                  }}
                />
            </div>
        )}
        }
        
        
        
        
        
        export default withRouter(MoviesPage);