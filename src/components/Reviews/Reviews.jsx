import axios from 'axios';
import { Component } from 'react';
//import PropTypes from 'prop-types';



const Apikey = "9e8e70d0bbd4184fc062a6193a25da14"

class Reviews extends Component {
    state = { reviews:[] };


async componentDidMount(){
    const {moviesId} = this.props.match.params;
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${moviesId}/reviews?api_key=${Apikey}`)
    //console.log(moviesId);

    this.setState({ reviews: response.data.results });
}


    render(){
    
    const {reviews} = this.state;

    return (
        <ul> 
            {reviews.length > 0
    ? reviews.map(({ author, content, id}) => (
        <li key = {id}>
            
            <h4>{author}</h4>
            <p>{content}</p>
        </li>
        ))
        : "We don't have any review for this movie so far"}
    </ul>
    )
}
}

export default Reviews;



// const {reviews} = this.state;

    //     return (
    //         <ul> 
    //             {reviews.length > 0 
    //         ? reviews.map(({ author, content, id}) => (
                
    //             <li key = {id}>
    //             <h5>Autor: {author}</h5>
    //             <p>{content}</p>
    //         </li>
    //     ))
    //         : "We don't have any review for this movie so far"}
    //     </ul>
    //     );
    // }  

