import React from 'react';
import '../../css/searchMobile.css';

import Button from '@material-ui/core/Button';

import {
    Page,
    Switch,
    ListItem,
    Toolbar,
    List,
    // Button
} from 'react-onsenui';


import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vocab: '',
            keyword: '',
            category: '',
            formFlg: false,
            radio: "",
        };

        this.handleChangeVocab = this.handleChangeVocab.bind(this);
        this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
    }

    OnClickChange() {
        this.setState({formFlg: !this.state.formFlg, radio : 'f'})
    }

    handleChangeVocab(event) {
        this.setState({vocab: event.target.value});
    }

    handleChangeKeyword(event) {
        this.setState({keyword: event.target.value});
    }

    handleChangeCategory(event) {
        this.setState({category: event.target.category});
    }

    handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.vocab + this.state.keyword);
        event.preventDefault();
        this.loadDoc();
        this.props.changeVocab(this.state.vocab);
        this.props.changeKeyword(this.state.keyword);
        this.props.changeCategory(this.state.category);
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


    render() {
        return (


            <Page>
                <Toolbar>
                    <div
                        className="center"
                    >
                        Youtube Word Search
                    </div>
                </Toolbar>
                {/*toolbar*/}
                <div className="header col-xs-12">
                    <img src="pictures/ManaTube.png" className={"ManaTube_left"} alt={"manatubeleft"}/>
                    <h1 className="text-center"><span className={"f"}>F</span>ind <span
                        className={"w"}>W</span>ords <span className={"o"}>O</span>n <span className={"y"}>Y</span>outube!
                    </h1>
                </div>
                <div className="contents col-xs-offset-1 col-xs-10">
                    <div className="col-xs-12">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group col-xs-offset-0 col-xs-12 col-md-offset-2 col-md-8">
                                <input className="form-control" placeholder="Vocab (apple, car, etc..)" type="text"
                                       value={this.state.value} onChange={this.handleChangeVocab}/>
                            </div>

                            <div className="form-group col-xs-offset-0 col-xs-12 col-md-offset-2 col-md-8"
                                 style={{display: this.state.formFlg ? '' : 'none'}}>
                                {/*<h3>Keyword on Youtube</h3>*/}
                                {/*<input className="form-control" type="text" placeholder="e.g. katy perry" ref="keyword"/>*/}
                                <input className="form-control" placeholder="Youtube Keyword (Rakuten, etc)" type="text"
                                       value={this.state.value} onChange={this.handleChangeKeyword}/>
                            </div>
                            <div className="col-xs-offset-2 col-xs-12 col-md-offset-2 col-md-8">
                                <p className="text-center">
                                    <div className="sample">
                                        <Button variant="outlined" color="primary" type="submit" aria-label="Delete">
                                            Search けんさく
                                        </Button>
                                    </div>
                                </p>
                            </div>
                            <div className="form-group col-xs-offset-0 col-xs-12 col-md-offset-2 col-md-8">

                                <h3>Category</h3>
                                <div className="sample">
                                    <ListItem>
                                        <Switch name="s1" id="select1" value="1" checked={this.state.radio === 'a'} onChange={() => this.setState({radio: 'a', category:'10'})}/> Music
                                    </ListItem>
                                    <ListItem>
                                        <Switch name="s2" id="select2" value="2" checked={this.state.radio === 'b'} onChange={() => this.setState({radio: 'b', category:'23'})}/> Comedy
                                    </ListItem>
                                    <ListItem>
                                        <Switch name="s3" id="select3" value="3" checked={this.state.radio === 'c'} onChange={() => this.setState({radio: 'c', category:'24'})}/> Entertainment
                                    </ListItem>
                                    <ListItem>
                                        <Switch name="s4" id="select4" value="4" checked={this.state.radio === 'd'} onChange={() => this.setState({radio: 'd', category:'25'})}/> News
                                    </ListItem>
                                    <ListItem>
                                        <Switch name="s5" id="select5" value="5" checked={this.state.radio === 'e'} onChange={() => this.setState({radio: 'e', category:'28'})}/> Science & Technology
                                    </ListItem>
                                    <ListItem>
                                        <Switch name="s6" id="select6" value="6" checked={this.state.radio === 'f'} onChange={() => this.OnClickChange()}/> Keyword
                                    </ListItem>


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
                            </div>

                        </form>
                    </div>
                </div>
            </Page>


        )
    }
}

export default Search;