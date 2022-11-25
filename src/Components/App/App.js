import React from 'react';
import './App.css';
// import Playlist from '../Playlist';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [
      {name: 'FirstName', artist: 'FirstArtist', album: 'FirstAlbum', id: 1},
      {name: 'SecondName', artist: 'SecondArtist', album: 'SecondAlbum', id: 2},
      {name: 'ThirdName', artist: 'ThirdArtist', album: 'ThirdAlbum', id: 3},
    ] };
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/* <!-- Add a SearchBar component --> */}
          <SearchBar />
          <div className="App-playlist">
            {/* <!-- Add a SearchResults component --> */}
            <SearchResults searchResults={this.state.searchResults} />
            {/* <!-- Add a Playlist component --> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
