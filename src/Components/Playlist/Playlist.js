import React from 'react';
import './Playlist.css'

export class Playlist extends React.Component {
    constructor(props) {
        super(this.props);
        this.props = {defaultValue: 'New Playlist'};
    }
    render() {
        return (
            <div className="Playlist">
                <input value={this.props.defaultValue} />
                {/* <!-- Add a TrackList component --> */}
                {/* <TrackList /> */}
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
}