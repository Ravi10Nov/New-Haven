// import { ArrowBack, ArrowForward } from '@material-ui/icons'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React, { useState } from "react";
import { Carousel, Container, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import ConstitutionImg from "../assets/Constitution.png";
import Footer from "../components/footer";
import NavbarComp from "../components/navbar";
import { Document, Page, pdfjs } from "react-pdf";
import spiritOfThruthConstitution from "../assets/pdfs/Spirit of Truth Constitution.pdf";
import "../css/RiseofMedical.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function Constitution() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div id="Top">
      <NavbarComp />
      <div
        className="container flex items-center justify-center"
        style={{ padding: 15 }}
      >
        <Container style={{ padding: 15 }}>
          <p
            id="RiseOfMedicalText"
            style={{ textAlign: "center", lineHeight: "1.2" }}
          >
            Spirit of Truth Native American Church Constitution
          </p>
          <br/>
          <p
            id="RiseOfMedicalText"
            style={{ textAlign: "center", marginTop: "-20px" }}
          >
            (Revised in Council July 31, 2024)
          </p>
          <p className="p_text" style={{ textAlign: "center" }}>
            (A Native American Church with direct authority passed from the
            Lakota Sioux Native American Church of Wounded Knee and Rosebud.)
          </p>
          <p className="p_text" style={{ textAlign: "center" }}>
            We, the Charter Members of the Spirit of Truth Native American
            Church in Council, beginning in September 2021 and continuously to
            the present, by Original Constitution and as amended and revised to
            present, by the Unanimous Voice do make this
          </p>
          <p
            style={{
              textAlign: "center",
              fontSize: "25px",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Declaration of Good Conscience and Practice, Constitution, and
            Establishment of the Spirit of Truth Native American Church.
          </p>
          <p className="p_text" style={{ textAlign: "center" }}>
            With respect to all in a sacred manner, we make a beginning of our
            speaking.
          </p>

          <p
            id="RiseOfMedicalText"
            style={{
              textAlign: "center",
              marginTop: "40px",
              marginBottom: "20px",
            }}
          >
            <i>Preamble</i>
          </p>
          <p id="paragraphStyle" className="p_text">
            Spirit of Truth Native American Church’s Medicine Men and Medicine
            Women are dedicated to following the Sacred Healing Way. As an
            Independent Governing Branch of the Native American Church, our
            Spiritual Authority directly stems from the Lakota Sioux’s Native
            American Church, Rosebud Reservation of South Dakota. In the
            Declaration of Good Conscience and Practice, Constitution, and
            Establishment of the Church, We Walk In The Sacred Way!
            <br />
            <br />
            We, the Spirit of Truth Native American Church Members, believe in
            the Creator and that the Creator made all men and women who have
            lived, now live, and who will yet live, as free and equal beings. We
            recognize all of the Creator’s works to be for our learning and
            benefit and most particular we see the Earth as our Holy Temple and
            everything the Creator has placed upon it to be for our learning and
            use.
            <br />
            <br />
            We recognize the inherent, ancestral, sovereign rights granted to
            all people by the Creator, as also by human conscience,
            international law, and legal constructs of reciprocity, mutuality,
            and comity, which cannot be diminished or extinguished. We believe
            that we derive from and that we may become like our Ancestral
            Spiritual Leaders, as also through the Holy Order of the Church, we
            claim the right to restore our Sacred Religion based upon their
            teachings, which have been passed down to us through the traditions,
            customs, ceremonies, writings, and records of Indigenous Peoples,
            among which we acknowledge the Native American stories and records,
            Holy Bible, the Torah, the Vedic Texts, Ancient Egyptian
            Hieroglyphics, Ayahtkuhyaht Text, and so forth, by way of example.
            We see all Holy Spirit-inspired writings to be Scripture but do not
            recognize their infallibility. We understand that imperfections can
            arise due to translation errors, misinterpretations, willful intent,
            and so forth. We hold the Sacred Scriptures, no matter where they
            originate from, to be useful in our Spiritual Progression as long as
            they do not disagree with the message of the Messiah and are
            witnessed to us by the Holy Spirit to be true or founded on
            principles of truth. We believe the Spirit of Truth is the ultimate
            guide to follow on The Sacred Healing Way (also called The Way or
            Healing Way) in our journey to Salvation.
            <br />
            <br />
            In accordance with the Principles and Teachings of the Sacred
            Records, from which we obtain our foundation, we believe that we are
            all relations one to another and we are children of the same
            Creator. We affirm the UNITED NATIONS Declaration on the Rights of
            Indigenous Peoples (U.N. Sub-commission on Prevention of
            Discrimination and Protection of Minorities 1994/45, August 26,
            1994. U.N. Doc. E/CN.4/1995/2, E/CN.4/sub.2/1994/56, at 105 (1994)),
            which was ratified into International Human Rights Law in 2007. We
            also affirm and applaud the Domestic Law of the United States,
            specifically 21c USC Chapter 42;2000;b(b) and USC Chapter 43;2000;c,
            to which we have committed ourselves, to uphold and defend.
            <br />
            <br />
            Fundamental to our traditions is the truth that, as Children of the
            Creator, we are entitled to the freedoms of thought, religion,
            sacred objects and sacraments, ceremonies, rites, observances, and
            so forth, and to pursue the same according to the dictates of our
            hearts and the doctrines of our religion, insofar as those freedoms
            do not prevent others from likewise enjoying the same liberty.
            <br />
            <br />
            We believe that men and women have been endowed with intelligence
            enough to govern themselves in such a manner as to guarantee to
            themselves these freedoms, to establish just and right ways to deal
            with each other, to maintain a tranquil and secure domestic life,
            provide for the defense of these rights when needed, and to ensure
            for ourselves and our posterity the blessings that our culture,
            traditions, and teachings bring.
            <br />
            <br />
            Accordingly, we exercise the Right of Self-Determination, which has
            been guaranteed by International and Domestic Law. We exercise the
            authority passed on to us by our ancestors to form the Spirit of
            Truth Native American Church comprised of individuals out of many
            Federally and Crown-Recognized Tribes and Bands, Non-recognized
            Tribes and Bands, Native Hawaiian, Native Alaskan, other Indigenous
            Peoples worldwide, and also from those individuals whom the Church
            shall see fit to admit by the exercise of our Religion and the
            administration of our Cultural Traditions and Institutions, whom we
            recognize as Our People, founded upon the Customs, Traditions,
            Principles, Religion, Governance, and Belief Systems cited herein,
            and we ordain and establish this Constitution for the Spirit of
            Truth Native American Church as an Indigenous Group under UNDRIP.
            Also, we exercise the rights guaranteed to all citizens of the
            United States and by the State of Missouri, to form our Church based
            upon the restoration of our Ancient Faith, and we ordain and
            establish this:
          </p>
          <p
            id="RiseOfMedicalText"
            style={{ textAlign: "left", lineHeight: "1.2" }}
          >
            Constitution for the Spirit of Truth Native American Church as a
            Native American Church and Ministry
          </p>
          <p id="paragraphStyle" className="p_text">
            <p className="p_text">
              We, the members of the Spirit of Truth Native American Church,
              adhere to the Creed and Expression of our Faith:
            </p>
            <p className="p_text">
              1.We are devoted followers of ‘The Sacred Healing Way’, set out
              for us by the Creator and taught to us by the Creator’s Son the
              Messiah, Yeshua. (Also known by other names of Jesus, Holy
              Messiah, Lamb of God, and so forth). We strive to follow the Way
              by worshiping in Spirit and Truth and it is only in the truth that
              God is Love that we find ourselves on the path to true
              enlightenment and salvation. We believe that the Messiah is the
              Word of the Creator made flesh being born of a virgin. Yeshua
              chose to walk amongst us on this very earth to teach us how to
              follow The Sacred Way and love one another. It is through his
              taking upon himself our sinful lives in the Garden of Gethsemane
              and by the sacrifice of his life on the cross that his life and
              blood paid for our sin debt and allowed us to follow the Way to
              break free from the universal wheel of suffering, bringing all who
              believe in him Salvation. After being in the tomb for three days,
              Yeshua rose from the dead to bring eternal life to all who travel
              with him on the Way.
            </p>
            <p className="p_text">
              2.The Spirit of Truth Native American Church is a true and living
              church of Yeshua. Yeshua is the “head” of the church and the
              members are the “body” (1 Corinthians 12:12-14). Through our
              belief in the teachings of Yeshua and through the Holy Spirit, we
              freely choose to follow The Sacred Healing Way and participate in
              the Sacred Ceremonies that we feel called to follow. Our Sacred
              Ceremonies assist to guide us on The Way. It is only through
              following Yeshua’s teaching and the Holy Spirit’s guidance that we
              may be one (John 17:11) as the Creator, Yeshua, and the Holy
              Spirit are one. The scriptures teach that when we humble ourselves
              before the Creator, repent of our sins, profess that Christ is
              Lord, and then feel the desire or calling to be baptized we should
              go forth and find a member of the body of Christ with the
              authority to do so and be baptized by emersion to enter through
              the Gate onto the Way so we can follow the path to obtaining
              Eternal Life.
            </p>
            <p className="p_text">
              3.We are a Religious Body dedicated to teaching the Ancient,
              Sacred Healing Ways, and the principles contained in the sacred
              writings of Indigenous Peoples around the world many of which are
              found in the sacred written records. As such, we believe that all
              people begin as equals, learn and progress line upon line, precept
              on precept until they have reached an enlightened and transcendent
              state. No person stands above another; in this at least, all
              people are not merely created equal, but are equal in the sight of
              the Creator.
            </p>
            <p className="p_text">
              4.We believe and adhere to all the principles of the Sacred
              Healing Ways of the Ancient Healers, as restored to President Paul
              Dean (aka Man Found Standing), and Vice-President Jedediah Currey
              (aka Way Walker) by direct revelation from the Creator, Elders,
              Mentors, Guides and Ancestors, and through the ancient tradition
              of the Creator, which includes but is not restricted to:
            </p>
            <p className="p_text">
              i) Acquisition of truth through diligent study, observation of the
              Way, prayer, song, dance, guidance from Elders, teachings and
              guidance of the Messiah, guidance from the Holy Spirit, and
              through the right application of wisdom and all the gifts of the
              Creator. This is the First Great Principle and Covenant of the
              Ancient Spiritual Societies and Religious Orders which are
              herewith restored in the Spirit of Truth Native American Church.
            </p>
            <p className="p_text">
              ii) Self-determination and self-direction, as guaranteed by
              International and Domestic Law.
            </p>
            <p className="p_text">
              iii) The competent ceremonial use of exogenic substances, as well
              as all other forms of Sacred Healing, for the improvement and
              enlightenment of the Body of the Church, for the Work of the
              Ministry, and for the saving of the Living and the Dead. This is
              the Three-Fold Mission of the Spirit of Truth Native American
              Church.
            </p>
            <p className="p_text">
              iv) The education of others in The Sacred Healing Way, so that all
              people may become Healers and Peacemakers. The Core Curriculum for
              the Spirit of Truth Native American Church’s Medicine Men and
              Medicine Women is the first main tier of this education.
            </p>
            <p className="p_text">
              5.We believe in the Wisdom of the Creator. This wisdom, along with
              the gifts of our culture, our customs, our traditions, and our
              beliefs, as they are expressed in the sacred utterances and
              performances of The Sacred Way, are gifts given to us by the
              Creator and they can neither be given nor taken away by other
              persons, peoples, nations, or governments.
            </p>
            <p className="p_text">
              6.We believe that the wisdom of the Creator finds expression in
              nature and that the inherent wisdom of all living things reflects
              and manifests that expression. It is upon this tradition of the
              pre-conquest American Indigenous Peoples, and the teachings of the
              Ancient Healers that we do re-establish ourselves and revitalize
              our Culture. Diligent study leads to a more complete understanding
              of the will of the Creator for all people. Therefore, all people
              are endowed by the Creator with intelligence, and the use of that
              intelligence to learn all things is the ultimate expression of our
              society and our religion, and one of the ultimate gifts of the
              Creator that must be passed on to our Spirit of Truth Native
              American Church Brothers and Sisters, and our posterity.
            </p>
            <p className="p_text">
              7.We believe that all people are free to choose and that the
              health of the body, the mind, the spirit, the community, the
              society, and the planet are direct consequences of the choices
              each person makes. All people have the inalienable right to
              freedom of choice and self-determination, in areas of family life,
              health, education, application of traditional values, beliefs,
              lifestyles, practices, as well as in community and national
              participation. The inherent dignity and equal and inalienable
              rights of the human family are the foundation of health, freedom,
              justice, peace, enlightenment, and harmony among all peoples.
              Without these values, humans are mere slaves, either of their
              fellow man and his expectations or society.
            </p>
            <p className="p_text">
              8. We believe that the Creator guides, succors, and saves all the
              works of Creation.
            </p>
            <p className="p_text">
              9. We believe that faith and acts of faith are the right
              applications of the wisdom of the Creator.
            </p>
            <p className="p_text">
              10.We believe that all people are free to courageously engage
              themselves in any good work, for the power is in them because of
              the creation. All people have the right to self-sufficiency
              through the inherent rights of self-determination and
              self-government.ent rights of self-determination and
              self-government.
            </p>
            <p className="p_text">
              11.We believe that all earthly organizations are manifestations of
              the order that permeates all creation and that, even if flawed,
              some element of truth may yet be found in them.
            </p>
            <p className="p_text">
              12.We believe in the Gifts of the Spirit and in miracles; such as
              cures, healings, prophecies, visions (aided by Sacrament and
              otherwise), personal revelations, the speaking in tongues, the
              interpretation of tongues, the translation of ancient languages,
              and so forth, and that it is the right of all people to heal and
              be healed without restriction or interference from any earthly
              government, for Natural Medicine and Natural Modalities of Healing
              are gifts of the Creator.
            </p>
            <p className="p_text">
              13.We believe that the Creator is actively involved with us and
              has revealed many things to us through the instrumentality of his
              creation, through his son Yeshua, through the Holy Spirit, through
              the current and ancient Spiritual Healers, through the Holy
              Sacraments, through Ceremony, and so forth. We believe the Creator
              does now reveal many things to us, and will yet reveal many things
              pertaining to all manifestations of Creation. No earthly power or
              organization may restrict the freedom to obtain and to apply
              personal revelation and we believe that the Creator has revealed
              The Sacred Way to us through the ancient, tried and tested method
              of those who lived in the Americas prior to its invasion,
              conquest, colonization and subjugation by other people from other
              lands. We believe that Yeshua taught many things to the indigenous
              tribes around the world and in the Americas after he left Israel.
              (John 10:16: And other sheep I have, which are not of this fold:
              them also I must bring, and they shall hear my voice; and there
              shall be one-fold, and one shepherd.)
            </p>
            <p className="p_text">
              14. We believe that all people can be united in all good and true
              purposes, having all Truth in common, and that all social,
              political, economic, and ethnic distinction, if it is designed to
              edify, is honorable. But if it is designed to enslave or
              subjugate, it is evil and must be abolished.
            </p>
            <p className="p_text">
              15.We eschew the despotism of orthodoxy and exercise the privilege
              of seeking and finding truth wherever that search may lead us,
              insofar as we neither abrogate personal accountability nor
              willfully injure any person in their search.
            </p>
            <p className="p_text">
              16.We believe in and uphold any law or regulation made by the
              government of any nation that is based on principles of truth and
              that is made not for the purpose of enslavement, or to place one
              nation or one person above another. If any law conforms to that
              standard we believe in, we uphold that law. If any law tends to
              enslave or place one nation or person in subjection to another, or
              restricts any person in the practice of their religion, or
              punishes any person for such practice, we claim the right to work
              within morally accepted norms to change it.
            </p>
            <p className="p_text">
              17.We believe it is our right as One People Walking the Earth to
              take care of ourselves, families, and the Spiritual Community as
              we feel called upon by the Spirit to do so. We oppose private,
              public, and government influence, however well-intentioned, to
              interfere with our rights to govern ourselves and see their
              interference as a violation of the Creator's will and a form of
              enslavement. When a government tries to take ownership over our
              bodies or takes away the rewards of our labors with the promise to
              give them back to use sometime in the future, we see this as
              interference, a form of enslavement, and a violation of the
              Creator's will. Governments have shown to have a tendency to be
              wasteful, self-serving, and uncaring on most individual levels. We
              see that when people are allowed to care for themselves and use
              the fruits of their labors, greater care of themselves, their
              families, and Spiritual Community is the result in almost all
              cases. History has shown that the good intentions of governments
              have led to a form of enslavement and have always been disastrous
              to the people in the long run. Humanity has seen many millions of
              people needlessly die because of the many different government's
              enslavement policies. We regard the taking care of ourselves, our
              families, and the Spiritual Community in health, sickness, or old
              age as our religious obligation and object to interference by
              private, public, and governments. We are free Children of the
              Creator and are conscientiously opposed to any government
              requiring an individual to take on medical treatments or make
              payments to a private or public insurance that makes payment in
              the event of death, disability, old age, or retirement or makes
              payments toward the cost of, or provides services for, medical
              care, (including the benefits of any insurance system established
              by the Social Security Act). We are conscientiously opposed to
              mandated or forced vaccinations, the compulsion for us to mask
              ourselves with potentially harmful effects, or other
              government-forced or mandated prevention or medical treatments. We
              recognize the Creator is our provider and not a government and we
              are conscientiously opposed to governments placing us into any
              form of slavery. As One People Walking the Earth, we take care of
              ourselves and our Spiritual Families as we feel called upon by the
              Holy Spirit. All members have a claim upon the Church for
              assistance when needed.
            </p>
            <p className="p_text">
              18. We repudiate any rights that any federally recognized tribe,
              band, or traditional organization may claim to possess, that gives
              them authority, or so they suppose, to enter into treaties or
              agreements that seek to bind the Spirit of Truth Native American
              Church, our Spiritual Family, our descendants or our followers in
              good faith. We honor, associate, and affiliate with such entities,
              but we are self-determinant, self-reliant, and self-governing.
            </p>
            <p className="p_text">
              In a sacred manner, we hereby reaffirm our commitment to our
              inherent values of Enlightenment, Salvation through our Lord
              Yeshua, Illumination of Truth through the Holy Spirit,
              Spirituality, Intelligence, Honor, Sharing, Kindness, Love,
              Compassion, Respect, Courage, Integrity, Healing, Equality, and so
              forth as passed on from generation to generation by the Ancient
              Healers.
            </p>
            <p className="p_text">
              In a sacred manner, we hereby reaffirm our commitment to the
              sacred teachings of the Spirit of Truth Native American Church’s
              Sacred Healing Way, as passed on from Elder to Elder by the
              Ancient Healers, and of the teachings and principles contained in
              our traditions, customs, ceremonies, celebrations, Sacred Writings
              and Records which we consider to be scripture, and so forth, and
              do affirm our intent to restore the Sacred Spirit of Truth Native
              American Church Healing Way, as a Religious Belief System and
              Practice in its complete form, together with its sacraments and
              ceremonies, institutions, authority to govern itself, powers of
              administration, customs and traditions, sacred sites, and so
              forth, beginning with the Members of our Church, and then
              expanding to all the Peoples of the world who express an interest
              in it.
            </p>
            <p className="p_text">
              In a sacred manner, we hereby reaffirm our right to form Lodges or
              Chapters of the Spirit of Truth Native American Church and expand
              its Councils in any place that our conscience directs or the
              Creator commands, according to the application of our faith, the
              exercise of our Code of Ethical Conduct, and the diligent
              performance of our duty.
            </p>
            <p className="p_text">
              Therefore, as both a culmination and a beginning, we recognize
              these characteristics for our Ministers and our Church Membership
              wherever they may assemble; and, we go forward from this day with
              the following:
            </p>
          </p>
          <p id="RiseOfMedicalText" style={{ textAlign: "left" }}>
            Definitions:
          </p>
          <p id="RiseOfMedicalText" style={{ textAlign: "left" }}>
            Consensus
          </p>
          <p id="paragraphStyle" className="p_text">
            All election and decision-making in the Councils of the Spirit of
            Truth Native American Church shall be by the consensus of the
            Members in Active Voting Status. When a particular Council has come
            to the end of all debate on any matter, the Talking Feather (as
            defined hereinafter) shall ask for a “thumb vote,” meaning that all
            members of the Council shall demonstrate their agreement by raising
            their hand with thumb up, or in the alternative, they shall
            demonstrate their disagreement by raising their hand with thumb
            down. Should there remain any thumbs down, consensus shall not have
            been obtained and the matter must return to debate or it must be
            withdrawn and studied. Council Members may raise their hand with
            thumb parallel to the ground, meaning that they disagree but require
            no one to agree with them, and this shall not be counted as a vote
            in the negative. When all thumbs are either up or parallel with the
            ground, consensus has been obtained. Unanimous Council or “Having
            all things in Common” shall pertain to all Councils of the Spirit of
            Truth Native American Church.
          </p>
          <p id="RiseOfMedicalText" style={{ textAlign: "left" }}>
            General Assembly Vote
          </p>
          <p id="paragraphStyle" className="p_text">
            After a Consensus has been reached in Council, when it is
            appropriate for the matter to be ratified by General Assembly, all
            the Members that are considered Active in the Church and who wish to
            participate, shall be allowed to cast one vote. The issue passes if
            two-thirds of the votes cast are in the affirmative.
          </p>

          <p id="paragraphStyle" className="p_text">
            <p
              id="RiseOfMedicalText"
              style={{ textAlign: "left", lineHeight: "3rem" }}
            >
              The Presiding High Priest or President of the Spirit of Truth
              Native American Church &nbsp;
            </p>
            The President and CEO of the Spirit of Truth Native American Church
            is the Presiding High Priest, and President of the Church, and is
            the ultimate authority under this Constitution. The First President
            of the Spirit of Truth Native American Church is Paul H. Dean, aka
            'Man Found Standing', upon the instance of the Creator, and as
            anointed by James W.F.E. Mooney. James W.F.E. Mooney received his
            ordination and appointment under the hand and blessing of Leslie
            Fool Bull, and was elevated to the President of the Oklevueha/Sioux
            Nation Communal Free Native American Church by Chief Fool Bull's
            successor, Richard He Who Has the Foundation Swallow, when the
            Oklevueha and the Wounded Knee Native American Churches conjoined.
            Both of these great men, may they rest in peace, were Chiefs of the
            Oglala/Lakota Eagle Clan, and Heads of the Native American Church of
            Wounded Knee and of Rosebud.
            <br />
            <br />
            Eligibility: To be eligible for appointment to the Office of
            Presiding High Priest of the Spirit of Truth Native American Church,
            a man or woman must have been ordained to the Ministry under the
            hands of the First Presiding High Priest or his Successor. Only an
            Ordained Minister of the Church may be elected to the Office of
            Presiding High Priest. The nominee must have served for a minimum of
            one (1) year as a Member of the Council of District Chiefs or
            Council of Area Chiefs, under the direction and the tutelage of the
            President of the Church.
            <br />
            <br />
            Stewardship and Authority: The President is the highest Office in
            the Church. All other Officers act under authority obtained from the
            President. All other Officers of the Church act under authority
            obtained through the President, and they report directly to that
            Office.
            <br />
            <br />
            The President is the Custodian of the Sacred Healing Way,
            Ceremonies, Sacraments, and Sacred Medicine associated with the
            Establishment and Exercise of the Spirit of Truth Native American
            Church Religion, and the administration of all Spirit of Truth
            Native American Church Religious Institutions.
            <br />
            <br />
            He or she holds the Keys to the Covenant of Spiritual Adoption and
            is the only Member of the Spirit of Truth Native American Church who
            is authorized to affect the Ordinance of Making Relations associated
            with the adopting New Members into the Church. The President of the
            Church is authorized to act upon the Request for Spiritual Adoption
            and to manage the Tithes of the Church associated with that office.
            <br />
            <br />
            Through the teaching of the Sacred Healing Way, the President
            directs and oversees the training of all Spirit of Truth Native
            American Church Ministers, creates or calls for the creation of a
            curriculum to affect the same, and is authorized to receive and have
            the administration of tithes associated with that office.
            <br />
            <br />
            The President is the Chairman of the Council of Administrative
            Chiefs and presides over the Annual Great Council of the Church.
            <br />
            <br />
            Only the President may call, set apart, and ordain a Chief in any of
            the Lodges, Chapters, Roadman or Roadwoman Districts or in any of
            the Districts of the Spirit of Truth Native American Church.
            <br />
            <br />
            A High Priest shall be divested only upon the action of a
            Disciplinary Council of the Spirit of Truth Native American Church,
            presided over by the President of the Church or is assigned Medicine
            Chief.
            <br />
            <br />
            Rights and Restrictions of the Office: The President of the Spirit
            of Truth Native American Church is authorized to act within the
            dictates of the Office of Presiding High Priest with all authority
            to direct the work of the Ministry, when such actions involve the
            Making of Relations (Spiritual Adoption), the training of Ministers,
            and the governing and direction and administration of the Church,
            its Chapters, its Districts, and of its Institutions and Societies.
            Otherwise, the President is authorized to act under the same
            restrictions in all things with the same authority that is extended
            to all Spirit of Truth Native American Church Members generally.
          </p>

          <p id="paragraphStyle" className="p_text">
            <p id="RiseOfMedicalText" style={{ textAlign: "left" }}>
              The Sacred Healing Way
            </p>
            <br/>
            The Sacred Healing Way is that body of knowledge based on the
            teachings which have been passed down to us through the traditions,
            customs, ceremonies, writings, and records of Indigenous Peoples,
            among which we acknowledge the Holy Bible, Native American stories
            and records, the Torah, the Vedic Texts, Ancient Egyptian
            Hieroglyphics, Ayahtkuhyaht Text, and so forth, by way of example.
            We see all Holy Spirit inspired writings to be Scripture but do not
            recognize their infallibility. We understand that imperfections can
            arise due to translation errors, misinterpretations, willful intent,
            and so forth. We hold the Sacred Scriptures, no matter where they
            originate from, to be useful in our Spiritual Progression as long as
            they do not disagree with the message of Yeshua and are witnessed to
            us by the Holy Spirit to be true or founded on principles of truth.
            <br />
            <br />
            We recognize Yeshua as the highest authority of the Church. He is
            the Way, the Truth, and the Life and we recognize that Yeshua is our
            advocate with the Father. It is only through following Yeshua’s
            Sacred Healing Way that we may join the Creator. (John 14:6) We
            recognize the Holy Spirit guides us along the Sacred Healing Way and
            testifies of Truth. (John 16:13)
            <br />
            <br />
            The Church compiles this knowledge into education for the systematic
            training of the Ministers of the Church. It is the criteria by which
            Spiritual Adoption is entered into and the basis and foundation of
            this Constitution. It consists of the Ancient Spirit of Truth Native
            American Church Law and of the ancient and otherwise accepted
            spiritual and physical ceremonies, wisdom, knowledge, practices,
            policies, teachings, modalities and so forth, which are expressed in
            our Records and Writings which the Spirit of Truth Native American
            Church regards as Scriptures.
          </p>
          <p id="RiseOfMedicalText" style={{ textAlign: "left" }}>
            Spiritual Adoption or "Making Relations"
          </p>
          <p id="paragraphStyle" className="p_text">
            Membership in the Spirit of Truth Native American Church is by and
            through the ancient religious tradition of the Covenant of Spiritual
            Adoption, which is also known as "Making Relations." The Spirit of
            Truth Native American Church follows this tradition. To enter into
            the Covenant of the Church, individuals must apply to the President
            for Spiritual Adoption. The individual declares the following as far
            as they currently understand them:
          </p>
          <p className="p_text">
            1. Natural Healing/Medicine is a part of my Spiritual Orientation
            and I wish to follow The Sacred Healing Way as set out by the
            Creator.
          </p>
          <p className="p_text">
            2. I will live by the practice of “First, Do Good”.
          </p>
          <p className="p_text">
            3. I will faithfully study the spiritual and traditional healing
            materials put out by the Spirit of Truth Native American Church, or
            their assigned, and such education will be under the direction of
            the President of the Church, by and through means he/she sees fit,
            and which is upheld by the Constitution and the Church's Code of
            Ethics.
          </p>
          <p className="p_text">
            4.I will dedicate time, talent, and resources, as the Spirit
            directs, to developing and forwarding the work of the Church and all
            of my payments or gifts made to the Church are free-will donations
            in accordance with the Constitution of the Church to be used to
            support the programs of the church and are given in the spirit of
            the Sacred Giveaway which is a bona fide Ceremony and Traditional
            Practice of the Spirit of Truth Native American Church.
          </p>
          <p className="p_text">
            5. As a member of the Church, I promise to follow the Ethical Code
            and Constitution of the Church.
          </p>
          <p className="p_text">
            Upon the satisfaction of the President of the Church, or the
            assigned Membership Committee, the President authorizes the adoption
            of the individual. The individual will be Spiritually Adopted,
            documents will be created for the new member, and as the occasion
            permits the President will hold a special Adoption Ceremony for the
            new church family members. This Adoption Ceremony is begun by the
            President of the Church in private ceremony but will be culminated
            at Great Council when the new members are presented in the Annual
            Long Count of the Spirit of Truth Native American Church. The
            Adoption is for purposes of establishing the Covenant Relationship
            and Membership of an individual into the Spirit of Truth Native
            American Church and shall be used only for this designated dual
            purpose.
          </p>
          <p id="RiseOfMedicalText" style={{ textAlign: "left" }}>
            Spirit of Truth Native American Church Member
          </p>
          <p id="paragraphStyle" className="p_text">
            Men and women who have reached the Age of Accountability, been duly
            adopted by the President of the Spirit of Truth Native American
            Church in accordance with the ancient law of Spiritual Adoption, and
            by the direction of the Spirit of the Creator, who are studying or
            want to study the Sacred Peacemakers Healing Way, and who have made
            the covenant to sustain and uphold each other, the Spirit of Truth
            Native American Church Constitution, its Code of Ethical Conduct,
            Councils and Chiefs shall be considered Members of the General
            Assembly of the Spirit of Truth Native American Church Entire, and
            of the Chapter and District in which they reside, or to which they
            have been assigned by the President. Anyone wishing to be a Member
            must be of the Age of Accountability and shall demonstrate their
            covenant by complying with the standards set by the Great Council
            for such compliance.
          </p>
          <p id="RiseOfMedicalText" style={{ textAlign: "left" }}>
            Age of Accountability
          </p>
          <p id="paragraphStyle" className="p_text">
            “Age of Accountability” is the age at which an individual is able to
            distinguish right from wrong. It is an important principle to be
            accountable for one's actions so you may walk more fully in the
            Sacred Way. The Sacred Teachings have established this Age of
            Accountability as the age of eight (8) years old. This age has a
            long-standing precedence in many religious cultures. Saint Peter,
            from the New Testament, found in 1 Peter 3:21, wrote about being
            baptized at this Age of Accountability and joining the ancient
            Christian Church when he said, “The like figure whereunto even
            baptism doth also now save us (not the putting away of the filth of
            the flesh, but the answer of a good conscience toward God,) by the
            resurrection of Jesus Christ:”
          </p>
          <p id="RiseOfMedicalText" style={{ textAlign: "left" }}>
            Medicine Person
          </p>
          <p id="paragraphStyle" className="p_text">
            Men and women who are Members already, have reached the Age of
            Agency, have achieved the completed the proper level of studying for
            being a Medicine Person (Bundle Ceremony Creation and so forth),
            have been baptized after the manner Yeshua taught, and have
            officially received their calling as a Medicine Man or Medicine
            Woman by the President of the Church.
          </p>
          <p id="RiseOfMedicalText" style={{ textAlign: "left" }}>
            Age of Agency
          </p>
          <p id="paragraphStyle" className="p_text">
            “Agency” is the right of the Spirit of Truth Native American Church
            Members to vote in any Council and in the Councils and Assemblies of
            the Church. The Age of Agency is eighteen (18) years of age. The Age
            of Agency may be changed upon consensus of the Delegates
            participating in Great Council.
          </p>
          <p id="RiseOfMedicalText" style={{ textAlign: "left" }}>
            Lodge Chapter
          </p>
          <p id="paragraphStyle" className="p_text">
            The Lodge Chapter is the Primary Organizational Unit of the Spirit
            of Truth Native American Church for purposes of members meeting
            together, holding ceremonies, administration of the Sacraments, to
            serve as a venue for the teaching of the Sacred the Spirit of Truth
            Native American Church Healing Way, as well as to examine and teach
            all good things. The District Chief looks upon the Medicine People
            at the Age of Agency in his District and calls and or releases the
            Principal Stone Carrier as needed or as directed by the Spirit, who
            presides over the Chapter Council, consisting of a First Advisor and
            a Second Advisor. Each Lodge Chapter may provide two Delegates for
            the Great Council. A Lodge Chapter must consist of a minimum of
            three Medicine People and have a Unifying Purpose. Once a Lodge
            Chapter reaches at or about five hundred (500) members, it will be
            divided into two separate Lodge Chapters to better assist all
            individuals of the Spirit of Truth Native American Church. All Lodge
            Chapters must keep records of all donations given directly to them.
            The donations must include the date, the type of donation, and who
            was the donating party when appropriate. They must also keep records
            of all expenses paid by the Lodge Chapter. The expenses must include
            the date, amount paid, and purpose of the expense. Once a year,
            between January 1st and January 30th, all donations and expenses
            from the previous year must be reported to the President of the
            Church or his assigned.
          </p>

          <p id="RiseOfMedicalText" style={{ textAlign: "left" }}>
            The Spirit of Truth Native American Church District
          </p>
          <p id="paragraphStyle" className="p_text">
            The Spirit of Truth Native American Church policy allows the
            dividing of a geographic region, such as the United States for
            example, into administrative zones called "Districts." The President
            of the Church calls a Medicine Person in Good Standing and at the
            Age of Agency to preside over the District as Chief, under his/her
            direction and authority. The District Chief calls as many
            Counselors/Advisors as he/she deems necessary, and they form the
            District Council. The District Council is charged with carrying out
            the Policy of the Church, as promulgated by the President and/or
            mandated by the Great Council. The District Chief is also charged
            with the authority to organize Lodge Chapters within the District
            and to call Medicine People in Active/Voting Status to the Office of
            Principal Stone Carrier of the Chapter.
            <br />
            <br />
            The District may consist of as few or as many Lodge Chapters as the
            District Chief deems appropriate as long as the Loge Chapters are
            established in accordance with their guidelines. Normally a District
            will consist of twelve (12) or more Lodge Chapters with a minimum of
            one thousand (1,000) members. Normally a District will be divided
            into two separate Districts once memberships reach about twenty
            thousand (20,000) members. District Councils are held regularly and
            are presided over by the District Chief. When a District is formed,
            the Lodge Chapter Councils report directly to the District Chief.
            <br />
            <br />
            Each District may send one Medicine Person Delegate to Great
            Council.
            <br />
            <br />
            The President of Church appoints and/or releases the District Chief.
            The District Council may be removed from office before the end of
            its term by the President of the Church. Membership in the District
            Council is an honor rather than a profession and any member elected
            to the District Council must personally approve of his or her
            election. No person shall receive remuneration for service in the
            District Council, nor shall any person be coerced into service.
            <br />
            <br />
            All Districts must keep records of all donations given directly to
            them. The donations must include the date, the type of donation, and
            who was the donating party when appropriate. They must also keep
            records of all expenses paid by the District. The expenses must
            include the date, amount paid, and purpose of the expense. Once a
            year, between January 1st and January 30th, all donations and
            expenses from the previous year must be reported to the President of
            the Church or his assigned.
          </p>

          <p id="RiseOfMedicalText" style={{ textAlign: "left" }}>
            Council of Administrative Chiefs
          </p>
          <p id="paragraphStyle" className="p_text">
            The Council of Administrative Chiefs of the Spirit of Truth Native
            American Church consists of the Chiefs or "Special Assistants" whom
            the President is authorized to appoint to assist him/her in the
            carrying out of the Office of President, the appointed Chiefs of the
            General Societies of the Spirit of Truth Native American Church, and
            the Roadpersons appointed to preside over the Districts of the
            Church. These Members are called "Chiefs" because each of them is
            called into a Stewardship, or to represent an Order or Society of
            the Church. Each Administrative Chief acts in their assigned
            stewardship under the direction of the President of the Church, and
            is in effect, the mouthpiece of the President, who is ultimately
            accountable before the Creator for all their actions. The President
            may release any Member of the Council of Administrative Chiefs as
            appropriate. The Administrative Chiefs have no authority other than
            that which they receive from the President.
            <br />
            <br />
            Eligibility: To be eligible for election to the Office of
            Administrative Chief of the Spirit of Truth Native American Church,
            the nominee must be a Duly Adopted Member of the Spirit of Truth
            Native American Church, received the Calling of Medicine Man or
            Medicine Women, be of Active/Voting Status, and they must be called
            by the President of the Church.
          </p>
          <p id="RiseOfMedicalText" style={{ textAlign: "left" }}>
            General Assembly
          </p>
          <p id="paragraphStyle" className="p_text">
            As outlined in the definition of the Spirit of Truth Native American
            Church Member, every Member of the Spirit of Truth Native American
            Church is automatically a Member of the General Assembly, first of
            the Spirit of Truth Native American Church Entire, then of the
            Chapter District in which they resided. The General Assembly of the
            Spirit of Truth Native American Church Entire is entrusted with the
            task of ratifying the vote of the Great Council Delegates in the
            event of the Election of a President and other highly important
            decisions. The General Assembly of the Units of the Church are
            task-specific and operate following the model herein outlined,
            whenever appropriate to the task and purpose of the Unit.
          </p>
          <p id="RiseOfMedicalText" style={{ textAlign: "left" }}>
            Great Council
          </p>
          <p id="paragraphStyle" className="p_text">
            Annual Conference of the Church. The President calls for the Great
            Council and the Chapters, Districts, Societies, Institutions, and so
            forth, send their Delegates to participate. The Great Council is
            authorized to elect a successor to an existing (death, expulsion, or
            retirement) of the President, sustain the Church Leadership in their
            callings, and debate and adopt amendments to the Spirit of Truth
            Native American Church Constitution. Only the President may call a
            Great Council unless the President is not available due to death,
            expulsion, or retirement and then the Council of Administrative
            Chiefs may call for the Great Council.
          </p>
          <p id="RiseOfMedicalText" style={{ textAlign: "left" }}>
            Council Eligibility
          </p>
          <p id="paragraphStyle" className="p_text">
            Council Members must have reached the Age of Agency, be a Medicine
            Person, and bound themselves by covenant (outlined herein) to the
            Spirit of Truth Native American Church. The President may set
            standards for competency, and the Members may be required to work to
            maintain eligibility. Such requirements shall be in accord with the
            principles of this constitution and with the spirit of the Covenant
            of Spiritual Adoption. Members who refuse to comply with the
            direction of the President, under this constitution, are not
            eligible for Council Service.
          </p>
          <p id="RiseOfMedicalText" style={{ textAlign: "left" }}>
            The Talking Feather
          </p>
          <p id="paragraphStyle" className="p_text">
            The Talking Feather is the Chairperson of the Council. They
            determine the agenda, call the Council to order, and determine the
            order of speakers in Council. The Talking Feather may also adjourn
            the council if order cannot be maintained or when all counsels are
            complete.
          </p>
          <p id="RiseOfMedicalText" style={{ textAlign: "left" }}>
            Proxy
          </p>
          <p id="paragraphStyle" className="p_text">
            In the event that a duly elected Delegate to Council is unable to
            attend, he/she may assign their voting rights to a Delegate In
            Attendance, or to the Talking Feather of the Council in question.
          </p>

          <p id="RiseOfMedicalText" style={{ textAlign: "left" }}>
            Vacancies
          </p>
          <p id="paragraphStyle" className="p_text">
            When vacancies occur in the representation of any Lodge Chapter
            Council, the Principal Stone Carrier shall appoint a Medicine Person
            of the Lodge Chapter in Active/Voting Status to the vacated office.
            If the Principal Stone Carrier fails to re-establish the Lodge
            Chapter Council, the Council is automatically dissolved and the
            President seeks a recommendation for a new Principal Stone Carrier
            from the General Assembly of the Lodge Chapter. If the General
            Assembly of the Lodge Chapter fails to bring forth a recommendation,
            the Lodge Chapter is automatically vacated and dissolved, without
            further administrative effort, and the members lose the benefit of
            Lodge Chapter until a new Lodge Chapter is organized.
            <br />
            <br />
            When vacancies occur in the representation of any District Council,
            the District Roadperson shall call a Medicine Person from the
            District to the vacated position. Should the vacancy involve the
            elected District Roadperson, the President of the Church shall call
            another into the Office of District Chief before any other Council
            position may be filled or extended.
          </p>
          <p id="RiseOfMedicalText" style={{ textAlign: "left" }}>
            No Immunity
          </p>
          <p id="paragraphStyle" className="p_text">
            All Chiefs and Members of the Councils shall be held to the same
            performances as they impose upon the members of the Church. They
            shall have no immunity. Even the President of the Church may be
            expelled from the Spirit of Truth Native American Church for base
            and grounds described herein.
          </p>
          <p id="RiseOfMedicalText" style={{ textAlign: "left" }}>
            Impeachment and Expulsion
          </p>
          <p id="paragraphStyle" className="p_text">
            Impeachment is censure placed upon an Officer of the Church by a
            Disciplinary Council. In Impeachment, a Member is removed from
            office but not from membership. Expulsion is the removal of a person
            from the membership rolls of the Church. They are severe sentences
            that can only be recommended by a Disciplinary Council of the
            Church. The President must decide whether to act upon or suspend the
            recommended sentence of Impeachment or Expulsion.
          </p>
          <p id="RiseOfMedicalText" style={{ textAlign: "left" }}>
            Covenant Donation
          </p>
          <p id="paragraphStyle" className="p_text">
            The Covenant Donation or Sacred Giveaway Offering, as outlined
            herein, is the responsibility of every Member and constitutes part
            of the demonstration of the Covenant made at Spiritual Adoption. It
            is placed into the stewardship of the Principal Stone Carrier of any
            organized Lodge Chapter, the District Chief/Roadperson of any
            organized District, and where there are no organized Lodge Chapters
            or Districts, it is the Stewardship of the President of the Church.
            The leadership in any Organization of the Church should remit a
            tithe of the regular offerings they receive from the membership
            directly to the President of the Church to further the entire Spirit
            of Truth Native American Church Missions.
          </p>
          <p id="RiseOfMedicalText" style={{ textAlign: "left" }}>
            Active
          </p>
          <p id="paragraphStyle" className="p_text">
            Members should be in compliance to the Covenants they have made and
            at least have 40 hours of continuing education each year to be
            considered as an Active Member. Continuing education will be derived
            from the assignment from the President of the Church, Church
            Education, Scriptures, Attendance at Meetings and Ceremonies,
            Training in Church Approved Fields, and so forth. Every individual
            has the right and must decide for themselves according to the Spirit
            and their desires if they should be considered an active member and
            choose to have voting status in the General Assembly. An
            individual’s status is considered a personal matter between the
            individual and the Creator and should be upheld by all members as
            such.
          </p>
          <p id="RiseOfMedicalText" style={{ textAlign: "left" }}>
            Council
          </p>
          <p id="paragraphStyle" className="p_text">
            Any gathering or body of the Spirit of Truth Native American Church
            which is organized in accordance with this Constitution, and which
            has authority to make recommendations to any General Assembly of the
            Spirit of Truth Native American Church.
          </p>
          <p id="RiseOfMedicalText" style={{ textAlign: "left" }}>
            Counsel (for disciplinary)
          </p>
          <p id="paragraphStyle" className="p_text">
            The findings, decisions, directives, or recommendations which any
            Council of the Spirit of Truth Native American Church might
            recommend to the General Assembly for purpose of vote or election.
          </p>

          <p
            id="RiseOfMedicalText"
            style={{ textAlign: "left", lineHeight: "1.2" }}
          >
            Constitution Articles for the Spirit of Truth Native American Church
            as a Native American Church and Ministry
          </p>
          <p id="paragraphStyle" className="p_text">
            <p className="p_text"></p>
            <span style={{ fontWeight: "bold" }}>Article One:</span> Even though
            this Declaration and Constitution is set forth to establish the
            Spirit of Truth Native American Church as a Church, it should be
            recognized that we recognize the Spirit of Truth as our religion.
            The Spirit of Truth is the teachings that the Creator is love, that
            love is our salvation, and salvation comes through the Creator’s son
            Yeshua. Councils shall assist to protect each individual member’s
            rights to have a personal relationship with the Creator and his Son,
            Yeshua, and provide a healthy atmosphere for members to love and
            respect each other. Counsel shall not seek to modify the Spirit of
            Truth Native American Church doctrine to please groups or individual
            members. Members of the church shall respect each other and live by
            the practice of First, Do Good which literally means to follow the
            Sacred Way of the Peacemaker and not cause injury/harm to one
            another. First, Do Good guides members to avoid actions that might
            conceivably do harm, directly or as a side effect.
            <br />
            <br />
            Any member that harms another will be brought before the Council of
            Ethics to account and face the Council’s judgment for restitution.
            Also, any member that harms another person to the point that renders
            another person unable to earn his or her living, or threatens to do
            so, will be put out of the church. The Spirit of Truth Native
            American Church shall always respect and uphold individuals’
            spiritual progress and support them on the Sacred Way/Spiritual
            Path. However, the Church retains the right to regulate the
            Ministerial Actions of its Ministers also called Medicine Men and
            Medicine Women.
            <p className="p_text"></p>
            <span style={{ fontWeight: "bold" }}>Article Two:</span> Where men
            and women, who are engaged in the Peacemaker’s Sacred Healing Way
            and wish to become the Spirit of Truth Native American Church
            Members or Ministers, undertake to celebrate ordinances which are
            intended to regulate their religious practice through the ancient
            traditions of the Spirit of Truth Native American Church Council,
            the authority to do so shall be vested as follows: 1) the President
            of the Church (where counsel pertains to the general administration
            of the Spirit of Truth Native American Church and Secular Policy,
            Elected Councils of the Spirit of Truth Native American Church; 2)
            The Lodge Chapter Council (where counsel pertains solely to the
            organized Lodge Chapters of the Spirit of Truth Native American
            Church); 3), the District Council (where counsel pertains to the
            organized Spirit of Truth Native American Church District); 4) and
            the Great Council (where counsel pertains to all the Members as a
            body).
            <p className="p_text"></p>
            <span style={{ fontWeight: "bold" }}>Article Three:</span>Districts
            and Lodge Chapters of the Spirit of Truth Native American Church
            shall be organized, amended, and expanded upon according as the
            President and/or Great Councils are moved upon by the Creator as
            they are guided by Holy Spirit. Lodge Chapters and Districts of the
            Spirit of Truth Native American Church shall be organized following
            the model provided by the Creator, i.e., appointment by the
            Presiding High Priest (President of the Church), as found in our
            Scriptures. This model may be amended and expanded upon according as
            the President of the Church is moved upon by the Creator.
            <p className="p_text"></p>
            <span style={{ fontWeight: "bold" }}>Article Four:</span> There
            shall be no form of bond servitude or slavery among the Spirit of
            Truth Native American Church. This shall apply both to persons, as
            well as economies. Should a member of the Spirit of Truth Native
            American Church be found guilty by Disciplinary Council of offense
            not worthy of expulsion, and service is required of that person to
            retain his/her membership, the member shall render that service
            without compulsion. That person shall also be given the alternative
            of not performing the service and, should the alternative be chosen,
            that member shall be expelled from the Spirit of Truth Native
            American Church.
            <p className="p_text"></p>
            <span style={{ fontWeight: "bold" }}>Article Five:</span> No title
            of nobility shall be granted by the Spirit of Truth Native American
            Church. Rather, all men and women shall stand as equals before their
            Creator. There shall be no class or caste. Titles of elected or
            honorary vocation or profession, such as “Elder” or “Chief” shall
            not be construed as title of nobility, for they are derived by the
            Common Consent of the Spirit of Truth Native American Church
            (consensus) and may be removed by the same principle.
            <p className="p_text"></p>
            <span style={{ fontWeight: "bold" }}>Article Six:</span> The
            District Council shall exercise oversight over its own Spirit of
            Truth Native American Church District. Should any Spirit of Truth
            Native American Church District member have any disputation with any
            other, and that dispute cannot be settled between the parties, the
            matter shall be taken up by the Disciplinary Council or Arbitration
            Council as provided in the Spirit of Truth Native American Church
            Code of Ethical Conduct. Disputes within an organized Lodge Chapter
            shall be handled in the same manner – the Principal Stone Carrier,
            First Advisor, and Second Advisor constituting the Council.
            Decisions by such Councils are final. This pattern shall be followed
            by all other organizational units of the Spirit of Truth Native
            American Church, as provided in the Spirit of Truth Native American
            Church Code of Ethical Conduct.
            <p className="p_text"></p>
            <span style={{ fontWeight: "bold" }}>Article Seven:</span> No person
            shall be allowed to represent or speak for and on behalf of another
            in any disputation in the Councils, but must present his or her own
            case in his or her own words. Proxy is not considered "disputation"
            and is the exception rather than the rule. It is generally
            understood that where fear of bodily or emotional harm might result
            because of personal appearance in such Councils, the individual’s
            voice may be heard through a designated Proxy, but such Proxy may
            only read the information provided by the Party and must not
            “represent” the Party.
            <br />
            <br />
            No priestly class of attorneys and judges shall be created or
            allowed to develop within the communities. Instead, the Council
            shall appoint a clerk who shall have the keeping of the records of
            the counsels rendered by it and shall assist the Council in its own
            analysis of the counsels as the Council shall deem necessary. The
            clerk shall not have any vote in the Council and shall not speak for
            any member or for the Council in any matter before the Council. The
            clerk’s term of office shall be whatever the Council deems
            appropriate and, since the clerk is not an elected officer of the
            District, he or she may be released by the Council at any time
            without cause. Neither the Council nor the Clerk shall receive any
            remuneration for their services to the District or Chapter, but such
            service shall be attributed to them as part of their covenant
            donation.
            <p className="p_text"></p>
            <span style={{ fontWeight: "bold" }}>Article Eight:</span> Every
            member is entitled to their living and is free to enter into
            personal contracts, do personal business, and own and dispose of
            personal property as he or she sees fit. Members are reminded that
            all benefits, services, or security the Spirit of Truth Native
            American Church might offer in time of need, are provided by the
            Covenant Donations of the Church. One should consecrate regularly to
            the Principal Stone Carrier of the Lodge Chapter, and/or the
            Roadperson of the Spirit of Truth Native American Church District,
            the Chiefs of the Administrative Departments, and/or the President
            of the Spirit of Truth Native American Church, from out of the
            surplus of one’s work product, either in money, kind, or in service,
            whichever may be deemed most appropriate. Since the Spirit of Truth
            Native American Church does not have a paid clergy, all donations
            are used to run the programs of the Church. Neither the Principal
            Stone Carrier of the Chapter, the Roadperson of the District
            Council, the President of the Spirit of Truth Native American
            Church, or the Councils shall decide the nature, amount, or
            appropriateness of any member’s Covenant Donation. They may make
            recommendations when desired, but they may not dictate the amount or
            kind of the offering.
            <br />
            <br />
            It is our practice to make provision for dependent members from the
            Covenant Donations. All provisions will be reasonable in view of
            their general level of living and will be done for a period of time
            deemed to be substantial. Any dependents of a member of the Church,
            regardless of their own personal membership status, will be provided
            for until such a time as they are legally able to provide for
            themselves. No individual shall be compelled or forced to enter into
            the membership of the Church. It is an individual’s right, given to
            them by the Creator, to choose their own path of worship. All
            membership privileges, as well as security in a time of need, shall
            first be extended to covenant members and their dependents before
            being offered to those who are not members of the Church.
            <br />
            <br />
            The members of the Church shall have the power to solicit and accept
            appropriations from the Principal Stone Carrier of their Lodge
            Chapter, their District, and from the President of the Church. All
            Lodge Chapter and District expenses, if any, shall be paid by the
            Principal Stone Carriers or the District Roadpersons with funds
            obtained from the Covenant Donations of the Lodge Chapter or
            District members. The District Chiefs and the Principal Stone
            Carriers shall safeguard the accounts and make money or kind
            available to the Councils as appropriate. The President of the
            Church shall have authority to administrate the funds received
            through such programs as are under his/her personal direction and
            distribute them as the Council for that project deems appropriate.
            These are dedicated funds under the direct administration of the
            President. Administrative Chiefs shall follow this pattern also.
            Donations that have not been used or assigned for use by the end of
            a given calendar year should be remitted to the President of the
            Church to assist the Church Entire.
            <br />
            <br />
            The President and the Great Council shall have the power to apply
            for and accept appropriations from the District and Lodge Chapter
            Councils. The President and the Councils shall have no power to lay
            and collect taxes, duties, imposts and excises, or membership fees,
            but may set up dedicated, voluntary funds for specific purposes
            which shall be accounted separately from the Covenant Donation.
            <br />
            <br />
            If the District members want programs and services, they will
            provide for them through the Covenant Donations and Dedicated Funds.
            The Councils shall impose no programs and services upon the members
            for which they are not willing to voluntarily donate. This is in
            accordance with the ancient practice of the Sacred Giveaway and is a
            vital tenet of our traditional beliefs, faith, spirituality, and
            sacred practices. It is generally understood that the Spirit of
            Truth Native American Church Members shall not expect or demand
            programs or services from the Spirit of Truth Native American Church
            or its Officers that they are not willing to support through
            Covenant Donation.
            <br />
            <br />
            All Lodge Chapters, Districts, and all other Organizations must keep
            records of all donations given directly to them. The donations must
            include the date, the type of donation, and who was the donating
            party when appropriate. They must also keep records of all expenses
            paid and the expenses must include the date, amount paid, and
            purpose of the expense. Once a year, between January 1st and January
            30th, all donations and expenses from the previous year must be
            reported to the President of the Church or his assigned.
            <br />
            <br />
            <p className="p_text">
              <span style={{ fontWeight: "bold" }}>Article Nine:</span>Men,
              women, youth, and children are members only of the District and
              Lodge Chapter of the Spirit of Truth Native American Church in
              which they reside unless otherwise assigned by the President of
              the Church by special dispensation. If a person resides where no
              Lodge Chapter or District is organized, he or she may become a
              member of the nearest duly organized Unit of the Church until such
              time as one is organized in their own area.
              <br />
              <br />
              Members recognize that it is their responsibility to see to it
              that Lodge Chapters are organized in every place where the Spirit
              of Truth Native American Church resides and that regular Lodge
              Chapter Programs are ongoing. Should they decide to move from one
              Lodge Chapter to another, they shall not be considered a Member
              until they have met with the Principal Stone Carrier of that Lodge
              Chapter and have committed themselves to that Lodge Chapter’s
              unifying purpose, by covenant, and to faithfully support the Lodge
              Chapter through participation in that Lodge Chapter’s meetings or
              the Sacred Giveaway.
              <br />
              <br />
              If a member wishes to be a member of the District but not of a
              given Lodge Chapter, they are free to do so. Commitment to the
              District shall be by Covenant as heretofore set forth. In other
              words, there are no membership dues or fees per se. The Members
              support the Lodge Chapter and District individually with Sacred
              Giveaway Donations, which are considered Offerings and Tithes of
              the Church and its Affiliate Agencies. When a Member has allowed
              their activity in the Church to lapse, or when they have quit one
              Lodge Chapter and wish to become part of another, they should
              personally meet with the Principal Stone Carrier of the Lodge
              Chapter they wish to attend to receive fellowship, guidance, and
              Lodge Chapter assignments if appropriate.
            </p>
            <p className="p_text">
              <span style={{ fontWeight: "bold" }}>Article Ten:</span> The peace
              and order of the Spirit of Truth Native American Church is the
              responsibility of each Member singly as also in unity. Resolution
              of disputes shall first be attempted between the parties, as is
              fitting in a Covenant Society. If disputes arise that cannot be
              resolved between the parties, they shall be taken before the
              appropriate Disciplinary Council of the Spirit of Truth Native
              American Church as provided herein.
              <br />
              <br />
              No crime shall be deemed violent unless by it a person willfully
              and knowingly renders another physically unable to make a living,
              or acts in a manner that might give threat of doing so. Murder,
              rapine, abuse of a child or of a weaker person, sexual abuse of
              any kind, upon man, woman or child, as well as any act of mayhem,
              and so forth shall be deemed as a criminal action and the
              person(s) engaging in those action(s) as criminal(s). Such
              criminals shall be expelled from the Spirit of Truth Native
              American Church and delivered to the appropriate authority, or to
              nature in the event that no other authority exists. Re-entry will
              only be at the discretion of the President of the Church.
              Notwithstanding, be it known therefore, the Spirit of Truth Native
              American Church maintains a zero-tolerance policy regarding such
              things which shall be exercised without mitigation. This is the
              generally accepted understanding of the term “Injury” as it is
              used in the Spirit of Truth Native American Church Councils.
            </p>
            <p className="p_text">
              <span style={{ fontWeight: "bold" }}>Article Eleven:</span> Spirit
              of Truth Native American Church Districts and Lodge Chapters are
              self-governing. No District or Lodge Chapter shall exercise rule
              or compulsion over another. All Districts and Lodge Chapters may
              participate in the Great Council by sending duly elected Delegates
              to them. Any District or Lodge Chapter may, by a vote of
              consensus, decide not to participate in Great Council. Those who
              decide not to participate shall still be considered alone among
              friends and shall not be shunned. Nevertheless, they shall not
              enjoy the spiritual blessings and privileges afforded those
              participating in Great Councils.
            </p>
            <p className="p_text">
              <span style={{ fontWeight: "bold" }}>Article Twelve:</span>{" "}
              Councils shall offer no counsel regulating or abridging the
              freedom of speech, or of the right of the people peaceably to
              assemble, and to petition the Councils for a redress of
              grievances.
            </p>
            <p className="p_text">
              <span style={{ fontWeight: "bold" }}>Article Thirteen:</span> The
              enumeration in this Constitution of certain rights shall not be
              construed to deny or disparage others retained by the members.
              Neither shall any enumeration of any rights serve to make those
              rights automatically under the regulatory power of the Councils.
              In other words, to be able to enumerate the rights and privileges
              of the people shall not give the Councils the authority to take
              away or restrict those rights.
            </p>
            <p className="p_text">
              <span style={{ fontWeight: "bold" }}>Article Fourteen:</span> T
              The right to vote shall be dependent upon age and upon the
              commitment by the member to the District and/or Lodge Chapter in
              which the Member resides, and shall not be denied or abridged in
              any way, on account of race, color, religions joined, creed,
              sexual orientation or other purely personal and private matter, or
              whether they are male or female. It is generally understood that a
              member’s failure to maintain active participation in the Church
              should automatically abrogate the right to vote in any Council of
              the Spirit of Truth Native American Church or to receive the
              Spirit of Truth Native American Church services, but does not
              cancel Membership or constitute base and grounds for expulsion
              from the Spirit of Truth Native American Church. However, every
              member must choose for themselves, as directed by the Spirit,
              their own right to vote or receive the Spirit of Truth Native
              American Church services.
            </p>
            <p className="p_text">
              <span style={{ fontWeight: "bold" }}>Article Fifteen:</span> The
              right of Members to choose their method and kind of medicine,
              Sacrament, Ceremonies, and so forth shall not be denied or
              abridged in any way and the Councils shall not enact any counsel
              that shall place one profession or modality of healing over any
              other, except when such professions or modalities tend to render a
              person unable to earn a living, or when they threaten to do so.
              <br />
              The President of the Church shall have the right to create and
              control curriculum for the training of ministers and
              administrators in the Church, but they shall not have the right to
              dictate any person’s choice of modalities, individual sacraments
              or ceremonies, insofar as such things do not constitute or tend
              toward injury, or threat of injury as provided herein.
            </p>
            <p className="p_text">
              <span style={{ fontWeight: "bold" }}>Article Sixteen:</span>{" "}
              Spirit of Truth Native American Church may provide schools for the
              education of children, but the right of Members to choose to
              provide education for their own children shall never be denied or
              abridged.
            </p>
            <p className="p_text">
              <span style={{ fontWeight: "bold" }}>Article Seventeen:</span>{" "}
              There shall be no “Parens Patre” counsels. The natural, or duly
              adopted, parent of a child shall at all times be considered
              sovereign of his or her own home. No Council of the Spirit of
              Truth Native American Church shall at any time consider itself
              greater, wiser, more prudent, or more intelligent than the parent,
              except in the case of violent crime, as defined herein. The parent
              who is convicted by Council of violent crimes against a child
              shall not be considered competent to parent, shall be cast out
              from among the Spirit of Truth Native American Church, shall have
              no place within any Lodge Chapter or District of the Spirit of
              Truth Native American Church, shall be surrendered to the
              appropriate authority, or to nature in the absence thereof, and
              the child so injured shall be surrendered to the non-offending
              parent. In the event that both parents do commit violence upon
              their child, they shall be surrendered to the buffetings of nature
              and of a hostile world and the child shall be given sanctuary by
              the Church and shall be succored as deemed appropriate by the
              District through the principle of Making Relations, where allowed.
              Where such adoption is not allowed, the child shall be surrendered
              to the appropriate (civil) authority. It is our practice to make
              provision for anyone given sanctuary by the Church from the
              Covenant Donations. All provisions will be reasonable in view of
              their general level of living and will be done for a period of
              time deemed to be substantial. Anyone given sanctuary by the
              Church, regardless of their own personal membership status, will
              be provided for until such a time as they are legally able to
              provide for themselves and sanctuary is no longer desired.
            </p>
            <p className="p_text">
              <span style={{ fontWeight: "bold" }}>Article Eighteen:</span> This
              constitution may be amended by the Great Council Conference of the
              Spirit of Truth Native American Church and such amendment shall
              take effect only upon consensus of the Delegates of the Spirit of
              Truth Native American Church assembled in Conference. The
              President of the Church is authorized to edit and clarify this
              Constitution when necessary, so long as the original intent of the
              Great Council is not contradicted by such editing.
            </p>
            <p className="p_text">
              <span style={{ fontWeight: "bold" }}>Article Nineteen:</span> No
              Tribal Councils or Governments, be they federally or otherwise
              recognized, individual Church Member, Lodge Chapter Council,
              District Council, or General Council shall have authority to enter
              into contracts or treaties which bind the Spirit of Truth Native
              American Church as a whole. Only the Talking Feather of the Great
              Council of the Spirit of Truth Native American Church may enter
              into such arrangements.
            </p>
          </p>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
