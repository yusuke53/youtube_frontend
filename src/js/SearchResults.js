import React from 'react';
import '../css/searchresults.css';

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


class SearchResults extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            thumbnails: [],
            titles : [],
            wordHitCounts : [],
            all : []
        };
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
                // console.log(thumbnails);
                // console.log(titles);
                // console.log(wordHitCounts);
                let all = []
                for(var i=0; i<thumbnails.length; i++){
                    all.push([thumbnails[i], titles[i], wordHitCounts[i]])
                }
                console.log(all)
                self.setState({
                    thumbnails: thumbnails,
                    titles : titles,
                    wordHitCounts : wordHitCounts,
                    all : all
                })
            }
        }
        let vocab = this.props.vocab;
        let keyword = this.props.keyword;
        xhttp.open("GET", "https://rakutenmafia.azurewebsites.net/api/search?q=" + keyword + "&k=" + vocab, true);
        xhttp.send();
    }

    render() {
        return (
            <div className={"searchresults"}>
                {this.state.all.map((all) => {
                    return <iframe width="560" height="315" src={all[0]} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                    {/*<li>{all[0]} {all[1]} {all[2]}</li>;*/}
                })}

                <div className="header">
                    <h1 className="text-center">Find Words On Youtube!</h1>
                    <p className="text-center">ユーチューブでたんごをさがそう!</p>
                    <p className="text-center"><a href="/" className="btn btn-success">Home ほーむ</a></p>
                </div>
                <div className="main">
                    {/*{this.state.all.map((all) => {*/}
                        {/*return*/}
                        {/*<div className="row">*/}
                            {/*<div className="col-xs-12">*/}
                                {/*/!*<a onClick={() => this.props.changePage('Player')}>*!/*/}
                                    {/*<div className="col-xs-3">*/}
                                        {/*<iframe width="560" height="315" src={all[0]}*/}
                                                {/*frameBorder="0"*/}
                                                {/*allow="autoplay; encrypted-media" allowFullScreen></iframe>*/}
                                    {/*</div>*/}
                                    {/*<div className="col-xs-9">*/}
                                        {/*<h3>{all[1]}</h3>*/}
                                        {/*<h3>含んでるワードの数：{all[2]}</h3>*/}
                                    {/*</div>*/}
                                {/*/!*</a>*!/*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*})}*/}
                </div>
                {this.state.a}
                <button className="SearchResults" onClick = {() => this.props.changePage('SearchResults')}>
                    SearchResults
                </button>
                <button className="Player" onClick = {() => this.props.changePage('Player')}>
                    Player
                </button>
            </div>
        )
    }
}

export default SearchResults;