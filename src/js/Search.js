import React from 'react';
import '../css/search.css';

import Button from '@material-ui/core/Button';
import {Transition, animated} from 'react-spring';

const pages = [
    style => <animated.div style={{...style, background: '#A8A8A8', opacity: 0.5}}>Entertainment</animated.div>,
    style => <animated.div style={{...style, background: '#A8A8A8', opacity: 0.5}}>Music</animated.div>,
    style => <animated.div style={{...style, background: '#A8A8A8', opacity: 0.5}}>Comedy</animated.div>,
    style => <animated.div style={{...style, background: '#A8A8A8', opacity: 0.5}}>News</animated.div>,
    style => <animated.div style={{...style, background: '#A8A8A8', opacity: 0.5}}>Science & Technology</animated.div>,
    style => <animated.div style={{...style, background: '#A8A8A8', opacity: 0.5}}>Trailers</animated.div>,
]

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vocab: '',
            keyword: '',
            formFlg: false,
            index: '',
        };

        this.handleChangeVocab = this.handleChangeVocab.bind(this);
        this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    OnClickChange() {
        this.setState({formFlg: !this.state.formFlg})
    }

    handleChangeVocab(event) {
        this.setState({vocab: event.target.value});
    }

    handleChangeKeyword(event) {
        this.setState({keyword: event.target.value});
    }

    handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.vocab + this.state.keyword);
        event.preventDefault();
        this.loadDoc();
        this.props.changeVocab(this.state.vocab);
        this.props.changeKeyword(this.state.keyword);
        this.props.changePage('SearchResults')
    }

    loadDoc() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                console.log(this.responseText);
            }
        };
        let vocab = this.state.vocab;
        let keyword = this.state.keyword;
        // 逆にしてる
        xhttp.open("GET", "https://manatube.azurewebsites.net/api/search?q=" + keyword + "&k=" + vocab, true);
        xhttp.send();
    }

    toggle = e => this.setState(state => ({ index: 0 }))
    toggle2 = e => this.setState(state => ({ index: 1 }))
    toggle3 = e => this.setState(state => ({ index: 2 }))
    toggle4 = e => this.setState(state => ({ index: 3 }))
    toggle5 = e => this.setState(state => ({ index: 4 }))
    toggle6 = e => this.setState(state => ({ index: 5 }))

    render() {
        return (
            <div className={"search"}>

                <div className="main">
                <Transition
                    native
                    from={{opacity: 0, transform: 'translate3d(100%,0,0)'}}
                    enter={{opacity: 1, transform: 'translate3d(0%,0,0)'}}
                    leave={{opacity: 0, transform: 'translate3d(-50%,0,0)'}}>
                    {pages[this.state.index]}
                </Transition>

                </div>


                    <div className="header col-xs-12">


                        <img src="pictures/ManaTube.png" className={"ManaTube_left"} alt={"manatubeleft"}/>
                        <h1 className="text-center"><span className={"f"}>F</span>ind <span
                            className={"w"}>W</span>ords <span className={"o"}>O</span>n <span className={"y"}>Y</span>outube!
                        </h1>
                        <img src="pictures/ManaTube.png" className={"ManaTube_right"} alt={"manatuberight"}/>

                        <p className="text-center2">Let's find your words☺</p>
                    </div>
                    <div className="contents col-xs-offset-1 col-xs-10">
                        <div className="col-xs-12">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group col-xs-offset-0 col-xs-12 col-md-offset-2 col-md-8">

                                    <h3>Searching Vocab</h3>

                                    <input className="form-control" placeholder="e.g. this" type="text"
                                           value={this.state.value} onChange={this.handleChangeVocab}/>
                                </div>

                                <div className="form-group col-xs-offset-0 col-xs-12 col-md-offset-2 col-md-8">
                                    <h3>Keyword on Youtube</h3>
                                    {/*<input className="form-control" type="text" placeholder="e.g. katy perry" ref="keyword"/>*/}
                                    <input className="form-control" placeholder="e.g. this" type="text"
                                           value={this.state.value} onChange={this.handleChangeKeyword}/>

                                </div>

                                <div className="form-group col-xs-offset-0 col-xs-12 col-md-offset-2 col-md-8">
                                    <h3>Category</h3>
                                    <div className="sample">
                                        <input type="radio" name="s1" id="select1" value="1" checked="checked"/>
                                        <label htmlFor="select1" onClick={this.toggle}>Entertainment</label>
                                        <input type="radio" name="s2" id="select2" value="2"/>
                                        <label htmlFor="select2" onClick={this.toggle2}>Music</label>
                                        <input type="radio" name="s3" id="select3" value="3"/>
                                        <label htmlFor="select3" onClick={this.toggle3}>Comedy</label>
                                        <input type="radio" name="s4" id="select4" value="4"/>
                                        <label htmlFor="select4" onClick={this.toggle4}>Science & Technology</label>
                                        <input type="radio" name="s5" id="select5" value="5"/>
                                        <label htmlFor="select5" onClick={this.toggle5}>Trailers</label>
                                        <input type="radio" name="s6" id="select6" value="6"
                                               onClick={() => this.OnClickChange()}/>
                                        <label htmlFor="select6" onClick={this.toggle6}>Keyword</label>
                                    </div>
                                </div>

                                <div className="form-group col-xs-offset-0 col-xs-12 col-md-offset-2 col-md-8"
                                     style={{display: this.state.formFlg ? '' : 'none'}}>
                                    <h3>Keyword on Youtube</h3>
                                    {/*<input className="form-control" type="text" placeholder="e.g. katy perry" ref="keyword"/>*/}
                                    <input className="form-control" placeholder="e.g. this" type="text"
                                           value={this.state.value} onChange={this.handleChangeKeyword}/>
                                </div>
                                <div className="col-xs-offset-0 col-xs-12 col-md-offset-2 col-md-8">
                                    {/*<button type="submit" className="btn btn-success btn-block">Search けんさく</button>*/}
                                    <h1 className="text-center">
                                        <Button color="primary" type="submit" variant="extendedFab" aria-label="Delete">
                                            Search けんさく
                                        </Button>
                                    </h1>
                                </div>
                            </form>
                        </div>
                    </div>
            </div>

        )
    }
}

export default Search;