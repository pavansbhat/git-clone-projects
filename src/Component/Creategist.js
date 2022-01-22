import React from 'react';
import './Creategist.css';
import CodeMirror from "react-codemirror";
import "codemirror/addon/hint/show-hint";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './Buttons.css';
import fetchAxios from '../services/FetchAxios';

class Creategist extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            description: '',
            filename: '',
            content: ''
        }
    }



    handleClick = async () => {
        const { description, filename, content } = this.state;
        let files = {};
        files[filename] = { content: content };
        let obj = {
            description: description,
            public: true,
            files,
        }
        try {
            const result = await fetchAxios.postGistset(obj);
            if (result && result.status) {
                const { statusText, status } = result;
                if (status === 201 && statusText === 'Created') {
                    window.alert('Successfully created!!');
                    window.location.reload(true);
                } else {
                    alert('Oops!! Something went wrong')
                }
            }
        } catch (err) {
            console.error(err);
        }



    }

    render() {
        const { description, filename, content } = this.state;

        return (
            <div className='gist-area'>

                <input type='text' className='gist-description' name='gists-name'
                    value={description} onChange={(e) => this.setState({ description: e.target.value })}
                    placeholder='Gist description...' />

                <div className='new-gist-area'>
                    <div className='gist-name-header'>
                        <input className='gist-name' type='text'
                            name='gists-name' value={filename} onChange={(e) => this.setState({ filename: e.target.value })}
                            placeholder='Filename including extension...' />
                    </div>
                    <div>
                        <CodeMirror
                            value={content}
                            onChange={(newValue) => this.setState({ content: newValue })}
                            name='abcd'
                            options={{
                                lineNumbers: true,
                                tabSize: 2,
                                readOnly: false,
                                smartIndent: true,
                                matchBrackets: true,
                            }}
                        />
                    </div>
                    <div>
                        <div className='drop-down-button-area'>
                            <Button
                                alignRight
                                title="Create Gist"
                                id="dropdown-menu-align-right"
                                onClick={() => this.handleClick()}>
                                Create Gist
                            </Button>
                        </div>

                    </div>


                </div>





            </div>

        )
    }
}

export default Creategist;