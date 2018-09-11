import React from 'react';
import '../css/searchresults.css';

class SearchResults extends React.Component {
    render() {
        return (
            <div className={"searchresults"}>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/fTwAz1JC4yI" frameBorder="0"
                        allow="autoplay; encrypted-media" allowFullScreen></iframe>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/fTwAz1JC4yI" frameBorder="0"
                        allow="autoplay; encrypted-media" allowFullScreen></iframe>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/fTwAz1JC4yI" frameBorder="0"
                        allow="autoplay; encrypted-media" allowFullScreen></iframe>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/fTwAz1JC4yI" frameBorder="0"
                        allow="autoplay; encrypted-media" allowFullScreen></iframe>
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