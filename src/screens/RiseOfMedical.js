import React from "react";
import { Container } from "react-bootstrap";
// import { Link } from 'react-router-dom';
import Medicine from "../assets/Medicine.png";
import Footer from "../components/footer";
import "../css/RiseofMedical.css";
import NavbarComp from "../components/navbar";

export default function RiseOfMedical() {
  return (
    <div id="Top">
      <NavbarComp />
      <div>
        <img src={Medicine} style={{ width: "100%" }} alt="" />
      </div>
      <Container style={{ padding: 15 }}>
        <p id="RiseOfMedicalText">Rise of the Medical Epidemic</p>

        <div style={{ textAlign: "center" }}>
          <p id="RiseofMedical_Tagline" style={{ fontSize: "16px" }}>
            by Paway-yatanaut way-akt, Medicine Woman Practitioner and Man Found
            Standing, Medicine Man Practitioner
          </p>
          <p id="RiseofMedical_Tagline" style={{ fontSize: "16px" }}>
            First published in 2015.
          </p>
        </div>

        <p id="paragraphStyle" className="p_text mt-3">
          Over the last decade, the United States government has increased its
          interference with our personal health freedoms. There have been many
          laws secretly passed regulating how citizens can use and talk about
          the healing, properties of plants, and the therapeutic benefits of
          alternative health care devices. The laws have gotten so bad that your
          grandmother technically is committing a felony, practicing medicine
          without a license, every time she suggests that her chicken soup will
          make you feel better.
        </p>
        <p id="paragraphStyle" className="p_text">
          If you have been watching carefully you will also have noticed the
          government has been steadily moving forward their agenda of forced
          vaccines.
        </p>
        <p id="paragraphStyle" className="p_text">
          With a century worth of scientific research showing that vaccination
          has become the problem and is no longer a solution, why would they
          continue to push such an unhealthy practice?
        </p>
        <p id="paragraphStyle" className="p_text">
          Early in the 20th Century, natural practitioners were twice as large
          as those practicing allopathic medicine. Between the years 1910 to
          1925, the laws were dramatically changed through the influence of the
          financially elite and the American Medical Association. Because of
          these new laws, all but twenty-five percent of the existing medical
          schools were shut down. With this single attack, the financially elite
          took over medicine in the United States.{" "}
        </p>
        <p id="paragraphStyle" className="p_text">
          Back in 1983, the World Health Organization (WHO) set forth its
          program to vaccinate the world’s children. One year later the UN
          passed laws that basically replaced any rights and authority of the
          parents over their child’s health care and gave that authority to the
          WHO.
        </p>
        <p id="paragraphStyle" className="p_text">
          In 1997 the financially elite further extended their control through
          WHO in their the Declaration of Alma Alta. WHO, through the United
          Nations, imposes its control of the world’s health policies and forces
          all governments to comply. They now imposed the “scientific” medicine
          as the ONLY valid system of medicine. Since the manipulation of
          scientific evidence is geared towards the ones funding the research,
          literally the financially elite control the system of medicine as they
          desire. Again following the money trail shows that all this is done
          for financial reasons not the welfare of people.
        </p>
        <p id="paragraphStyle" className="p_text">
          The control of our individual and family’s health freedoms has
          basically vanished except for some protections found in religious
          worship. The financially elite influence the politicians that in turn
          make laws that further strengthen the elites' control over the system.
          Vaccinating the masses is a major agenda for the ruling elite because
          huge profits are reaped for Big Pharma and profit-generating side
          effects.
        </p>
        <p id="paragraphStyle" className="p_text">
          For example, every few years you will hear of a new pending epidemic.
          Remember the Swine Flu epidemic, then the Bird Flu epidemic, and now
          the Zika epidemic. Remember all the the little scares in between like
          “flu season will be particularly hard this year so get your
          vaccination now.” Why does this happen? Simple math.
        </p>
        <p id="paragraphStyle" className="p_text">
          When you hear the media spewing out the latest health concern,
          remember that Big Pharma immediately generates revenue with their
          upwards of 100 times profit margin for one single vaccine. A vaccine
          can generate tens of billions of dollars in profit. The swine flu
          vaccine alone generated Big Pharma over 100 billion dollars in profits
          in a short period of time.
        </p>
        <p id="paragraphStyle" className="p_text">
          The huge immediate profits for a vaccine are not even close to being
          the most lucrative reason for Big Pharma’s vaccination agenda. Nearly
          all of the vaccines created also include toxic substances like mercury
          (cleverly hidden under the name thimerosal). Vaccines, through
          billions of dollars in scientific research, have been proven to
          “confuse” the body’s immune system and cause the immune response to
          focus only on the specific vaccine antigen. These vaccination issues
          create major long-term harmful effects on the body’s overall health.
        </p>
        <p id="paragraphStyle" className="p_text">
          Fact: Why are the vaccine makers and federal officials exempted from
          lawsuits involving their vaccines? The simple answer is, they know the
          harmful effects that their vaccinations cause and they do not want to
          be held liable for their deception. Legally they get all the profit
          and none of the responsibility.
        </p>
        <p id="paragraphStyle" className="p_text">
          The long-term harmful effects of vaccination secondarily allow Big
          Pharma to continue to supply more of their other products all
          throughout your life. To those who have not yet looked into these
          non-transparent issues, products may be seen as beneficial, but in
          reality, it further reduces your body’s ability to maintain optimal
          health. The medical coercion feeds off of the people causing the
          unsuspecting public to be continually dependent on the system. The
          coercion has shown time and time again that profit is more important
          than people.
        </p>
        <p id="paragraphStyle" className="p_text">
          Now Big Pharma is moving into the natural health industry. Over the
          last few years, they have been purchasing large natural health
          companies and lobbying for new laws. They are slowly positioning
          themselves to control this market as well.
        </p>
        <p id="paragraphStyle" className="p_text">
          It is only in taking back your personal health freedoms that your
          optimal health can be achieved. The body has the ability to heal
          itself given the proper building blocks. Immune modulation and the
          stem cell activation this ensues shows nature is the key to optimal
          health. God’s creations can solve the problems of epidemics,
          vaccinations, and they are exponentially more effective than whatever
          solutions Big Pharma can provide.
        </p>
      </Container>
      <Footer />
    </div>
  );
}
