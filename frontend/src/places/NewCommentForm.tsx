import { ChangeEvent, useContext, useState } from "react"
import { CurrentUser } from '../contexts/CurrentUser'
import React from "react"

function NewCommentForm({ place, onSubmit }: any) {

    const { currentUser }: any = useContext(CurrentUser)

    const [comment, setComment]: any = useState({
        content: '',
        stars: 3,
        rant: false,
    })

    function handleSubmit(event: { preventDefault: () => void }) {
        event.preventDefault()
        onSubmit(comment)
        setComment({
            content: '',
            stars: 3,
            rant: false
        })
    }

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setComment({
            ...comment,
            rant: e.target.checked, // Update the 'rant' value based on checkbox state
        });
    };

    if (!currentUser) {
        return <p>You must be logged in to leave a rant or rave.</p>
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="form-group col-sm-12">
                    <label htmlFor="content">Content</label>
                    <textarea
                        required
                        value={comment.content}
                        onChange={event => setComment({ ...comment, content: event.target.value })}
                        className="form-control"
                        id="content"
                        name="content"
                    />
                </div>
            </div>
            <div className="row">
                <div className="form-group col-sm-4">
                    <label htmlFor="stars">Star Rating</label>
                    <input
                        value={comment.stars}
                        onChange={e => setComment({ ...comment, stars: e.target.value })}
                        type="range"
                        step="0.5"
                        min="1"
                        max="5"
                        id="stars"
                        name="stars"
                        className="form-control"
                    />
                </div>
                <div className="form-group col-sm-4">
                    <label htmlFor="rand">Rant</label>
                    <input
                        checked={place.rant}
                        onChange={handleCheckboxChange}
                        type="checkbox"
                        id="rant"
                        name="rant"
                        className="form-control"
                    />
                </div>
            </div>
            <input className="btn btn-primary" type="submit" value="Add Comment" />
        </form>
    )
}

export default NewCommentForm