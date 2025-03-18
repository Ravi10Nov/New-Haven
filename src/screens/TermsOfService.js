import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../components/footer';
import NavbarComp from '../components/navbar';

export default function TermsOfService() {
    return (
        <div id="Top">
            <NavbarComp />
            <Container className='terms' style={{ padding: 15 }}>
                <div >
                    <p
                        id='welcome'
                        style={{ textAlign: 'center', fontWeight: 'Extra Bold' }}>
                        Terms of Service
                    </p>
                </div>

                <p id='paragraphStyle' className="p_text">
                    {' '}
                    By using this website and its content, materials, and services you hereby agree to the terms and conditions set forth below (this “Agreement”). For purposes of this Agreement, the terms “you” and “your” refer to the individual user of this site or, if the user is using this site on behalf of an entity, the terms “you” and “your” include the user and that entity. Do not use this website if you disagree with any of the terms or conditions below.  The Spirit of Truth Native American Church reserves the right to change this Agreement at any time, so please check for changes to this Agreement every time you use this site. Your continued use of this site following any changes to this Agreement means that you accept those changes.
                </p>

                <p id='paragraphStyle' className="p_text">
                    {' '}
                    This site is owned and operated by the Spirit of Truth Native American Church, a Missouri non-profit church corporation, with its principal offices in Ava, Missouri, U.S.A. (“we”, “us”, or a similar term). All material found at this site (including all content, visuals, audio, text, icons, displays, media, processes, information, and so forth) is owned or licensed by us except for your identification card and personal certificates. Unless otherwise indicated, you may only view, download, and print materials from this site for your own personal, noncommercial use (including such use in connection with any ministry you have in the Spirit of Truth Native American Church (“Church”)). In this regard, materials may not be posted from this site to another computer network or website without our prior written permission.
                </p>

                <p id='paragraphStyle' className="p_text">
                    {' '}
                    In addition, any other use of information or materials found on this website is not permitted without our prior written permission. In any case, you may not use this site or information found at this site for commercial purposes or to sell or promote products or services, or to solicit clients.
                </p>

                <p id='paragraphStyle' className="p_text">
                    {' '}
                    The Spirit of Truth Native American Church reserves the sole discretion and right to deny, revoke, and limit the use of this site and the reproduction or use of any material available through any portion of this site. Furthermore, you acknowledge and agree that no right, title, or interest in and to this website, any linked website, or any materials on this website or any linked website is transferred to you, and all rights not expressly granted to you in writing are reserved by us.
                </p>

                <p id='paragraphStyle' className="p_text">
                    {' '}
                    You agree that you will not individually, or as part of any collective effort, submit or post information to this site that is in goes against or in violation of our Church’s Constitutional Beliefs, Ethical Code, or could be deemed harmful or offensive to other users. You agree that you will not impersonate another user or implicate another in such actions. You further agree not to: (i) use any means to access this site for any purpose, including, without limitation, for monitoring or copying any of the material on this site, or for any other purpose not expressly authorized in this Agreement, without our prior written consent; (ii) attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of this site, the server on which this site is stored, or any server, computer, or database connected to this site or any linked website; (iii) attack this site in any means including via a denial-of-service attack or a distributed denial-of-service attack; (iv) introduce any virus, trojan horse, work, logic bomb, or other material that is malicious or technologically harmful; or (v) do anything that might disrupt the flow of data to or from this site, impact the service or performance of this site, or otherwise circumvent any of the controls or usage rules that we have implemented. You understand that the result of harmful or offensive actions (and of any breach of this Agreement) immediately terminates your right to use this site and its materials, and may include legal action against you. Upon termination of your right to use this site, you must return or destroy any copies of materials from this site that you have made.
                </p>

                <p id='paragraphStyle' className="p_text">
                    {' '}
                    For your convenience, this site may contain links to websites operated by others. Such third-party websites are not maintained or controlled by us, and we are not responsible for their content. Although we have made a good-faith effort to link only to tasteful and appropriate websites, some may contain inappropriate or objectionable material. If you find such material while using a website that you accessed through a link on this site, please notify us immediately.
                </p>

                <p id='paragraphStyle' className="p_text">
                    {' '}
                    We do not control, endorse, or adopt any third-party content and we have no responsibility for the same, including, without limitation, material that may be misleading, incomplete, erroneous, offensive, indecent, or otherwise objectionable. You must evaluate and bear all risks associated with third-party content.
                </p>

                <p id='paragraphStyle' className="p_text">
                    {' '}
                    This Agreement is governed by the laws of the State of Missouri, as applied to agreements entered into and to be performed entirely within the state, without giving effect to any conflict-of-law principles. Any action you bring to enforce this Agreement or any matters related to this site must be brought in either the state or federal courts located in Douglas County, Missouri, which will have exclusive jurisdiction over any such action. You hereby consent and submit to the personal jurisdiction of such courts to litigate any such action. If any provision of this Agreement is unlawful, void, or unenforceable in whole or in part, the remaining provisions will not be affected.
                </p>

                <p id='paragraphStyle' className="p_text" style={{ fontWeight: 500 }}>
                    {' '}
                    TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, WE ARE NOT LIABLE FOR ANY DIRECT, SPECIAL, OR CONSEQUENTIAL DAMAGES, OR ANY OTHER DAMAGES OF ANY KIND, RESULTING FROM OR ARISING OUT OF YOUR USE OF, OR YOUR INABILITY TO USE, THIS SITE OR THE MATERIALS OF THIS SITE OR ANY LINKED WEBSITE, INCLUDING, BUT NOT LIMITED TO, LOST WAGES, PROPERTY DAMAGE, LOST PROFITS, BUSINESS INTERRUPTION, AND LOSS OF PROGRAMS OR OTHER DATA ON YOUR INFORMATION HANDLING SYSTEM. TO THE FULLEST EXTENT ALLOWED BY LAW, IN NO EVENT WILL OUR TOTAL LIABILITY TO YOU FOR ALL DAMAGES, LOSSES, AND CAUSES OF ACTION EXCEED THE AMOUNT PAID BY YOU, IF ANY, FOR ACCESSING THIS SITE. THE FOREGOING DOES NOT AFFECT ANY LIABILITY THAT CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
                </p>

                <p id='paragraphStyle' className="p_text" style={{ fontWeight: 500 }}>
                    {' '}
                    THIS SITE AND THE MATERIALS AT THIS SITE AND ANY LINKED WEBSITE ARE PROVIDED “AS IS” AND WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE ACCORDING TO APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, WARRANTIES OF TITLE AND IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. WE DO NOT WARRANT THAT THE FUNCTIONS OF THIS SITE OR ANY LINKED WEBSITE WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THIS SITE, ANY LINKED WEBSITE, OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE FROM VIRUSES OR OTHER HARMFUL COMPONENTS. THE FOREGOING DOES NOT AFFECT ANY WARRANTIES THAT CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
                </p>

            </Container>
            <Footer />
        </div>
    );
};

