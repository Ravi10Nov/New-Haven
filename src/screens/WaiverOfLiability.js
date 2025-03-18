import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from '../components/footer';
import NavbarComp from '../components/navbar';
import { Link } from 'react-router-dom';

export default function WaiverOfLiability() {
    return (
        <div id="Top">
            <NavbarComp />
            <Container className='terms' style={{ padding: 15 }}>
                <div >
                    <p
                        id='welcome'
                        style={{ textAlign: 'center', fontWeight: 'Extra Bold' }}>
                        Spirit of Truth Native American Church
                    </p>
                    <p
                        id='welcome'
                        style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        Terms and Conditions and Waiver of Liability Claims
                    </p>
                </div>

                <p id='paragraphStyle' className="p_text">
                    {' '}
                    In consideration of participating in activities of the Spirit of Truth Native American Church (SoTNAC), I agree to all the information presented in these <span className='font-bold text-lg'>Terms and Conditions and Waiver of Liability Claims</span>.  I agree to comply with any and all rules and regulations communicated to me about these activities, including but not limited to:
                </p>

                <p id='paragraphStyle' style={{ fontWeight: 'bold' , fontSize: "24px" }} className="p_text">
                    1. I KNOWINGLY AND VOLUNTARILY ASSUME ALL RESPONSIBILITY FOR RISKS AND LIABILITY FOR MY PROPERTY LOSS, PERSONAL INJURY, SERIOUS INJURY OR DEATH WHICH MAY OCCUR IN CONJUNCTION WITH MY PARTICIPATION IN SOTNAC ACTIVITIES; AND I HEREBY FOREVER RELEASE, DISCHARGE AND HOLD SPIRIT OF TRUTH NATIVE AMERICAN CHURCH AND ITS AGENTS HARMLESS FROM ANY CLAIM ARISING FROM SUCH RISKS, EVEN IF ARISING FROM THE NEGLIGENCE OF SOTNAC, ITS MEMBERS, AGENTS, OR OF THIRD PARTIES. <span className='font-normal'> I, on behalf of myself and any minors for whom I am responsible, our heirs, executors, administrators and assigns, hereby waive, release, discharge, and agree not to sue Spirit of Truth Native American Church, its officers, directors, members, employees, agents, volunteers, representatives, contractors and subcontractors, sponsors, affiliates, and if applicable, owners and lessors of equipment, installations and premises used for related activities, from any and all claims for damages, injuries, losses, liabilities and expenses which I may have or which may subsequently accrue to me, relating to, resulting from or arising out of my use of SoTNAC property and/or participation in any SoTNAC programs, events, installations or activities, including any injury or damage to my mental or physical health, to my property, or to that of any other person or property.  However, if SoTNAC files a claim against me, I may file a counterclaim related to the same facts and circumstances.  I agree to indemnify, defend and hold the releases harmless from and against any and all claims by third parties for damages, injuries, losses, liabilities, and expenses relating to, resulting from or arising out of my use of SoTNAC property or activity, including any program, event or activity at other locations.  I intend that the Waiver of Liability Claims shall be construed broadly to provide a release and waiver to the maximum extent permissible under applicable law.</span>{' '}
                </p>

                <p id='paragraphStyle' className="p_text">
                    2.  I understand that children under 18 years of age can participate in SoTNAC activities only when accompanied by a parent or guardian.  If I bring a minor, I agree to the provisions contained in these Terms and Conditions and Waiver of Liability Claims on behalf of the minor.{' '}
                </p>

                <p id='paragraphStyle' className='text-black'>
                    3.  I acknowledge and understand that by participating in SoTNAC activities, I may be exposed to environments that may present risks of serious injury, permanent disability, death, property damage, economic losses, emotional or psychological disturbance, and other risks, including but not limited to, those caused by:{' '}
                </p>

                <ul className="text-black mb-1">
                    (a).  the actions, inactions or negligence of Spirit of Truth Native American Church, its agents, Members, or third parties;{' '}
                </ul>
                <ul className="text-black mb-1">
                    (b). rules and regulations regarding the activities;{' '}
                </ul>
                <ul className="text-black mb-1">
                    (c). conditions of the premises or equipment used;{' '}
                </ul>
                <ul className="text-black mb-1">
                    (d). all dangers to persons and property associated with vehicular traffic;{' '}
                </ul>
                <ul className="text-black mb-1">
                    (e). hot and cold-water temperatures in sweat lodges and immersion pools that are contraindicated for anyone who might be pregnant and might be contraindicated for people with blood pressure or other health issues;{' '}
                </ul>
                <ul className="text-black mb-1">
                    (f). infection from pools, streams, kitchen facilities or other human-impacted or natural conditions;{' '}
                </ul>
                <ul className="text-black mb-1">
                    (g). drowning in pools or natural bodies of water;{' '}
                </ul>
                <ul className="text-black mb-1">
                    (h). weather, including temperature and weather extremes, flooding, drought, high winds, earthquakes, tornados, hurricanes, and so forth;{' '}
                </ul>
                <ul className="text-black mb-1">
                    (i). streams, caves, steep terrain, bluffs, falling rocks;{' '}
                </ul>
                <ul className="text-black mb-1">
                    (j). wildfires, falling trees;{' '}
                </ul>
                <ul className="text-black mb-1">
                    (k). wild animals including biting insects, venomous spiders and snakes, bears, mountain lions, and so forth.{' '}
                </ul>

                <p id='paragraphStyle' className="p_text">
                    {' '}
                    I further acknowledge and understand that there may also be other risks both obvious and that are not obvious, known, or foreseeable at this time.
                </p>

                <p id='paragraphStyle' className='text-black'>
                    4. I understand that some SoTNAC activities may include sacramental ingestion of psychoactive naturally occurring substances that may have undesired side effects, including but not limited to:{' '}
                </p>

                <ul className="text-black mb-1">
                    (a).  nausea and vomiting;{' '}
                </ul>
                <ul className="text-black mb-1">
                    (b). mental illness episodes;{' '}
                </ul>
                <ul className="text-black mb-1">
                    (c). impaired bodily movement;{' '}
                </ul>
                <ul className="text-black mb-1">
                    (d). inability to safely drive or operate other machinery;{' '}
                </ul>

                <p id='paragraphStyle' className="p_text">
                    {' '}
                    5. Should I find that any condition or activity at SoTNAC property or events is unsafe or offensive to me or to any minors accompanying me, I acknowledge that I can avoid such condition or activity by, among other things, leaving the vicinity.  I agree not to leave SoTNAC property if I am under the influence of any psychoactive substance.
                </p>

                <p id='paragraphStyle' className="p_text">
                    {' '}
                    6. Unless I am known to be in possession of a valid health care directive to the contrary, I consent to have first aid and medical treatment that may be deemed advisable in the event I am incapacitated due to injury, accident and/or illness while on SoTNAC property or engaged in SoTNAC activities.  I release SoTNAC and all persons participating in any first aid or medical treatment from all liability for any such actions unless they are grossly negligent.
                </p>

                <p id='paragraphStyle' className="font-bold text-lg text-black">
                    {' '}
                    I ACKNOWLEDGE THAT I HAVE READ AND UNDERSTAND THESE TERMS AND CONDITIONS AND WAIVER OF LIABILITY CLAIMS.  I UNDERSTAND THAT ALONG WITH GAINING THE BENEFITS OF SOTNAC ACTIVITIES I ALSO GIVE UP SUBSTANTIAL RIGHTS, AND I DO SO KNOWINGLY AND VOLUNTARILY WITHOUT ANY COERCION OR DURESS.
                </p>

                <p id='paragraphStyle' className="text-black mt-4">
                    {' '}
                    This covers all activities of the Spirit of Truth Native American Church. 
                </p>


            </Container>
            <Footer />
        </div>
    );
};
