import axios from "axios";
import { Component } from "react";
import { Route, withRouter } from "react-router";
import { Link } from "react-router-dom";
import Cast from "../components/Cast";
import Reviews from "../components/Reviews"

const Apikey = "9e8e70d0bbd4184fc062a6193a25da14"

class MovieDetailsPage extends Component {
    state = {
        poster_path:null,
        release_date:null,
        overview: null,
        genres:null,
        vote_average: null,
        title: null,
    };

async componentDidMount(){
    const {moviesId} = this.props.match.params;
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${moviesId}?api_key=${Apikey}`)
    //console.log(response.data);

    this.setState({ ...response.data});
}




    render(){
        const { poster_path, overview,genres,vote_average,title, vote_count, id} = this.state;
        const baseUrl = 'https://image.tmdb.org/t/p/w500';
        const { match } = this.props;
        return(
            <div className="detailMovies">
            <button type ='submit' className="buttonBack" onClick={() => this.props.history.push('/')}>Go Back</button>
            <img
                        src={baseUrl + poster_path}
                        alt={title}
                        width="250px"
                    />
                    <h2>{title}</h2>
                    <p>{genres? genres
                      .map(genre => genre.name)
                      .join(', ')
                      .toLowerCase()
                  : null}
              </p>
              <p>
              <span>👁 {vote_count} </span>
              <span>⭐️ {vote_average} </span>
              </p>
              <p>{overview}</p>

        <div>
            <Link to = {`${match.url}/${id}/Cast`}>Cast</Link>
        </div>

        <div>
            <Link to = {`${match.url}/${id}/Reviews`}>Reviews</Link>
        </div>


        <Route
            path={`${match.path}/:movieId/Cast`}
            render={props => {
              const movieId = Number(props.match.params.movieId);

              return id === movieId ? <Cast {...props} /> : null;
            }}
          />       

        <Route
            path={`${match.path}/:movieId/Reviews`}
            render={props => {
              const movieId = Number(props.match.params.movieId);

              return id === movieId ? <Reviews {...props} /> : null;
            }}
          />
        </div>
        );
    }
}



export default withRouter(MovieDetailsPage);
