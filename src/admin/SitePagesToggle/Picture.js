import React from 'react';
import './SitePagesToggle.css';
import { Button } from 'react-bootstrap';
import SitePagePictureUpload from './SitePagePictureUpload/SitePagePictureUpload'

const Picture = () => {
    return (
        <div className="Picture">
            <div className="Site_img_box" style={{ display: 'flex' }}>
                <SitePagePictureUpload />
            </div>

            <div className="videoCourse_buttons my-4">
                <Button variant="primary" className="submit_button">Submit</Button>{' '}
                <Button variant="outline" className="back_button">Back</Button>{' '}
            </div>
        </div>
    );
};

export default Picture;