import React from 'react';
import mark from '../../assets/mark.png';
import './Print.css';

const Print = React.forwardRef((props, ref) => {
    return (
        <div className="mt-5" ref={ref}>

            <div className='certificate'>
                <div className='certificate_img'>
                    <img src={mark} alt="" />
                </div>

                <h1 className="pt-3 fw-bold fst-italic" style={{ fontFamily: 'Poppins, sans-serif' }}>Adoption Certificate</h1>
                <p style={{ fontFamily: 'Poppins, sans-serif' }}>The Council Committeee on New Membership of the Spirit of Truth Native America Church Upn recommendation and by
                    virtue of in them vested, certifuy herewith
                </p>


                <h2 className="pt-3 fw-bold fst-italic" style={{ fontFamily: 'Poppins, sans-serif' }}>Sandra 'Dancing Wolf' Davis</h2>
                <p style={{ fontFamily: 'Poppins, sans-serif' }}>Having made application for Spiritual Adoption and having made appropriate coveants qualifies In
                    every way to ve a Member of the Church in full fellowship .

                </p>

                <p style={{ fontFamily: 'Poppins, sans-serif' }}>All the right s and respinsibilities appertaining to Membership in the Church are duly given ,
                    in accordance with the guidelines set forth by the Church's Constitution,Ehtical Code of Conduct,
                    Principal Medicine Chief,appropriate Councils of the Church,andSacred Scriptures.
                </p>

                <div className='certificateSignin'>
                    <div className='signin_italic pt-4'>
                        <i className="pt-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Man Found Standing</i>
                        <hr className="w-50 mx-auto" />
                        <p style={{ fontFamily: 'Poppins, sans-serif' }}>Pricipal Medicine Chief</p>
                        <p style={{ fontFamily: 'Poppins, sans-serif' }}>Man Found Standing</p>
                    </div>
                    <div className='signin_date '>
                        <h3 className="pt-3 fw-bold fst-italic" style={{ fontFamily: 'Poppins, sans-serif' }}>Effective Date: October 2021</h3>
                        <br></br>
                        <p style={{ fontFamily: 'Poppins, sans-serif' }}>Governing Laws:UDHR(United Nations Declareation),U.S.Constitution,NAFERA(Native American
                            Free Exercise of Religion Act,1993)
                        </p>
                    </div>

                </div>
            </div>
        </div>

    );
});
export default Print;