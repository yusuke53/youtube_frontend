import React from 'react';
import Search from "./Search";
import SearchResults from "./SearchResults";
import Player from "./Player";
import '../../css/lock.css'


class AppMobile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 'Search',
            vocab: '',
            keyword: '',
            category:'',
            videoId: ''
        }
        this.changePage = this.changePage.bind(this)
        this.changeVocab = this.changeVocab.bind(this)
        this.changeKeyword = this.changeKeyword.bind(this)
        this.changeVideoId = this.changeVideoId.bind(this)
        this.changeCategory = this.changeCategory.bind(this)
    }

    changePage(page) {
        this.setState({currentPage: page})
    }

    changeCategory(category){
        this.setState({category : category})
    }

    changeVocab(vocab) {
        this.setState({vocab: vocab})
    }

    changeKeyword(keyword) {
        this.setState({keyword: keyword})
    }

    changeVideoId(videoId) {
        this.setState({videoId: videoId})
    }

    render() {
        let page = 'Search'
        if (this.state.currentPage === 'Search') {
            page = <Search
                changePage={this.changePage}
                changeVocab={this.changeVocab}
                changeKeyword={this.changeKeyword}
                changeCategory={this.changeCategory}
            />
        } else if (this.state.currentPage === 'SearchResults') {
            page = <SearchResults
                changePage={this.changePage}
                vocab={this.state.vocab}
                keyword={this.state.keyword}
                changeVideoId={this.changeVideoId}
                category={this.state.category}
            />
        } else if (this.state.currentPage === 'Player') {
            page = <Player
                changePage={this.changePage}
                videoId={this.state.videoId}
                vocab={this.state.vocab}
            />
        }
        return (
            <div className={"app"}>
                {page}
            </div>
        )
    }
}

export default AppMobile;