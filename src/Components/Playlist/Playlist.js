import React from 'react';
import './Playlist.css'
import { TrackList } from '../TrackList/TrackList';

export class Playlist extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const defaultValue = 'New Playlist';
        return (
            <div className="Playlist">
                <input value={this.props.playlistName} />
                {/* <!-- Add a TrackList component --> */}
                <TrackList tracks={this.props.playlistTracks} />
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
}