import React from 'react';
import YouTube from 'react-youtube';


class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            player: null
        }
        this.onReady = this.onReady.bind(this);
        this.onChangeVideo = this.onChangeVideo.bind(this);
        this.onPlayVideo = this.onPlayVideo.bind(this);
        this.onPauseVideo = this.onPauseVideo.bind(this);
    }

    onReady(event) {
        console.log(`YouTube Player object for videoId: "${this.state.videoId}" has been saved to state.`); // eslint-disable-line
        this.setState({player: event.target,});
    }
    onPlayVideo() {
        this.state.player.playVideo();
    }
    onPauseVideo() {
        this.state.player.pauseVideo();
    }
    onChangeVideo() {
        this.setState({
            videoId: this.props.videoId === "LS9AIOuqFL8" ? "dGt8WpOoKR4" : "da1MH2HFVL0",
        });
    }
    onClick = (event) => {
        // interact with your player using javascript methods
        if (this.player) this.player.loadVideoById('Zi_XLOBDo_Y');
    };
    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        };

        return (
            <div className={"example"}>
                <YouTube
                    videoId={this.props.videoId}
                    onReady={this.onReady}
                    opts={opts}
                />
                <button onClick={this.onPlayVideo}>Play</button>
                <button onClick={this.onPauseVideo}>Pause</button>
                <button onClick={this.onChangeVideo}>Change Video</button>
            </div>
        );
    }

    // _onReady(event) {
    //     // access to player in all event handlers via event.target
    //     event.target.playVideo();
    // }
    // _onStateChange(event){
    //     event.target.
    // }
}
export default Example;