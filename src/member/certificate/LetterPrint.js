import React from 'react';
import './LetterPrint.css';
import mark from '../../assets/mark.png'

const Print = React.forwardRef((props, ref) => {
    return (
        <div className="mt-5" ref={ref}>
            {/* <div >
                <img src={letter} alt='' />
            </div> */}

            <div className="letter">
                <div className='let_title'>
                    <div className='letter_img'>
                        <img src={mark} alt="" />
                    </div>

                    <div className="let_text">
                        <h2 style={{ fontFamily: 'Poppins, sans-serif' }}>Spirit of Truth</h2>
                        <h4 style={{ fontFamily: 'Poppins, sans-serif' }}>Native American Church</h4>
                    </div>
                </div>
                <p className="mt-3 mb-0 pb-0" style={{ fontFamily: 'Poppins, sans-serif' }}>December 22, 2021</p>
                <p style={{ fontFamily: 'Poppins, sans-serif' }}>To Whom It May Concern:</p>
                <p style={{ fontFamily: 'Poppins, sans-serif' }}>I an writing this letter on behalf of Lesley Elisabeth Treml
                    who is a member of our church and legally recognized as "Indian"
                    under the law . Our church is legally established in the state of
                    Missouri and other states with the direct authority
                    originally passed down from Leslie Fool Null who was the President of the
                    Native American Church on the Rosebud Reservation of South Dakota.If you need proof
                    of this line of authority m please contact me.
                </p>

                <p style={{ fontFamily: 'Poppins, sans-serif' }}>We have religious teachings on deverse topics,mumerous ceremonial and
                    educational opportunities that are being organized, and perhaps most
                    importantly our Constitution and the Code of Ethics that all members are
                    expected to strive to live in harmony with.All the ethics , ceremonies
                    ,and teachings are predicated on the central principle of "first do good"
                    in relation to their bodies, other people and the Earth itself.
                </p>

                <p style={{ fontFamily: 'Poppins, sans-serif' }}>As a Native American Church, we are against practices that have
                    the potential to do harm. As such the currecnt practices of
                    potentially harmful PCR swabs and immunization goes against out
                    religious beliefs.As our sacred scriptures state,we believe our bodies to
                    be the temples of our spirits,Here are just reason to support our
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam, doloremque aliquam alias ad quas magni adipisci voluptatem iste quam tempore, iusto mollitia unde necessitatibus voluptate animi ducimus, ea dicta natus.
                </p>

                <p className="let_POBox" style={{ fontFamily: 'Poppins, sans-serif' }}>P.O. Box 2045 Ava, MO 65608</p>
            </div>
        </div>


    );
});
export default Print;