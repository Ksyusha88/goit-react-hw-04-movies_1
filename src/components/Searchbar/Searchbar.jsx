import { Component } from "react";
import "./style.scss";


class Searchbar extends Component {
    state = {
        query: "",
    };

handleChange = e => {
    this.setState({query: e.currentTarget.value});
    
}

hendleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({query: ""})
};


render(){
    return (
        <header className="Searchbar">
            <form onSubmit ={this.hendleSubmit} className="SearchForm">
                <button type="submit" className="SearchForm_button">
                    <span className="SearchForm_button_label">Search</span>
                </button>

                <input
                    className="SearchForm_input"
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