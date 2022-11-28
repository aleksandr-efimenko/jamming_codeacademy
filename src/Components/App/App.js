import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        // { name: 'FirstName', artist: 'FirstArtist', album: 'FirstAlbum', id: 1 },
        // { name: 'SecondName', artist: 'SecondArtist', album: 'SecondAlbum', id: 2 },
        // { name: 'ThirdName', artist: 'ThirdArtist', album: 'ThirdAlbum', id: 3 },
      ],
      playlistName : 'New Playlist',
      playlistTracks : [
        // { name: 'FirstName', artist: 'FirstArtist', album: 'FirstAlbum', id: 4 },
        // { name: 'SecondName', artist: 'SecondArtist', album: 'SecondAlbum', id: 5 },
        // { name: 'ThirdName', artist: 'ThirdArtist', album: 'ThirdAlbum', id: 6 },
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
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
  updatePlaylistName(newName) {
    this.setState({ playlistName: newName });
  }
  savePlaylist () {
    const playlistUris = this.state.playlistTracks.map(el => el.uri);
    console.log(playlistUris);
    Spotify.savePlaylist(this.state.playlistName, playlistUris);
  }
  search(term) {
    Spotify.search(term).then(searchRes => {
      this.setState({searchResults : searchRes});
    });
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults 
              onAdd={this.addTrack}
              searchResults={this.state.searchResults} 
              />
            <Playlist 
              onNameChange={this.updatePlaylistName}
              onRemove={this.removeTrack}
              playlistTracks={this.state.playlistTracks} 
              playlistName={this.state.playlistName} 
              onSave={this.savePlaylist}Ô
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
