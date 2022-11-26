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
        { name: 'FirstName', artist: 'FirstArtist', album: 'FirstAlbum', id: 4 },
        { name: 'SecondName', artist: 'SecondArtist', album: 'SecondAlbum', id: 5 },
        { name: 'ThirdName', artist: 'ThirdArtist', album: 'ThirdAlbum', id: 6 },
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  addTrack (track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    this.state.playlistTracks.push(track);
    this.setState({playlistTracks: this.state.playlistTracks});
  }
  removeTrack (track) {
    const newList = this.state.playlistTracks
      .filter(trackItem => trackItem.id !== track.id);
    this.setState( {playlistTracks: newList });
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults 
              onAdd={this.addTrack}
              searchResults={this.state.searchResults} 
              />
            <Playlist 
              onRemove={this.removeTrack}
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
