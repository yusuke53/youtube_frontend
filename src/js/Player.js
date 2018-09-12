import React from 'react';
import '../css/player.css';


function getstartAll(obj) {
    var starts = [];

    for(var i=0; i<obj.length; i++){
        starts[i] = obj[i].start;
    }

    return starts;
}

function gettextAll(obj) {
    var texts = [];

    for(var i=0; i<obj.length; i++){
        texts[i] = obj[i].text;
    }

    return texts;
}

class Player extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            starts: [],
            text: [],
            dur: [],
            all: [],
        };
    }
    componentDidMount() {
        var xhttp = new XMLHttpRequest();
        var self = this;

        xhttp.onreadystatechange = function(e){
            console.log(this);
            if (xhttp.readyState === 4 && xhttp.status === 200){
                let response = JSON.parse(this.responseText);
                console.log(response);
                let starts = getstartAll(response);
                let texts = gettextAll(response);
                let all = [];
                for(var i=0; i<starts.length; i++){
                    all.push([starts[i], texts[i]])
                }
                console.log(all);
                self.setState({
                    starts: starts,
                    texts : texts,
                    all : all
                })
            }
        }
        let videoId = this.props.videoId
        let vocab = this.props.vocab
        xhttp.open("GET", "https://rakutenmafia.azurewebsites.net/api/subtitle/matches?v=" + videoId + "&k="  + vocab, true);
        xhttp.send();
    }
//     iframeapi() {
//         // 2. This code loads the IFrame Player API code asynchronously.
//         var tag = document.createElement('script');
//
//         tag.src = "https://www.youtube.com/iframe_api";
//         var firstScriptTag = document.getElementsByTagName('script')[0];
//         firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//
// // 3. This function creates an <iframe> (and YouTube player)
// //    after the API code downloads.
//         if (typeof videoId === 'undefined') var videoId = 'FlsCjmMhFmw'; //youtube rewind inseted if no videoId found
//         var player;
//
//         function onYouTubeIframeAPIReady() {
//             player = new YT.Player('player', {
//                 height: '390',
//                 width: '640',
//                 videoId: videoId,
//                 events: {
//                     'onReady': onPlayerReady
//                 }
//             });
//         }
//
// // params for new YT.Player()
// //    playerVars: {
// //        start: 25,
// //        end: 30
// //    },
//
// // 4. The API will call this function when the video player is ready.
//         function onPlayerReady(event) {
//             event.target.playVideo();
//         }
//
// //trying to load and play video
//         function onClickLoadVideo(startTime, duration) {
//             console.log("onClickLoadVideo called");
//             player.loadVideoById({
//                 'videoId': videoId,
//                 'startSeconds': start,
//                 'endSeconds': startTime + duration,
//                 'suggestedQuality': 'default'
//             });
//         }
//     }

    render(){
        return(
            <div className={"player"}>
                <div className="header">
                    <h1 className="text-center">Find Words On Youtube!</h1>
                    <p className="text-center">ユーチューブでたんごをさがそう!</p>
                    <p className="text-center"><a href="/" className="btn btn-success">Home ほーむ</a></p>
                </div>
                <aside className="col-xs-4">
                    <h3>List of texts that have : {this.props.vocab}</h3>
                    {this.state.all.map((all) => {
                        return (
                            <div>
                                <ul>
                                    <li>start:{all[0]}</li>
                                    <li>text:{all[1]}</li>
                                </ul>
                            </div>
                        )
                    })}
                    <button className="SearchResults" onClick = {() => this.props.changePage('SearchResults')}>
                        SearchResults
                    </button>
                    <button className="Player" onClick = {() => this.props.changePage('Player')}>
                        Player
                    </button>
                </aside>
                <div className="main col-xs-8">
                    <div id="player"></div>
                </div>
                {/*<script>var videoId = '[[${video.videoId}]]';</script>*/}
                {/*<script th:src="youtubeHandler.js"></script>*/}

                {/*<h2>[[${video.title}]]</h2>*/}
                {/*<h3>List of texts that have: <b>[[${keyword}]]</b></h3>*/}
                {/*<div th:each="data:${subtitleData}" className="col-xs-12">*/}
                {/*<a style="text-decoration: none;" href="#"*/}
                {/*th:onclick="'onClickLoadVideo(' + ${data.start} + ',' + ' ' + ')'">*/}
                {/*<div className="alert alert-info">*/}
                {/*[[${data.text}]]*/}
                {/*</div>*/}
                {/*</a>*/}
                {/*</div>*/}
            </div>
        )
    }
}

export default Player;