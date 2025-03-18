// import { ArrowForward } from '@material-ui/icons'
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React, { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import topbar from "topbar";
import HomePage from "../assets/HomePage2.png";
import homepagePoster from "../assets/homepagePoster.png";
import Footer from "../components/footer";
import NavbarComp from "../components/navbar";
import "../css/homepage.css";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Home() {
  const history = useHistory();
  // const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    {
      /*topbar.config({
      autoRun: false,
      barThickness: 3,
      barColors: {
        0: 'rgba(26,  188, 156, .9)',
        '.25': 'rgba(52,  152, 219, .9)',
        '.50': 'rgba(241, 196, 15,  .9)',
        '.75': 'rgba(230, 126, 34,  .9)',
        '1.0': 'rgba(211, 84,  0,   .9)',
      },
      shadowBlur: 10,
      shadowColor: 'rgba(0,   0,   0,   .6)',
    });
    topbar.show();
    (function step() {
      setTimeout(function () {
        if (topbar.progress('+.01') < 1) step();
      }, 30);
    })();
    setTimeout(() => {
     topbar.hide();
    }, 3000);*/
    }
  });

  return (
    <div id="Top">
      {/* {!isLoading && <> */}
      <NavbarComp />
      <img
        src={HomePage}
        style={{ width: "100%", height: "60vh", objectFit: "cover" }}
        alt=""
      />
      <Container id="welcomeContainer" style={{ padding: 15 }}>
        <p id="welcome">Welcome</p>
        <br></br>
        <br></br>
        <p id="welcomeText">
          We are a legally established, authorized and independent Native
          American Church that desires to protect and restore to the world our
          religious, cultural, and personal freedoms.
        </p>
        <div id="boxesParentDiv">
          <div id="boxes" className="pt-3">
            <span>
              Authority Page&nbsp;&nbsp;
              <ArrowForwardIcon />
            </span>
            <HashLink to="/Authority#Top">
              <Button>See Details</Button>
            </HashLink>
          </div>
          <div id="boxes" className="pt-3">
            <span>
              Ethical Page&nbsp;&nbsp;
              <ArrowForwardIcon />
            </span>
            <HashLink to="/Ethical#Top">
              <Button>See Details</Button>
            </HashLink>
          </div>
          <div id="boxes" className="pt-3">
            <span>
              Constitution Page&nbsp;&nbsp;
              <ArrowForwardIcon />
            </span>
            <HashLink to="/Constitution#Top">
              <Button>See Details</Button>
            </HashLink>
          </div>
        </div>
        <p id="paragraphStyle" className="p_text mt-2">
          {/* The Creator has allowed us free choice and the health of the body, the
          mind, the spirit, the community, the society, and the planet are
          direct consequences of the choices each person makes. Sadly, because
          of governmental monetary, and political whims, new laws that control
          and enslave the population continue to "creep" into our legal system.
          Whether it is forced mandates or other new laws that have classified
          natural substances, like essential oils, herbs, and other plants, to
          be illegal when used above 3% strength for healing purposes. Over the
          decades many new enslavement laws were "sneaked" into our legal system
          and we continually see new steps to take away our God-given freedoms. */}
          We are followers of{" "}
          <a target="_blank" href="/Yeshua" className="text-blue-800">
            Yeshua/Jesus
          </a>{" "}
          and strive to learn from the Creator through his Creations. Our
          members are encouraged to develop a personal relationship with the
          Creator and use the Spirit as their guide on the Sacred Way. Despite
          the blatant lies and{" "}
          <a target="_blank" href="/prejudices" className="text-blue-800">
            prejudices
          </a>{" "}
          that abound in this world, members are encouraged to listen to the
          Spirit and follow their unique path. (Daniel 12:3) The Creator has
          allowed us free choice. The health of the body, the mind, the spirit,
          the community, the society, and the planet are direct consequences of
          the choices each person makes. Sadly, because of governmental
          controls, monetary policy, political whims, and prejudices new laws
          that control and enslave the population continue to "creep" into our
          legal system. They may claim they are for our good, but we know they
          ultimately lead to controlling the world and persecuting the
          righteous. (Revelation 13:7, 16-17) Whether it is forced mandates or
          other laws that have classified natural substances, like essential
          oils, herbs, and other plants to be illegal when used above 3%
          strength for healing purposes, these controlling forces go against the
          Creator&apos;s will. Over the decades many new enslavement laws have
          been "sneaked" into our legal system and we continually see new steps
          to take away our God-given freedoms. (Ephesians 6:12)
        </p>
        <div id="riseOfMedicalEpidemicSection">
          {/* <p
            id="paragraphStyle"
            style={{
              color: "#AA3C3C",
              fontSize: "16px",
              fontWeight: "bold",
              width: "80%",
              margin: "0 auto",
            }}
          >
            For example, even a full-blooded, tribal card-carrying, licensed
            Native American massage therapist is at risk of being sent to
            federal prison if they use therapeutic essential oils on any client
            off their reservation. Yes, this probably has never happened yet,
            but there have been some quite strange happenings like this when
            healers have taken clients away from the money-hungry corrupt
            bureaucracy of big pharma and the medical establishment.
          </p> */}
          <p
            id="paragraphStyle"
            style={{
              color: "#AA3C3C",
              fontSize: "16px",
              fontWeight: "bold",
              width: "80%",
              margin: "0 auto",
            }}
          >
            Example One: A licensed massage therapist is at risk of being sent to federal prison if they use pure essential oils on any client. Yes, this probably has never happened, but some strange happenings like this have occurred. When Natural Healers have taken clients away from money-hungry corrupt people/establishments, many legal issues arise. (Being a member of the Church can legally offer protection from legal issues like this.)
          </p>
          <br/>
          <p
            id="paragraphStyle"
            style={{
              color: "#AA3C3C",
              fontSize: "16px",
              fontWeight: "bold",
              width: "80%",
              margin: "0 auto",
            }}
          >
            Example Two: Many children have been kidnapped by the establishment because the parents have a different view on how their children should receive medical care. Parents have lost their children to foster care and even had the government deny them visitation rights all because the parents do not want their child to undergo harmful and potentially fatal treatments. Any parent who would much rather have their child undergo natural treatments, even when proven to be safer and more effective, can lose their child! (Being a member of the Church can legally offer protection to you and your child.)
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HashLink to="/RiseofMedical#Top">
            <Button
              id="signinBtn_Big"
              // onClick={() => history.push('RiseofMedical')}
              style={{ width: 300, margin: 15, background: "#18498B" }}
            >
              Rise of the Medical Epidemic
            </Button>
          </HashLink>
        </div>
        <p id="paragraphStyle" className="p_text">
          For thousands of years, the Creator's healing modalities have been
          used by native peoples. Now because of the spiritual wickedness in
          high places (Ephesians 6:12), governments around the world continue to
          make many of the Creator’s divine gifts illegal. (Just like peyote,
          ayahuasca, and many other plant remedies were classified illegal many
          decades ago, they are moving to take complete control over all of the
          natural and alternative healing modalities.)
        </p>
        <p id="paragraphStyle" className="p_text">
          Because of the many losses of freedom, many people and Natural Healers
          run to the freedom of religion exemption to find safety. Sadly,
          because of the court cases where judges have dictated peoples’
          religious beliefs and the established rules that govern what your
          protection under these religions can be, those organizations have
          fallen short in their protection and many people have been harmed.
          Even if the rulers in “high places” may have good intentions to help
          or protect people, when they use their power over people to force,
          evil can come from this.
        </p>
        <div id="textImgParentDiv">
          <img id="imageandText_img" src={homepagePoster} alt="" />
          <div id="imageandText_text">
            <p
              id="paragraphStyle"
              style={{ fontWeight: 800, color: "#AA3B3B", fontSize: "16px" }}
            >
              Example Three: Did you know that it is perfectly legal for the U.S.
              government to perform harmful and deadly medical experimentation
              on its citizens?
            </p>
            <p
              id="paragraphStyle"
              style={{ fontWeight: 800, color: "#AA3B3B", fontSize: "16px" }}
            >
              They have legally performed biological warfare experiments, forced
              inoculations with potentially harmful and deadly vaccines, forced
              citizens to undergo deadly unnecessary medical treatments, and
              many more health and welfare injustices all in the guise of trying
              to understand more and protect the masses. (We believe forcing a
              few to be sacrificed for the good of many is evil. However, giving
              the few free choice to assist the many is right.)
            </p>
          </div>
        </div>
        <div id="shortdiv_text">
          <p
            id="paragraphStyle"
            style={{
              fontWeight: 800,
              color: "#AA3B3B",
              fontSize: "16px",
              marginTop: "25px",
            }}
          >
            Example Four: Many people have tried to use their religion as a legal
            defense for practicing their healing modalities. In times past a
            natural healer could say, “I am a Christian,” and then use that
            religion as a way to stop specific medical actions or allow them to
            perform specific healing treatments on others.
          </p>
          <br/>
          <p
            id="paragraphStyle"
            style={{ fontWeight: 800, color: "#AA3B3B", fontSize: "16px" }}
          >
            This defense has failed in court and precedence has been established
            where a judge can interpret your religious beliefs for you. Using
            the Christian defense above, the judge can simply say, “I am a
            Christian too and I don’t believe the same way you do so your
            defense is not valid.”
          </p>
          <br/>
          <p
            id="paragraphStyle"
            style={{ fontWeight: 800, color: "#AA3B3B", fontSize: "16px" }}
          >
            When asked about using religion as a defense, the honorable Judge
            Benjamin Zvenia said that he has never seen a church member (other
            than the Native American Church) win in court over the charge of
            practicing medicine without a license solely for religious
            exemption. For them to win they have always had to be licensed by a
            government-approved board for that healing modality.
          </p>
        </div>
        <p id="paragraphStyle" className="p_text">
          Sadly, here in the U.S.A. most of the religious organizations, even
          many of the so-called Native American Churches, that are spouting
          legal protection do not even meet the basic IRS and federal
          governments' requirements for that religious exemption for their
          members.{" "}
          <a className="text-blue-800" target="_blank" href="/IRS"> 
            (Click here to see our approved IRS recognition letter.) 
          </a>
        </p>
        <p id="paragraphStyle" className="p_text">
          With Spirit of Truth Native American Church, you can find the legal
          protection through Congressional Acts (where a judge cannot dictate
          your religious beliefs) and the United Nations that the Native
          Americans now enjoy.
        </p>
        <p id="paragraphStyle" className="p_text">
          {" "}
          When an individual joins our church through the Spiritual Adoption
          process, they make declarations that their intentions are religious
          and sincere. Once adopted they have now been deemed an “Indian” under
          the law and are protected from many unethical yet legal governmental
          practices.
        </p>
        <p
          id="paragraphStyle"
          style={{
            fontWeight: 800,
            color: "#AA3B3B",
            fontSize: "16px",
            width: "70%",
            margin: "0 auto",
          }}
        >
          Example Five: The forcing of any “Indian” by the conquering government to
          participate in medical treatments or a forced vaccination process is
          considered “Ethnic Cleansing” under World Law.{" "}
          <a className="text-blue-800"
            target="_blank"
            href="https://www.un.org/development/desa/indigenouspeoples/declaration-on-the-rights-of-indigenous-peoples.html"
          >
            (Click here to read more.)
          </a>
        </p>
        <div id="joinNowSection">
          <p id="paragraphStyle" className="p_text mt-3">
            Join the Spirit of Truth Native American Church religious movement
            and take a stand to protect our Healing Ministry, Traditions,
            Ceremonies, and Religious Freedom! We desire all peoples around the
            world to be fully protected under the law to follow their religion
            and to use their healing modalities.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HashLink to="/Signup#Top">
            <Button
              id="signinBtn_Big"
              style={{ width: 120, margin: 15, background: "#18498B" }}
            >
              Join Now
            </Button>
          </HashLink>
        </div>
        <p id="paragraphStyle" className="p_text">
          For thousands of years, the Native American religions did not dictate
          any official religious dogma over their members, ministers, and
          healers. Often different Native American Churches had conflicting
          beliefs, like different colors or totems used to represent the
          Medicine Wheel, but they would allow their followers to choose for
          themselves the way to worship. In February 1992 a press conference on
          Indigenous Religious Freedom was held where Reuben Snake said, “In
          1492 from the Bering Straits to Terre de Fuego this part of Creation
          was a totally brown universe. And regardless of where our ancestors
          lived, whether it was the Alaskan tundra, or on the mountain tops, or
          on the desert floor, or in the rainforest, wherever they lived they
          had one world view, that there was a Creator of all things and he was
          responsible for the Creation. And that it was our responsibility and
          our duty to find our place within this Creation to live in peace and
          harmony. And I have yet to have proven to me that those people in
          those times ever tried to impress one another with their own
          particular spiritual beliefs and practices to say that, ‘My way is
          better than your way.’”
        </p>
        <p id="paragraphStyle" className="p_text">
          Sadly, in modern times there has been a movement to control or
          restrict beliefs in some of the Native American Churches. Also, some
          Native American Churches or Government Recognized Tribes think they
          have the authority to dictate their opinions and beliefs to other
          Native American Churches.
        </p>
        <div style={{ width: "80%", margin: "0 auto" }}>
          <p
            id="paragraphStyle"
            style={{ fontWeight: 800, color: "#AA3B3B", fontSize: "16px" }}
          >
            Example Six: There are some Native American Churches that will not
            allow a “White Man” into their ceremony even though historically it
            has been proven that their ancestors did not follow that belief.
          </p>
          <br/>
          <p
            id="paragraphStyle"
            style={{ fontWeight: 800, color: "#AA3B3B", fontSize: "16px" }}
          >
            Example Seven: Some established Native American Churches think that
            all other Native American Churches should hold or run Peyote
            Ceremonies the way they do. They also issue edicts claiming to
            restrict other ceremonial sacraments from other church organizations
            just because the practice was lost or not a part of their tribal
            culture. This is like the Catholic Church issuing edicts against the
            Baptist Church or the Jews issuing edicts against all of
            Christianity. This type of thinking is just silly and not a
            Spirit-based way of running things.
          </p>
          <br/>
          <p
            id="paragraphStyle"
            style={{ fontWeight: 800, color: "#AA3B3B", fontSize: "16px" }}
          >
            Example Eight: The title of Native American Church has gotten the
            general misconception that it is a Peyote Religion. This is not the
            case. There are Native American Churches established in North
            America that have the direct “Indian Authority” that do not even use
            Peyote in their ceremonies. Just like there are numerous Christian
            Churches with different belief systems there are numerous Native
            American Churches with different general belief systems. The only
            requirement to be a “True Native American Church” is to have a line
            of authority duly established from any legally recognized Native
            American Church or conquering government-recognized tribe.
          </p>
        </div>
        <div id="joinSection">
          <p id="paragraphStyle" className="p_text">
            The Spirit of Truth Native American Church is a “Christian Creation
            Based Church“ that requires our members to be followers of{" "}
            <a className="text-blue-800" target="_blank" href="/Yeshua">
              Yeshua
            </a>{" "}
            and to agree to abide by the simple truths found in our{" "}
            <HashLink to="/Constitution#Top" className="text-blue-800">Constitution</HashLink> and{" "}
            <HashLink to="/Ethical#Top" className="text-blue-800">Ethical Code of Conduct</HashLink>. In
            following our ancestral traditions, we allow our members to exercise
            the freedom to follow the unique Spiritual Path the Creator has for
            them. (For example, members can choose to attend the Peyote or other
            bona fide ceremonies or not attend. Also, they can
            choose what authorized Church studies or Scriptures to learn from.)
            Members are encouraged to follow the dictates of their hearts as the
            Spirit directs and choose their own path of education, worship, and
            specific ministry as long as it does not conflict with our stated
            religious beliefs. Members are encouraged to follow the spiritual
            truths of our ancient Native American Ancestors from North, Central,
            and South America as well as the many different indigenous cultures
            from around the world. (The Creator truly loves all creation and
            shares many truths with all peoples around the world so that we can
            learn.)
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HashLink to="/Signup#Top">
            <Button
              id="signinBtn_Big"
              style={{ width: 120, margin: 15, background: "#18498B" }}
            >
              Join Now
            </Button>
          </HashLink>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
            flexWrap: "wrap",
          }}
        >
          <iframe
            id="iframe"
            src={"https://www.youtube.com/embed/M3AG28-njPE"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
          <iframe
            id="iframe"
            src={"https://www.youtube.com/embed/Gyeyt_cRu3E"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
      </Container>
      <Footer />
      {/* </>}
            {isLoading && <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1, height: "90vh" }}>
                <img src={loader} style={{ width: 300 }} />
            </div>} */}
    </div>
  );
}
