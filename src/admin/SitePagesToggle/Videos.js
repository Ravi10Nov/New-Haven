import React from 'react';
import { Button } from 'react-bootstrap';
import './SitePagesToggle.css';

const Videos = () => {
    return (
        <div className="Videos">
            <div className="video_box pt-4">
                <span className="material-icons-outlined">
                    add
                </span>
                <p>Add Video</p>
            </div>

            <div className="videoCourse_buttons my-4">
                <Button variant="primary" className="submit_button">Submit</Button>{' '}
                <Button variant="outline" className="back_button">Back</Button>{' '}
            </div>
        </div>
    );
};

export default Videos;