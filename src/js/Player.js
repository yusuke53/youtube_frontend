import React from 'react';
import '../css/player.css';

class Player extends React.Component{
    componentDidMount() {
        var xhttp = new XMLHttpRequest();
        var self = this;

        xhttp.onreadystatechange = function(e){
            console.log(this);
            if (xhttp.readyState === 4 && xhttp.status === 200){
                let response = JSON.parse(this.responseText);
                console.log(response)
                // let thumbnails = getThumbnailAll(response);
                // let titles = getTitleAll(response);
                // let wordHitCounts = getwordHitCountAll(response);
                // console.log(thumbnails);
                // console.log(titles);
                // console.log(wordHitCounts);
                // let all = []
                // for(var i=0; i<thumbnails.length; i++){
                //     all.push([thumbnails[i], titles[i], wordHitCounts[i]])
                // }
                // console.log(all)
                // self.setState({
                //     thumbnails: thumbnails,
                //     titles : titles,
                //     wordHitCounts : wordHitCounts,
                //     all : all
                // })
            }
        }
         let videoId = this.props.videoId
        let vocab = this.props.vocab
        xhttp.open("GET", "https://rakutenmafia.azurewebsites.net/api/subtitle/matches?v=" + videoId + "&k="  + vocab, true);
        xhttp.send();
    }
    render(){
        return(
            <div className={"player"}>
                <div className="header">
                    <h1 className="text-center">Find Words On Youtube!</h1>
                    <p className="text-center">ユーチューブでたんごをさがそう!</p>
                    <p className="text-center"><a href="/" className="btn btn-success">Home ほーむ</a></p>
                </div>
                <aside className="col-xs-4">
                    <h3>List of texts that have : keyword</h3>
                    <ul>
                        <li>data1</li>
                        <li>data2</li>
                        <li>data3</li>
                    </ul>
                    <button className="SearchResults" onClick = {() => this.props.changePage('SearchResults')}>
                        SearchResults
                    </button>
                    <button className="Player" onClick = {() => this.props.changePage('Player')}>
                        Player
                    </button>
                </aside>
                <div className="main col-xs-8">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/fTwAz1JC4yI" frameBorder="0"
                            allow="autoplay; encrypted-media" allowFullScreen></iframe>
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
