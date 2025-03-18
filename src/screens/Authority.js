// import { ArrowBack, ArrowForward } from '@material-ui/icons'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React, { useEffect, useState } from "react";
import { Button, Carousel, Container, Modal } from "react-bootstrap";
import topbar from "topbar";
import AuthorityImg from "../assets/Authority.png";
import Footer from "../components/footer";
import NavbarComp from "../components/navbar";
import "../css/RiseofMedical.css";
import foolBullBlssing from "../assets/pdfs/Fool Bull Blessing.pdf";
import jamesMooneyBlessing from "../assets/pdfs/James Mooney Blessing - March 17, 2009.pdf";
import officialPermession from "../assets/pdfs/Official Permission.pdf";
import richardSwallowBlessing from "../assets/pdfs/Richard Swallow Blessing - 08-19-2007.pdf";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function Authority() {
  const [showfirst, setShowfirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);
  const [showfourth, setShowfourth] = useState(false);
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
      <Modal
        show={showfirst}
        size="xl"
        onHide={() => setShowfirst(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body
          className={" flex flex-col items-center justify-center w-auto"}
          style={{ padding: 10 }}
        >
          <Document
            file={foolBullBlssing}
            onLoadError={(error) => {
              console.log(error);
            }}
          >
            <Page pageNumber={1} />
          </Document>
        </Modal.Body>
      </Modal>

      <Modal
        show={showSecond}
        onHide={() => setShowSecond(false)}
        backdrop="static"
        size="xl"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body
          className={" flex flex-col items-center justify-center w-auto"}
          style={{ padding: 10 }}
        >
          <Document
            file={richardSwallowBlessing}
            onLoadError={(error) => {
              console.log(error);
            }}
          >
            <Page pageNumber={1} />
          </Document>
        </Modal.Body>
      </Modal>

      <Modal
        show={showThird}
        size="xl"
        onHide={() => setShowThird(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body
          className={" flex flex-col items-center justify-center container"}
          style={{ padding: 10 }}
        >
          <Document
            file={jamesMooneyBlessing}
            onLoadError={(error) => {
              console.log(error);
            }}
          >
            <Page pageNumber={1} />
          </Document>
        </Modal.Body>
      </Modal>

      <Modal
        show={showfourth}
        size="xl"
        onHide={() => setShowfourth(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body
          className={" flex flex-col items-center justify-center container"}
          style={{ padding: 10 }}
        >
          <Document
            file={officialPermession}
            onLoadError={(error) => {
              console.log(error);
            }}
          >
            <Page pageNumber={1} />
          </Document>
        </Modal.Body>
      </Modal>
      {true && (
        <>
          <NavbarComp />
          <div>
            <img src={AuthorityImg} style={{ width: "100%" }} alt="" />
          </div>
          <Container style={{ padding: 15 }}>
            <p id="RiseOfMedicalText" style={{ textAlign: "left" }}>
              Establishment of Authority
            </p>

            <p id="paragraphStyle" className="p_text">
              Even though we believe in our inalienable rights as children of
              the Creator and followers of{" "}
              <a target="_blank" href="/Yeshua">
                Yeshua
              </a>
              , we also recognize that we live in a world with different
              countries that have established their laws that we choose to
              respect and uphold. The United States of America has established
              Freedom of Religion, but sadly in court often the government will
              not uphold an individual’s religious views. (For example, the
              honorable Judge Benjamin Zvenia said that he has never seen the
              religious exemption defense win in court over the charge of
              practicing medicine without a license unless that religious
              exemption also had the established authority from a Native
              American Church.) Also, the world courts will not grant full
              protection over your beliefs if the rights to those beliefs have
              not been established.{" "}
            </p>

            <p id="paragraphStyle" className="p_text">
              In the United States of America, the law (AIRFA, NAFERA, RFRA, and
              so forth) dictates what may be expressed as a Traditional
              Organization, Band, or Native American Tribe. These laws are the
              rules that we must follow and therefore have established the
              Spirit of Truth Native American Church within these rules.{" "}
            </p>

            <p id="paragraphStyle" className="p_text">
              The word 'Tribe' is a legal word used by the conquering US
              Government to legally describe those Native Americans that have
              treaties with the USA and were allowed to live on a 'reservation'.
              The Law of the Land uses the word 'reservation' as a way to
              establish Government Trusts, Allotments, Hunting Rights, Living
              Areas, and so forth. Under the Law, the word 'Tribe' does not
              legally apply to the Spirit of Truth Native American Church, so we
              do not use that legal word to describe our organization. Now the
              words "Lodge" or "Band" are used more by the Native American
              Peoples than the Conquering Government so we can easily apply
              these words to the Spirit of Truth Native American Church.
            </p>

            <p id="paragraphStyle" className="p_text">
              The Conquering Government rule allowed many people to conspire to
              deny the Native Americans their God-given and civil liberties. The
              Wounded Knee Massacre in 1890 culminated with the Conquering
              Government's “extermination” agenda and was the last directly
              sanctioned murder of the members of the Native American Religion.
              Because of this atrocity and the political opinion associated with
              it, the Conquering Government changed to a softer agenda that
              targeted the “cultural genocide” of the Native Americans by
              expanding the Native American reeducation{" "}
              <a
                href="/Federal Indian Boarding School Investigation.pdf"
                target="_blank"
              >
                boarding school program{" "}
              </a>{" "}
              and that forcibly took Native American children from their
              families. (This is now considered Ethnic Cleansing according to
              World Law.){" "}
            </p>

            <p id="paragraphStyle" className="p_text">
              Because of these atrocities, the Native American Church went
              “underground” for almost three decades. In 1918 persecution once
              again became mainstream when the Bureau of Indian Affairs
              petitioned Congress to outlaw the Native American Culture.
              Luckily, for the Native Americans and their religious beliefs,
              there was some wisdom by the people in the Senate and the bill was
              defeated. This then lead a group of inspired individuals to use
              the Conquering Government’s legal system to try to protect the
              Native American religious culture from future harassment.
            </p>

            <p id="paragraphStyle" className="p_text">
              Because of the wisdom of our Ancestors, in 1918 the first legally
              established Native American Church was successfully recognized and
              established. This then leads to other independent Native American
              Churches being formed in the surrounding counties, including the
              Lakota Sioux Rosebud Reservation on July 26, 1924. Over the last
              century, there have been more legal actions to further assist in
              establishing the rights of the Native American religion.
            </p>

            <p id="paragraphStyle" className="p_text">
              Under the law, the Native American Church is a Traditional
              Organization. As a Traditional Organization, its members and
              ministers still cannot take advantage of the Government Trusts,
              Allotments, Hunting Rights, Living Areas, and so forth, but they
              can use other points in the law to practice their religion. Like
              most religions, the Native American Church includes many
              individuals from all different ethnic backgrounds, not just those
              comprised of government-recognized tribes. (For example, in 1969
              Andrew Scott from Parks, Arizona wrote about his Native American
              Church membership stating, “. . . We have a membership of
              approximately one hundred and twenty people of which 60% are
              Indian, 20% part Indian, and 20% non-Indians . . .”){" "}
            </p>

            <p id="paragraphStyle" className="p_text">
              The Spirit of Truth Native American Church has a direct
              establishment of Authority from the Rosebud Native American
              Church. Our ministers, therefore, have both the Spiritual
              Authority and legal protection of being directly affiliated with
              the Native American Church. This protection is far greater than
              what can be obtained from a member of a federally regulated Tribe
              that is living off the reservation.{" "}
            </p>

            <p id="paragraphStyle" className="p_text">
              Below is the line of authority of how the Spirit of Truth Native
              American Church and its Ministers received their authority to
              establish their branch of the Native American Church.
            </p>

            <ul
              id="paragraphStyle"
              className="p_text"
              style={{ listStyle: "inside" }}
            >
              The Rosebud Native American Church legally established its
              authority with the government on July 26, 1924.{" "}
            </ul>

            <ul id="paragraphStyle" className="p_text">
              On March 20, 1998, the authority to start a new branch of the
              Native American Church was given to James Warren ‘Flaming Eagle’
              Mooney of the Oklevueha Earthwalks Native American Church of Utah
              Inc by Blessing of Chief Leslie Fool Bull the Head of the Rosebud
              Native American Church.
            </ul>

            <ul id="paragraphStyle" className="p_text">
              Because the government of the state of Utah was discriminating
              against James ‘Flaming Eagle’ Mooney’s religious freedoms, his
              original authority was verified and sustained on August 19, 2007,
              by Richard ‘He Who Has The Foundation’ Swallow the current
              President of the Native American Church, Rosebud Reservation of
              South Dakota and the Oglala Sioux Chief of the Eagle Clan.{" "}
            </ul>

            <ul id="paragraphStyle" className="p_text">
              James Warren ‘Flaming Eagle’ Mooney on March 17, 2009, gave Paul
              'Man Found Standing' Dean the authority to start a new branch of
              the Native American Church for “as long as he walks Mother Earth.”
            </ul>

            <ul id="paragraphStyle" className="p_text">
              Paul ‘Man Found Standing’ Dean legally established his branch of
              the Native American Church in Missouri on April 25, 2013.
            </ul>

            <ul id="paragraphStyle" className="p_text">
              On September 5, 2021, Paul ‘Man Found Standing’ Dean presided over
              the Chiefs’ Council. During that council, it was decided that a
              new independent branch of the Native American Church should have
              the authority and be established with a greater priority focus on{" "}
              <a target="_blank" href="/Yeshua">
                Yeshua
              </a>{" "}
              and his teachings. On September 8, 2021, Paul ‘Man Found Standing’
              Dean legally established a new independent branch of the Native
              American Church called the Spirit of Truth Native American Church.
            </ul>

            <p id="paragraphStyle" className="p_text">
              Federal Law states that a Native American Medicine Person, also
              known as a Minister, Native American Practitioner, or Traditional
              Spiritual Leader must be either an enrolled member of a Federally
              Recognized Tribe or Band, or he/she must be recognized as such by
              Tribes, Bands, or other Native American Traditional Organizations.
              Therefore because of the establishment of our authority, every
              single member of the Spirit of Truth Native American Church enjoys
              protection and recognition, not as Tribal Medicine People, such as
              Lakota or Yankton, but as Spirit of Truth Members, Medicine Men,
              Medicine Women, Ministers, Natural Practitioners, or so forth of
              the Spirit of Truth Native American Church. Because of our
              authority, all members are legally considered “Indians” under the
              law.{" "}
            </p>

            <p id="paragraphStyle" className="p_text">
              Our Establishment of Authority, as stated above and proven in the
              links below, does not depend upon the will of every changing
              political faction within the Tribes or competing organizations,
              but upon the nature of the Native American Religion that once an
              acknowledgment has been given it can never be taken away. This
              message was upheld by the United States Supreme Court when it
              delivered its verdict in Gonzales vs O Centro de Espirto Vegetal –
              that blood quanta and Tribal enrollment are incidental if the
              organization is recognized by Tribes, Bands, or Traditional
              Organizations. This is also the same ruling that the Supreme Court
              of the State of Utah delivered in Utah vs James W. Mooney, et. al.
              This is also the message that the United States Department of Land
              Management delivered when 800 acres of the Siskyou Wilderness was
              given to the Maca Oyate Sundance Society of the Nemenhah
              (essentially giving Federal recognition to another independent
              branch of the Native American Church).
            </p>

            <div id="authorityBoxesParentDiv">
              <div id="authorityBoxes">
                <h4>Fool Bull Blessing – March 20, 1998</h4>
                <Button onClick={() => setShowfirst(true)}>See Details</Button>
              </div>
              <div id="authorityBoxes">
                <h4>Richard Swallow Blessing – 08-19-2007</h4>
                <Button onClick={() => setShowSecond(true)}>See Details</Button>
              </div>
              <div id="authorityBoxes">
                <h4>James Mooney Blessing</h4>
                <Button onClick={() => setShowThird(true)}>See Details</Button>
              </div>
              <div id="authorityBoxes">
                <h4>Official Permission</h4>
                <Button onClick={() => setShowfourth(true)}>See Details</Button>
              </div>
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
          <img src={loader} style={{ width: 300 }} alt='' />
        </div>
      )} */}
    </div>
  );
}
