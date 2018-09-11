import React from 'react';
import '../css/searchresults.css';

class SearchResults extends React.Component {
    render() {
        return (
            <div className={"searchresults"}>
                <div className="header">
                    <h1 className="text-center">Find Words On Youtube!</h1>
                    <p className="text-center">ユーチューブでたんごをさがそう!</p>
                    <p className="text-center"><a href="/" className="btn btn-success">Home ほーむ</a></p>
                </div>
                <div className="main">
                    <div className="row">
                        <div className="col-xs-12">
                            <a onClick={() =>this.props.changePage('Player')} >
                                <div className="col-xs-3">
                                    <iframe width="560" height="315" src="https://www.youtube.com/embed/fTwAz1JC4yI"
                                            frameBorder="0"
                                            allow="autoplay; encrypted-media" allowFullScreen></iframe>
                                </div>
                                <div className="col-xs-9">
                                    <h3>data_title</h3>
                                    <h3>含んでるワードの数：</h3>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="col-xs-3">
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/fTwAz1JC4yI"
                                        frameBorder="0"
                                        allow="autoplay; encrypted-media" allowFullScreen></iframe>
                            </div>
                            <div className="col-xs-9">
                                <h3>data_title</h3>
                                <h3>含んでるワードの数：</h3>
                            </div>
                        </div>
                    </div>
                </div>

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