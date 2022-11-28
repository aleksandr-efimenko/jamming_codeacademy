const client_id = '0e40bb1f88d84db29b6344e08dfb7914';
const redirect_uri = 'http://localhost:3000/';
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            //Clear the parameters, allowing to grab a new access token when it expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
            window.location = accessUrl;
        }
    },
    async search(term) {
        const accessToken = Spotify.getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        );
        const jsonResponse = await response.json();
        if (!jsonResponse.tracks) {
            return [];
        }
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        })
        );

    },
    async savePlaylist(playlistName, playlistTracks) {
        if (!playlistName || !playlistTracks) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const authorization = {
            headers: { Authorization: `Bearer ${accessToken}` }
        }
        const responseObj = await fetch(`https://api.spotify.com/v1/me`, authorization);
        const responseJson = await responseObj.json();
        const myId = responseJson.id;

        const endpointSavePlaylist = `https://api.spotify.com/v1/users/${myId}/playlists`;
        const requestHeadersSavePlaylist = {
            method: 'POST',
            headers: { 
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                name: playlistName,
                public: true
            }),
        }
        const playlistCreateResponse = await fetch(endpointSavePlaylist, requestHeadersSavePlaylist)
        const playlistCreateResponseJson = await playlistCreateResponse.json();
        const playlistId = playlistCreateResponseJson.id;

        console.log(playlistId);

        const addTracksEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
        const requestHeadersAddTracks = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                uris: playlistTracks
            })
        }
        const addTracksRequest = await fetch(addTracksEndpoint, requestHeadersAddTracks);
        if(!addTracksRequest.ok) {
            console.error(await addTracksRequest.json());
        }
    }
}

export default Spotify;
