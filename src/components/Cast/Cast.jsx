import axios from 'axios';
import { Component } from 'react';
import PropTypes from 'prop-types';
import defaultImg from "../Cast/no_avatar.png";

const Apikey = "9e8e70d0bbd4184fc062a6193a25da14"

class Cast extends Component {
    state = { cast:[] };

async componentDidMount(){
    const {movieId} = this.props.match.params;
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${Apikey}`)
    //console.log(response.data.cast);

    this.setState({ cast: response.data.cast });
}


    render(){
    const {cast} = this.state;
    const baseUrl = 'https://image.tmdb.org/t/p/w154';
        return (
            <ul> 
            {cast.map(({ name,character,id, profile_path}) => (
            <li key = {id}>
                <img
                    src={profile_path ? baseUrl+profile_path : defaultImg }
                    alt ={name}
                    width = "120"/>
                <p>{name}</p>
                <p>{character}</p>
            </li>
            ))}
        </ul>
        )
    }
}

Cast.propTypes = {
    name: PropTypes.string,
    profile_path: PropTypes.string,
    character: PropTypes.string,
    credit_id: PropTypes.number,
    id: PropTypes.number,
  };


export default Cast;