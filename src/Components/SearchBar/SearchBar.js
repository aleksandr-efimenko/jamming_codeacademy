import React from "react";
import './SearchBar.css';

export class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleEnterPress = this.handleEnterPress.bind(this);
        this.state = {term : null}
    }   
    search() {
        if(!this.state.term) {
            return;
        }
        this.props.onSearch(this.state.term);
    }
    handleEnterPress(e) {
        if(e.key === 'Enter') {
            this.search();
        }
    }
    handleTermChange(e) {
        this.setState({term: e.target.value});
    }
    render() {
        return (
            <div className="SearchBar">
                <input 
                    onKeyDown={this.handleEnterPress}
                    onChange={this.handleTermChange}
                    placeholder="Enter A Song, Album, or Artist" />
                <button 
                    onClick={this.search}
                    className="SearchButton"
                >SEARCH</button>
            </div>
        );
    }
}

