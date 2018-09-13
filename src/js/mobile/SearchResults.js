import React from 'react';
import '../../css/searchresults.css';
import ons from 'onsenui';
import {
    Page,
    ListItem,
    Card,
    ProgressCircular, Toolbar,
    BackButton
} from 'react-onsenui';


function getThumbnailAll(obj) {
    var thumbnails = [];

    for(var i=0; i<obj.length; i++){
        thumbnails[i] = obj[i].thumbnail;
    }

    return thumbnails;
}

function getTitleAll(obj){
    var titles = [];

    for(var i=0; i<obj.length; i++){
        titles[i] = obj[i].title;
    }

    return titles;
}
function getwordHitCountAll(obj){
    var wordHitCounts = [];

    for(var i=0; i<obj.length; i++){
        wordHitCounts[i] = obj[i].wordHitCount;
    }

    return wordHitCounts;
}
function getvideoIdAll(obj) {
    var videoIds = [];

    for(var i=0; i<obj.length; i++){
        videoIds[i] = obj[i].videoId;
    }

    return videoIds;
}

const imageStyle ={
    width : "90%",
}

class SearchResults extends React.Component {
    constructor(props){
        super(props)
         const isIOS = ons.platform.isIOS();
        this.state = {
            thumbnails: [],
            titles : [],
            wordHitCounts : [],
            videoIds : [],
            all : [],
            loading : true,
            width: window.innerWidth,
              height: isIOS ? '' : '100%',
              scrolling: isIOS ? 'no' : 'yes',
        };
        this.backPage = this.backPage.bind(this)
    }

    componentDidMount() {
        var xhttp = new XMLHttpRequest();
        var self = this;

        xhttp.onreadystatechange = function(e){
            console.log(this);
            if (xhttp.readyState === 4 && xhttp.status === 200){
                console.log(this.responseText);

                let response = JSON.parse(this.responseText);
                console.log(response.length);
                let thumbnails = getThumbnailAll(response);
                let titles = getTitleAll(response);
                let wordHitCounts = getwordHitCountAll(response);
                let videoIds = getvideoIdAll(response)
                // console.log(thumbnails);
                // console.log(titles);
                // console.log(wordHitCounts);
                let all = []
                for(var i=0; i<thumbnails.length; i++){
                    all.push([thumbnails[i], titles[i], wordHitCounts[i], videoIds[i]])
                }
                console.log(all)
                self.setState({
                    thumbnails: thumbnails,
                    titles : titles,
                    wordHitCounts : wordHitCounts,
                    videoIds : videoIds,
                    all : all,
                    loading : false
                })
            }
        }
        let vocab = this.props.vocab;
        let keyword = this.props.keyword;
        xhttp.open("GET", "https://manatube.azurewebsites.net/api/search?q=" + keyword + "&k=" + vocab, true);
        xhttp.send();
    }

    sendVideoId(videoId){
        this.props.changeVideoId(videoId)
        this.props.changePage('Player')
    }

    backPage(){
        this.props.changePage('Search')
    }


    render() {
        const { loading } = this.state;
        if (loading) return(
            <div>
                <Page>
                    <Toolbar>
                        <div
                            className="center"
                        >
                            Search Results
                        </div>
                        <div
                            className="left"
                        >
                            <BackButton onClick={() => {this.props.changePage('Search')}}>

                            </BackButton>
                        </div>
                    </Toolbar>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                        <ProgressCircular indeterminate />
                    </div>
                </Page>
            </div>
        )
        return (
            <div className={"searchresults"}>
                <Page>
                    <Toolbar>
                        <div
                            className="center"
                        >
                            Search Results
                        </div>
                        <div
                            className="left"
                        >
                            <BackButton onClick={() => {this.props.changePage('Search')}}>
                            </BackButton>
                        </div>
                    </Toolbar>
                    <div className="header">
                    </div>
                    <div className="main">
                        {this.state.all.map((all) => {
                            return (
                                <div className="row">
                                    <div className="col-xs-11">
                                        <a onClick={() => this.sendVideoId(all[3])}>
                                            <Card>
                                                <ListItem>
                                                    <img src={all[0]} style={imageStyle} alt={"imagedisp"}></img>
                                                </ListItem>
                                            </Card>
                                            <ListItem>
                                                <div className="col-xs-9">
                                                    <h3>{all[1]}</h3>
                                                    <h3>含んでるワードの数：{all[2]}</h3>
                                                </div>
                                            </ListItem>
                                        </a>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Page>
            </div>
        )
    }
}

export default SearchResults;