import { Component } from "react";


class Searchbar extends Component {
    state = {
        query: " ",
    };

handleChange = e => {
    this.setState({query: e.currentTarget.value});
    
}

hendleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.guery);
    this.setState({query: ""})
};


render(){
    return (
        <header>
            <form onSubmit ={this.hendleSubmit}>
                <button type="submit">
                    <span>Search</span>
                </button>

                <input
                    type="text"
                    onChange ={this.handleChange}
                    value ={this.state.query}
                    autoComplete ="off"
                    autoFocus
                    placeholder = "Search movie"
                />
            </form>
        </header>
        );
    }
}

export default Searchbar;