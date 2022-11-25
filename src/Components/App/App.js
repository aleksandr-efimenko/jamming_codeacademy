import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        { name: 'FirstName', artist: 'FirstArtist', album: 'FirstAlbum', id: 1 },
        { name: 'SecondName', artist: 'SecondArtist', album: 'SecondAlbum', id: 2 },
        { name: 'ThirdName', artist: 'ThirdArtist', album: 'ThirdAlbum', id: 3 },
      ],
      playlistName : 'My awesome Playlist',
      playlistTracks : [
        { name: 'FirstName', artist: 'FirstArtist', album: 'FirstAlbum', id: 1 },
        { name: 'SecondName', artist: 'SecondArtist', album: 'SecondAlbum', id: 2 },
        { name: 'ThirdName', artist: 'ThirdArtist', album: 'ThirdAlbum', id: 3 },
      ]
    };
    this.addTrack = this.addTrack.bind(this);
  }
  addTrack (track) {
    if (this.state.playlistTracks.some(el => el.id === track.id)) {
      return;
    }
    this.state.playlistTracks.push(track);
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
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
