import React from 'react';
import './Playlist.css'
import { TrackList } from '../TrackList/TrackList';

export class Playlist extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="Playlist">
                <input 
                    value={this.props.playlistName} 
                    defaultValue={ 'New Playlist' } 
                />
                <TrackList
                    onRemove={this.props.onRemove}
                    isRemoval={true}
                    tracks={this.props.playlistTracks} />
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
}