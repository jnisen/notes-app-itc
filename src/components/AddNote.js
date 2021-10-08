import React from 'react'

class AddNote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            body: '',
            title: ''
        }; //[textArea, setTextArea] = useState(')
        this.handleChangeTextArea = this.handleChangeTextArea.bind(this)
        this.handleChangeTitle = this.handleChangeTitle.bind(this)
    }

    handleChangeTitle(e) {
        this.setState({ title: e.target.value })
    }

    handleChangeTextArea(e) {
        this.setState({ body: e.target.value })
    }

    handleAddNote(e) {
        e.preventDefault();
        if (this.state.body.trim().length > 0) {
            const { handleAddNotes } = this.props
            handleAddNotes(this.state.body, this.state.title)
            this.setState({ body: '', title: ''})
        } else {
            this.setState({ body: '', title: ''})
        }


    }

    render() {
        return (
            <form onSubmit={(e) => this.handleAddNote(e)}>
                <div className="mt-1">
                    <input type="text" name="title" id="title" value={this.state.title} className="form-control border-0 mb-2" placeholder="Title"
                        onChange={this.handleChangeTitle} />
                    <textarea
                        id="notes"
                        cols="40"
                        rows="5"
                        placeholder="Type to add a note..."
                        className="form-control border-0"
                        value={this.state.body}
                        onChange={this.handleChangeTextArea}
                    >
                    </textarea>
                </div>
                <div className="d-flex justify-content-center mt-2">
                    <button className="save btn btn-primary">Add Note</button>
                </div>
            </form>
        )
    }
}

export default AddNote
