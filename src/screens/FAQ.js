import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import topbar from "topbar";
import FAQ from "../assets/FAQ.png";
import Footer from "../components/footer";
import NavbarComp from "../components/navbar";
import "../css/homepage.css";
import { HashLink } from "react-router-hash-link";

export default function Home() {
  const [isLoading, setLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // });

  useEffect(() => {
    topbar.config({
      autoRun: false,
      barThickness: 3,
      barColors: {
        0: "rgba(26,  188, 156, .9)",
        ".25": "rgba(52,  152, 219, .9)",
        ".50": "rgba(241, 196, 15,  .9)",
        ".75": "rgba(230, 126, 34,  .9)",
        "1.0": "rgba(211, 84,  0,   .9)",
      },
      shadowBlur: 10,
      shadowColor: "rgba(0,   0,   0,   .6)",
    });
    topbar.show();
    (function step() {
      setTimeout(function () {
        if (topbar.progress("+.01") < 1) step();
      }, 30);
    })();
    setTimeout(() => {
      // setLoading(false);
      topbar.hide();
    }, 3000);
  });

  return (
    <div id="Top">
      {true && (
        <>
          <NavbarComp />
          <img src={FAQ} style={{ width: "100%" }} alt="" />
          <Container style={{ padding: 15 }}>
            <p
              id="welcome"
              style={{ textAlign: "center", fontWeight: "Extra Bold" }}
            >
              Frequently Asked Questions
            </p>

            <p
              id="paragraphStyle"
              style={{ fontWeight: "bold" }}
              className="p_text"
            >
              1. My work (or a government agency) is telling me I have to be
              immunized and there are no exemptions. Is that correct?{" "}
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              No, the exemption letter you receive after you are Spiritually
              Adopted should satisfy them about your legal rights. There have
              been a few cases where some employers and a specific government
              agency have tried to still deny our legal rights. After a few
              follow-up letters in all cases so far, the exemption has been
              granted. If you ever run into an issue with this, please contact
              us for greater assistance.
            </p>

            <p
              id="paragraphStyle"
              style={{ fontWeight: "bold" }}
              className="p_text"
            >
              2. Is there a cost for Adoption?{" "}
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              No, but you should read and take your covenant obligations
              seriously. All the money collected by the Spirit of Truth Native
              American Church is used for the Missions of the Church that
              include education, establishing a fund for any pending legal
              battles, purchasing Ceremonial Grounds, supporting the members of
              the Church, and so forth. We are a Church and not a business! We
              hold all of our bona fide Ceremonies and Traditional Practices as
              Sacred and do not have a paid clergy.
            </p>

            <p
              id="paragraphStyle"
              style={{ fontWeight: "bold" }}
              className="p_text"
            >
              3. After I send in my adoption form, what should I expect?{" "}
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              Once your adoption request is approved, you will receive a Welcome
              Letter, Certificate of Adoption, Exemption Letter, and access to
              the first training course material. In the Welcome Letter, you
              will receive instructions on how to proceed. The first-course
              assignments assist you in getting more of a basic understanding of
              the church.
            </p>

            <p
              id="paragraphStyle"
              style={{ fontWeight: "bold" }}
              className="p_text"
            >
              4. How is a Medicine Person different than a member?{" "}
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              The simple answer is the difference between a minister and regular
              people in the congregation. As a member, you are legally
              considered an “Indian” under the law. As such you have another
              layer of protection from government interference.
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              Now as a Medicine Person, you become a minister in the church. You
              now have the right to perform weddings and do all the other
              religious ceremonies that ministers in most other religions do.
              You also have another layer of protection under the law to perform
              our Church bona fide Ceremonies.
            </p>

            <p
              id="paragraphStyle"
              style={{ fontWeight: "bold" }}
              className="p_text"
            >
              5. I am a Natural Healer who runs a small clinic. Can I be legally
              protected by the Spirit of Truth Native American Church?{" "}
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              Yes, as you go through our Education Courses, we will train you in
              this in quite some detail. To make it brief, as a Healer you have
              to demonstrate to the government that you are sincere in your
              religious belief and are competent in what you are doing. (Not
              harming the public.) So, the first step is for you to become
              adopted and then you will want to become a Medicine Man or
              Medicine Woman before any governmental harassment occurs. (If
              governmental harassment is occurring before you do this, it is
              harder to show you are sincere in your beliefs and not just trying
              to find a loophole in the law.)
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              By becoming Adopted and becoming a Medicine Person you show the
              sincerity of belief and you can now use your Healing Modalities,
              that you have been trained in using, during your Ceremony of
              Healing.
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              Extreme example: Let’s say as a Healer you have a clinic and are
              using the Peyote Sacrament to assist people to be better and be
              healed. According to the law, you are committing a felony and
              would probably go to jail for being a drug dealer and/or
              practicing medicine without a license.
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              Once you become a Spirit of Truth Medicine Person you can legally
              use the Peyote Sacrament during your Bundle Ceremony for you and
              your family. Your religious belief system and Ceremony are
              protected under the law. You still cannot use the Peyote Sacrament
              for the public; however, once you have the necessary training and
              approval from the Spirit of Truth Native American Church you then
              could legally perform your Peyote Healing Ceremonies to the
              public.
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              The above example is the same legal position you will need as a
              Healer for essential oils, herbs, and other natural healing
              modalities. If you are following the Spirit of Truth Ethical Code
              of Conduct in the administration of Ceremonies and then some
              government agency harasses you, we can offer objective evidence of
              the sincerity of your religious beliefs. If you get harassed by a
              government agency, we suggest that you show them your
              Identification Card and inform them that you are a Medicine Man or
              Medicine Woman performing a Native American Ceremony.
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              If the government agency continues to ask questions or further
              harass you in any way, we suggest that you exercise your right to
              remain silent and politely agree to temporarily refrain from the
              religious exercise being challenged until you get legal advice
              specific to your situation.
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              If you are arrested, we suggest you immediately inform the
              arresting officers that you are going to remain silent and that
              you want to speak with an attorney. (In almost all cases the
              government officials want you to talk so they can trick or trap
              you into saying something they can use against you. They do not
              care about protecting your religious beliefs. Do not be fooled by
              their tactics and remember they are not your friends. They are at
              war with your religious belief so remain silent!)
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              Remember you can contact us at the telephone number or email on
              your Welcome Letter to discuss your options. As a member of the
              church, you will gain access to a reservoir of legal information
              that can assist you in asserting your rights to exercise your
              religious freedom. The Spirit of Truth Native American Church is
              dedicated to protecting our Healers’ rights and we would be happy
              to inform the offending agency how they are not only violating our
              legal rights but also breaking the law themselves.
            </p>

            <p
              id="paragraphStyle"
              style={{ fontWeight: "bold" }}
              className="p_text"
            >
              6. What is your policy in dealing with other religions and tribal
              organizations?{" "}
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              We try to follow the example of the Peacemaker and First, Do Good.
              We realize that other religions or tribal organizations may have
              different opinions but we stand fast to our religious beliefs.
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              Example: We have heard quite often how offensive it is that we
              allow “White Men” into our church and Ceremonies. Even when we
              have provided proof that our ancestors held the same belief, we
              have been demanded to change. We politely still hold to our
              religious convictions while respecting their right to believe how
              they choose. Our church does not believe the Creator’s truth
              should have anything to do with blood ancestry. (One does not have
              to have Jewish ancestry to be a Christian.)
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              Sadly, many times we have been attacked by uneducated individuals
              that have violated their own religious beliefs and propagated
              false materials about our church and its members. With the
              internet age upon us, this continues to grow. We choose to still
              walk the way of Yeshua and are happy to answer any sincere
              questions of those wanting to understand the truth or gain clarity
              on any subject.
            </p>

            <p
              id="paragraphStyle"
              style={{ fontWeight: "bold" }}
              className="p_text"
            >
              7. What plants can be used in a certified Native American
              Ceremony?{" "}
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              There are millions of sacred plants used by Native Americans and
              other indigenous peoples in Ceremony. According to the Spirit of
              Truth Native American Church beliefs, in your Religious Ceremony,
              you can use any part of the natural plant, animal, mineral, or
              other material that has a sacred use as long as that use does not
              harm others. This creates powerful legal protection for you as a
              Medicine Person from misguided government agents who sometimes
              overlook the law and rather than try to protect our freedoms, try
              to take them away.
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              The general rule for getting something certified is for the item
              to “First, Do Good” under normal Ceremonial use. (Read more about
              “First, Do Good” in the Ethical Code of Conduct.) An easy way for
              you to have a personal item certified by the Church is to include
              it in your Bundle Ceremony. Once we have read and approved your
              Ceremony, it will be filed and become a Certified Ceremony for
              your personal use and for sharing with all Spirit of Truth Native
              American Church Members.
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              Another way to have an item approved is to request its approval
              through the Spirit of Truth Native American Church. Simply write
              us a letter with the description of the item you want to be
              Certified and how you would be using it in Ceremony or Traditional
              Practice.
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              Example: If you discovered a new energy healing device and want to
              use it in your Healing Center, simply request its approval.
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              We are a “Living Church” that constantly adapts to new technology,
              environments, and circumstances. We ask all members to remember to
              “First, Do Good” and practice their Healing Ministry wisely.
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              Now keep in mind that just because you are sincerely practicing
              your religion, some governmental official can still take offense
              at your religion and try to prosecute you. They can make you spend
              tens or even hundreds of thousands of dollars in defending
              yourself and your legal rights. Sadly, it historically seems to be
              the practice of our government agencies to take away freedoms
              rather than defend them. We highly suggest you keep a low profile
              if you are using anything in your Ceremonies that may trigger any
              governmental prejudices. Over the next few decades, we are sure
              that there will be other laws and court cases that will continue
              to support our religion.
            </p>

            <p
              id="paragraphStyle"
              style={{ fontWeight: "bold" }}
              className="p_text"
            >
              8. Can I have my Ceremonies anywhere?{" "}
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              You will have to get permission from any landholder to use private
              land for Ceremonies. For public lands, you will have to follow the
              laws according to the freedom of assembly.
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              Example: Holding a ceremony in your house, car, or at the local
              park during assigned hours of operation is more likely to be
              legally protected, whereas forcing your way into a large corporate
              office and holding a ceremony in their foyer is trespassing.
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              Respect others and “First, Do Good”.
            </p>

            <p
              id="paragraphStyle"
              style={{ fontWeight: "bold" }}
              className="p_text"
            >
              9. Is being Adopted permanent?{" "}
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              Yes, a person can only be removed from the Spirit of Truth Native
              American Church by personal request or by the Principal Medicine
              Chief for not following the Constitution or the Ethical Code of
              Conduct of the Church. (Normal disassociation from the Spirit of
              Truth Native American Church is when a member is not following
              Ceremonial Practices or doing harm to others.) Respect the
              Ceremonies and respect others.
            </p>

            <p
              id="paragraphStyle"
              style={{ fontWeight: "bold" }}
              className="p_text"
            >
              10. How do I have a Ceremony?{" "}
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              You can attend any number of the different organized Ceremonies
              put on by the Spirit of Truth Native American Church or establish
              your own personal Ceremony. An easy Ceremony is your own personal
              Medicine Bundle Ceremony, which will be among your assignments.
              You can tailor this Ceremony to your own life and personal belief
              systems and make it simple or complex. There are numerous other
              Ceremonies and Traditional Practices that you can adapt to your
              Ceremony as well.
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              Remember to “First, Do Good” when performing Ceremonies of any
              kind. If you desire to hold your personal Ceremony with others,
              you can do so, but remember with some Sacraments you have to be
              trained and certified with that specific Sacrament before hand.
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              Example: Anyone wanting to officiate in the Sweat Lodge Ceremony
              should feel that they have been instructed by the Creator to
              perform the Ceremony, pass the training program for this Ceremony,
              and at least have attended the minimum number of Sweat Lodge
              Ceremonies conducted by a trained Medicine Person.
            </p>

            <p id="paragraphStyle" className="p_text">
              {" "}
              You will find some Ceremonies are specifically tailored to more
              specific belief systems whereas others are very general in their
              application. Train in the Ceremonies that you feel called to do
              and assist in sharing the Sacred Healing Way.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p
                id="paragraphStyle"
                style={{
                  fontSize: 32,
                  textAlign: "center",
                  display: "unset",
                  color: "#1d1c1c",
                }}
              >
                If you have unanswered questions, please email us under the 
                <HashLink className="text-blue-800" to="/ContactUs#Top"> Contact Us</HashLink> tab.{" "}
                {/* <HashLink to="/ContactUs#Top">Contact Us.</HashLink> */}
              </p>
            </div>
          </Container>
          <Footer />
        </>
      )}
      {/* {isLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            height: '90vh',
          }}>
          <img src={loader} style={{ width: 300 }} />
        </div>
      )} */}
    </div>
  );
}
