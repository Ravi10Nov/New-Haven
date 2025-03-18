// import jsPDF from "jspdf";
// import img from "./certificateLogo.jpg";

// export const ViewExemptionLetter = (
//   firstname,
//   spiritualname,
//   lastname,
//   certificateDate,
//   exemptionCertificateBody
// ) => {
//   console.log(typeof(exemptionCertificateBody));
//   const formatDate = (dateString) => {
//     const months = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     const date = new Date(dateString);
//     return `${
//       months[date.getMonth()]
//     } ${date.getDate()}, ${date.getFullYear()}`;
//   };

//   const doc = new jsPDF("portrait", "mm", "a4");
//   doc.addFont(
//     "LucidaHandwritingItalic",
//     "Lucida Handwriting",
//     "italic",
//     "StandardEncoding",
//     "base64-encoded-string"
//   );

//   // Add logo and church name
//   doc.addImage(img, "JPEG", 15, 15, 20, 20);
//   doc.setFontSize(18);
//   doc.setFont("helvetica", "bold");
//   doc.text("Spirit of Truth", 40, 25);
//   doc.setFontSize(16);
//   doc.setFont("helvetica", "bold");
//   doc.text("Native American Church", 40, 32);

//   // Add date and "To Whom It May Concern"
//   doc.setFontSize(12);
//   doc.text(`${formatDate(certificateDate)}`, 15, 50);
//   doc.text("To Whom It May Concern:", 15, 60);

//   // Letter content
//   const content = `I am writing this letter on behalf of ${firstname} '${spiritualname}' ${lastname} who is a member of our church and legally recognized as "Indian" under the law. Our church is legally established in the state of Missouri and other states with the direct authority originally passed down from Leslie Fool Bull who was the President of the Native American Church on the Rosebud Reservation of South Dakota. If you need proof of this line of authority, please contact me.

// We have religious teachings on diverse topics, numerous ceremonial and educational opportunities that are being organized, and perhaps most importantly our Constitution and the Code of Ethics that all members are expected to strive to live in harmony with. All the ethics, ceremonies, and teachings are predicated on the central principle of "first do good" in relation to their bodies, other people, and the Earth itself.

// As a Native American Church, we trust in the Creator and hold our bodies as the temples of our spirits. As such we are against practices that have the potential to do harm. As such the current practices of potentially harmful PCR swabs, immunizations, and masks go against our religious beliefs. Here are just a few reasons to support our beliefs:

// Many so-called "experts" have falsely claimed that the nasal swab poses no risk or "Does No Harm". This is ludicrous simply for some of the following reasons:
//    1. PCR Swabs contain the known carcinogenic of ethylene oxide.
//    2. Some test kits that were created by the "experts" were contaminated or deemed harmful by the CDC and the U.K.'s Department of Health.
//    3. According to a study from Trinity College in Dublin that appeared in the popular journal, "Nature", the PCR swabs may have been contaminated with dangerous nanoparticles that are known to alter DNA and cause brain damage.
//    4. The nasal swab procedure is often performed improperly by the trained staff and harm has occurred.

// The FDA has already approved a coronavirus saliva test that does not contain the potentially damaging effects and complies with our religious beliefs. We have no objection to doing the saliva test.

// There are many reasons why immunizations go against our religious beliefs. Below are a few of the most concerning:
//    1. The MRC-5, aborted fetal cells and other DNA, in the vaccines directly violate our religious views.
//    2. The latrogenic reactions immunizations ensue are a direct violation of our beliefs and the Ethical Code.
//    3. The immunization manufacturers do not comply with our Ethical Code of Conduct by knowingly releasing harmful products and not bearing the responsibility or liability for any injuries or deaths as a result.
//    4. Immunizations do not modulate the immune response; therefore they have the potential to do long-term harm.
//    5. Ruling authorities, medicine regulators, and Mainstream Media have repeatedly denied claims about highly toxic and conductive substances in immunizations, which is not the case. For example, only when the FDA was ordered by Federal Judge Mark Pittman to release hundreds of thousands of documents was Graphene Oxide exposed as to be a part of the Pfizer Covid-19 vaccine manufacturing process.

// Up to 2020, there were no comprehensive investigations as to the adverse health effects masks can cause. The World Health Organization recommended the use of masks for ill individuals and people in crowded places however their own scientific study showed no clear graspable benefit was derived from wearing masks. Even the World Health Organization's guidelines in April and June of 2020 highlighted the dangers of masks including self-contamination, breathing difficulties, false sense of security, headaches, facial lesions, dermatitis, acne, and even the increased risk of contamination due to improper mask disposal. Since many countries introduced the requirement to wear masks, even though they are ineffective for filtering out viruses, there now are scientifically proven related harmful side effects of wearing masks that go against our religious beliefs. The most concerning harmful effects that have shown up are:
//    1. Psychological deterioration
//    2. A drop in the body's oxygen intake and the rise of carbon dioxide.
//    3. Minor health effects such as headaches, elevated body temperature, fatigue, itching, and so forth.
//    4. More concerning health effects such as respiratory impairment, elevated blood pressure, elevated heart rate, dizziness, and so forth.

// We consider the practice of compelling immunizations, wearing harmful masks, and undergoing potentially harmful tests as all forms of trying to control and a form of slavery. According to the United Nations, this can also be seen as a form of Ethnic Cleansing as one group with power tries to control and impose their will onto others. The United Nations Declaration of the Rights of Indigenous Peoples as well as Federal Regulations allow us the freedom to practice our religion without harassment.

// There are many other reasons for use being against the practice of immunization, forced masking, and harmful testing but below are the two main excerpts from our Church's Constitution that specify clarify our position in this matter.

// - We believe that all people are free to choose and that the health of the body, the mind, the spirit, the community, the society, and the planet are direct consequences of the choices each person makes. All people have the inalienable right to freedom of choice and self-determination, in areas of family life, health, education, application of traditional values, beliefs, lifestyles and practices, as well as in community and national participation. The inherent dignity and equal and inalienable rights of the human family are the foundation of health, freedom, justice, peace, enlightenment, and harmony among all peoples. Without these values, humans are mere slaves, either of their fellow man and his expectations or society.

// - We believe it is our right as One People Walking the Earth to take care of ourselves, families, and the Spiritual Community as we feel called upon by the Spirit to do so. We oppose private, public, and government's influence, however well-intentioned, to interfere with our rights to govern ourselves and see their interference as a violation of the Creator's will and a form of enslavement. When a government tries to take ownership over our bodies or takes away the rewards of our labors with the promise to give them back to use sometime in the future, we see this as interference, a form of enslavement, and a violation of the Creator's will. Governments have shown to have a tendency to be wasteful, self-serving, and uncaring on most individual levels. We see that when people are allowed to care for themselves and uses the fruits of their labors, greater care of themselves, families, and Spiritual Community is the result in almost all cases. History has shown that the good intentions of governments have led to a form of enslavement and have always been disastrous to the people in the long run. Humanity has seen many millions of people needlessly die because of the many different government's enslavement policies. We regard the taking care of ourselves, families, and Spiritual Community in health, sickness, or old age as our religious obligation and object to interference by private, public, and governments. We are free Children of the Creator and are conscientiously opposed to any government requiring of an individual to take on medical treatments or make payments to a private or public insurance which makes payment in the event of death, disability, old-age, or retirement or makes payments toward the cost of, or provides services for, medical care, (including the benefits of any insurance system established by the Social Security Act). We are conscientiously opposed to mandated or forced vaccinations or other medical treatments. We recognize the Creator is our provider and not a government and we are conscientiously opposed to governments placing us into any form of slavery. As One People Walking the Earth we take care of ourselves and Spiritual Families as we feel called upon by the Holy Spirit. All members have claim upon the Church for assistance when needed.

// Also, some so-called vaccines are not really vaccines but Gene Therapy or other such treatments that fall under the Nuremberg Code on Medical Experimentation. It should be clear to all Medical Doctors, Nurses, and other Medical Personnel that the Nuremberg Code on Medical Experimentation is encompassed by and covered by the Hippocratic Oath which all Medical Doctors swear an Oath upon graduation from Medical School.

// If you have further questions about our legal right to be exempted from the practice of immunization, PCR swabs, or masks, please contact me.

// Sincerely,`;

//   doc.setFontSize(11);
//   const splitContent = doc.splitTextToSize(content, 180);

//   // Add content to pages
//   let y = 70;
//   splitContent.forEach((line) => {
//     if (y > 280) {
//       doc.addPage();
//       y = 20;
//     }
//     doc.text(line, 15, y);
//     y += 5;
//   });

//   // Signature and contact info
//   doc.setFont("Lucida Handwriting", "italic");
//   doc.setFontSize(24);
//   doc.setTextColor(0, 0, 255);
//   doc.text("Man Found Standing", 15, y + 10, { angle: 2.5 });

//   doc.setTextColor(0);
//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(11);
//   doc.text("Man Found Standing", 15, y + 20);
//   doc.text("Principal Medicine Chief", 15, y + 26);
//   doc.text("PO Box 2045", 15, y + 32);
//   doc.text("Ava, MO 65608", 15, y + 38);
//   doc.text("Email: Admin@SpiritofTruthNativeAmericanChurch.org", 15, y + 44);

//   const filename = `Welcome_Letter_${firstname}_${lastname}.pdf`;
//   const pdfBlob = doc.output("blob", filename);
//   const pdfUrl = URL.createObjectURL(pdfBlob);
//   const newTab = window.open(pdfUrl, "_blank");

//   if (newTab) {
//     newTab.focus();
//   } else {
//     console.error(
//       "Unable to open new tab. Please check your browser settings."
//     );
//   }
// };




// import jsPDF from "jspdf";
// import img from "./certificateLogo.jpg";

// export const ViewExemptionLetter = (
//   firstname,
//   spiritualname,
//   lastname,
//   certificateDate,
//   exemptionCertificateBody
// ) => {
//   const formatDate = (dateString) => {
//     const months = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     const date = new Date(dateString);
//     return `${months[date.getMonth()]
//       } ${date.getDate()}, ${date.getFullYear()}`;
//   };

//   const doc = new jsPDF("portrait", "mm", "a4");
//   doc.addFont(
//     "LucidaHandwritingItalic",
//     "Lucida Handwriting",
//     "italic",
//     "StandardEncoding",
//     "base64-encoded-string"
//   );

//   // Add logo and church name
//   doc.addImage(img, "JPEG", 15, 15, 20, 20);
//   doc.setFontSize(18);
//   doc.setFont("helvetica", "bold");
//   doc.text("Spirit of Truth", 40, 25);
//   doc.setFontSize(16);
//   doc.setFont("helvetica", "bold");
//   doc.text("Native American Church", 40, 32);

//   // Add date and "To Whom It May Concern"
//   doc.setFontSize(12);
//   doc.text(`${formatDate(certificateDate)}`, 15, 50);
//   doc.text("To Whom It May Concern:", 15, 60);

//   doc.setFontSize(11);
//   doc.setFont("helvetica", "bold");
//   doc.text(`I am writing this letter on behalf of ${firstname} '${spiritualname}' ${lastname} who is a member of our church`, 15, 69);

//   // Set up the content for the letter
//   const contentElement = document.createElement('div');
//   contentElement.innerHTML = exemptionCertificateBody;
//   contentElement.style.lineHeight = "2";

//   const allTextElements = contentElement.querySelectorAll("*");
//   allTextElements.forEach((el) => {
//     el.style.color = "black";
//   });

//   // Use doc.html() to render the content asynchronously
//   doc.html(contentElement, {
//     callback: function (doc) {
//       // Ensure we have some starting Y position for subsequent content
//       let y = doc.lastAutoTable ? doc.lastAutoTable.finalY : 70;

//       // Ensure content is properly positioned
//       if (y > 270) {
//         doc.addPage(); // Add a new page if content overflows
//         y = 20; // Reset y to 20mm for the new page
//       }

//       doc.setFontSize(12);
//       doc.setFont("helvetica", "bold");
//       doc.text("Sincerely,", 15, y + 10);

//       // Add signature and contact info after the exemptionCertificateBody content
//       doc.setFont("Lucida Handwriting", "italic");
//       doc.setFontSize(24);
//       doc.setTextColor(0, 0, 255);
//       doc.text("Man Found Standing", 15, y + 20, { angle: 2.5 });

//       doc.setTextColor(0);
//       doc.setFont("helvetica", "normal");
//       doc.setFontSize(11);
//       doc.text("Man Found Standing", 15, y + 30);
//       doc.text("Principal Medicine Chief", 15, y + 36);
//       doc.text("PO Box 2045", 15, y + 42);
//       doc.text("Ava, MO 65608", 15, y + 48);
//       doc.text("Email: Admin@SpiritofTruthNativeAmericanChurch.org", 15, y + 54);

//       // Generate the PDF
//       const filename = `Welcome_Letter_${firstname}_${lastname}.pdf`;
//       const pdfBlob = doc.output("blob", filename);
//       const pdfUrl = URL.createObjectURL(pdfBlob);
//       const newTab = window.open(pdfUrl, "_blank");

//       if (newTab) {
//         newTab.focus();
//       } else {
//         console.error(
//           "Unable to open new tab. Please check your browser settings."
//         );
//       }
//     },
//     x: 0, // X position on the page
//     y: 49.7, // Starting Y position (for example, after title and date)
//     width: 182, // Width for the content
//     windowWidth: 800, // Optional: set the width of the window for rendering
//     margin: [20, 15, 19.8, 15], // Set top, right, bottom, left margins for content (in mm)
//   });

//   // Add a page break if content overflows
//   const currentPage = doc.internal.getCurrentPageInfo().pageNumber;
//   if (currentPage === 1) {
//     doc.setPage(1);
//     doc.setPage(2);
//   }
// };



// import jsPDF from "jspdf";
// import img from "./certificateLogo.jpg";

// export const ViewExemptionLetter = (
//   firstname,
//   spiritualname,
//   lastname,
//   certificateDate,
//   exemptionCertificateBody
// ) => {
//   const formatDate = (dateString) => {
//     const months = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];
//     const date = new Date(dateString);
//     return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
//   };

//   const cleanContent = (content) =>
//     content.replace(/\s*,/g, ",");

//   const cleanedExemptionBody = cleanContent(exemptionCertificateBody);

//   const doc = new jsPDF("portrait", "mm", "a4");
//   doc.addFont(
//     "LucidaHandwritingItalic",
//     "Lucida Handwriting",
//     "italic",
//     "StandardEncoding",
//     "base64-encoded-string"
//   );

//   // Set a consistent font for the whole document
//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(12);

//   // Add logo and church name
//   doc.addImage(img, "JPEG", 15, 15, 20, 20);
//   doc.setFontSize(18);
//   doc.setFont("helvetica", "bold");
//   doc.text("Spirit of Truth", 40, 25);
//   doc.setFontSize(16);
//   doc.setFont("helvetica", "bold");
//   doc.text("Native American Church", 40, 32);

//   // Add date and "To Whom It May Concern"
//   doc.setFontSize(11);
//   doc.text(`${formatDate(certificateDate)}`, 15, 50);
//   doc.text("To Whom It May Concern:", 15, 60);

//   const updatedExemptionBody = cleanedExemptionBody.replace(
//     /<(\w+)([^>]*)>/, // Match the first tag and capture the tag name and its attributes
//     '<$1$2 style="display: inline;">' // Add style attribute to the first tag
//   );


//   const combinedContent = `
//   <h5 style="display: inline-block; margin-bottom: 4px;">
//     <strong>
//       I am writing this letter on behalf of ${firstname} '${spiritualname}' ${lastname} who is a member of our church  
//     </strong>
//   </h5>
//   ${updatedExemptionBody}
// `;

//   // Set up the content for the letter
//   const contentElement = document.createElement("div");
//   contentElement.innerHTML = combinedContent;
//   contentElement.style.lineHeight = "1.5"; // Adjust line height for better readability

//   const allTextElements = contentElement.querySelectorAll("*");
//   allTextElements.forEach((el) => {
//     el.style.color = "black"; // Ensure text color is consistent
//   });

//   // Use doc.html() to render the content asynchronously
//   // contentElement.innerHTML = contentElement.innerHTML.replace(/\s+,/g, ",");
//   console.log(contentElement)
//   doc.html(contentElement, {
//     callback: function (doc) {
//       // Ensure we have some starting Y position for subsequent content
//       let y = doc.lastAutoTable ? doc.lastAutoTable.finalY : 200;

//       // Ensure content is properly positioned
//       if (y > 270) {
//         doc.addPage(); // Add a new page if content overflows
//         y = 20; // Reset y to 20mm for the new page
//       }

//       doc.setFontSize(12);
//       doc.setFont("helvetica", "normal");
//       doc.text("Sincerely,", 15, y + 20);

//       // Add signature and contact info after the exemptionCertificateBody content
//       doc.setFont("Lucida Handwriting", "italic");
//       doc.setFontSize(24);
//       doc.setTextColor(0, 0, 255);
//       doc.text("Man Found Standing", 15, y + 30, { angle: 2.5 });

//       doc.setTextColor(0);
//       doc.setFont("helvetica", "normal");
//       doc.setFontSize(11);
//       doc.text("Man Found Standing", 15, y + 40);
//       doc.text("Principal Medicine Chief", 15, y + 46);
//       doc.text("PO Box 2045", 15, y + 52);
//       doc.text("Ava, MO 65608", 15, y + 58);
//       doc.text("Email: Admin@SpiritofTruthNativeAmericanChurch.org", 15, y + 64);

//       // Generate the PDF
//       const filename = `Welcome_Letter_${firstname}_${lastname}.pdf`;
//       const pdfBlob = doc.output("blob", filename);
//       const pdfUrl = URL.createObjectURL(pdfBlob);
//       const newTab = window.open(pdfUrl, "_blank");

//       if (newTab) {
//         newTab.focus();
//       } else {
//         console.error(
//           "Unable to open new tab. Please check your browser settings."
//         );
//       }
//     },
//     x: 0, // X position on the page
//     y: 43.5, // Starting Y position (for example, after title and date)
//     width: 182, // Width for the content
//     windowWidth: 800, // Optional: set the width of the window for rendering
//     margin: [20, 15, 16, 15], // Set top, right, bottom, left margins for content (in mm)
//   });
// };



import html2pdf from "html2pdf.js";
import img from "./certificateLogo.jpg";

function sanitizeAndRenderWithFontSizes(content) {
  // Create a container to parse the HTML
  const container = document.createElement("div");
  container.innerHTML = content;

  // Remove unnecessary cursor spans
  const cursorSpans = container.querySelectorAll("span.ql-cursor");
  cursorSpans.forEach((span) => span.remove());

  // Replace alignment classes with inline styles
  const alignCenterElements = container.querySelectorAll(".ql-align-center");
  alignCenterElements.forEach((element) => {
    const currentStyle = element.getAttribute("style") || "";
    element.setAttribute("style", `${currentStyle} text-align: center;`);
    element.classList.remove("ql-align-center");
  });

  // Map of font sizes for tags
  const sizeMap = {
    h1: "28px",
    h2: "24px",
    h3: "20px",
    h4: "16px",
    h5: "14px",
    p: "12px",
  };

  // Apply font sizes dynamically to relevant tags
  Object.keys(sizeMap).forEach((tag) => {
    const elements = container.querySelectorAll(tag);
    elements.forEach((element) => {
      const currentStyle = element.getAttribute("style") || "";
      const hasColor = /color\s*:\s*[^;]+;?/.test(currentStyle);
      element.setAttribute("style", `${currentStyle} font-size: ${sizeMap[tag]}; ${hasColor ? "" : "color: black;"}`);
    });
  });

  return container.innerHTML;
}

export const ViewExemptionLetter = (
  firstname,
  spiritualname,
  lastname,
  certificateDate,
  exemptionCertificateBody
) => {
  const formatDate = (dateString) => {
    const months = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ];
    const date = new Date(dateString);
    return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
  };

  const cleanContent = (content) => content.replace(/\s*,/g, ",");

  const cleanedExemptionBody = cleanContent(exemptionCertificateBody);
  console.log(cleanedExemptionBody)

  // font-family: Arial, sans-serif; color: black;

  const combinedContent = ` 
  <div id="exemption-letter" style="line-height: 1.5;">
    <div style="text-align: center; margin-bottom: 20px;">
      <div style="display: flex; align-items: center;">
          <img src="${img}" alt="Logo" style="width: 90px; margin-right: 10px;">
        <div style="display: flex; flex-direction: column; align-items: flex-start; margin-top: -20px;">
          <h1 style="margin: 0; font-weight: bold; font-size: 20px;">Spirit of Truth</h1>
          <h1 style="margin: 0; font-weight: bold; font-size: 20px;">Native American Church</h1>
        </div>
      </div>
    </div>
    <div style="margin-left: 3px; font-size: 12px; color: black;">
      <h4 style="font-weight: bold; font-size: 14px; margin: 10px 0;">${formatDate(certificateDate)}</h4>
      <h4 style="font-weight: bold; font-size: 14px; margin: 0;">To Whom It May Concern:</h4>
      <div style="margin-top: 20px; font-size: 12px; color: black;">
        <h5 style="margin-top: 10px; font-size: 14px; color: black">
          <strong>
          I am writing this letter on behalf of ${firstname} '${spiritualname}' ${lastname}, who is a member of our church and legally recognized as  “Indian” under the law. Our church is legally established in the state of Missouri and other parts of the world, with the direct authority originally passed down from Leslie Fool Bull who was the President of the Native American Church on the Rosebud Reservation of South Dakota. If you need proof of this line of authority, please contact me.
          <strong>    
        </h5>
      </div>
      <br>
    </div>
    <div style="color: black; white-space: pre-wrap;">${sanitizeAndRenderWithFontSizes(cleanedExemptionBody)}</div>
  <div style="margin-left: 3px; margin-top: 20px; text-align: left; color: black;">
    <h4>Sincerely,</h4>
    <p style="font-family: 'Lucida Handwriting', cursive; font-size: 24px; color: blue; transform: rotate(-2.5deg); margin-bottom: 20px;">
      Man Found Standing
    </p>
    <h5 style="font-size: 12px; margin-bottom: 5px; color: black;">Principal Medicine Chief</h5>
    <h5 style="font-size: 12px; margin-bottom: 5px; color: black;">PO Box 2045</h5>
    <h5 style="font-size: 12px; margin-bottom: 5px; color: black;">Ava, MO 65608</h5>
    <h5 style="font-size: 12px; margin-bottom: 10px; color: black;">Email: Admin@SpiritofTruthNativeAmericanChurch.org</h5>
  </div>
</div>
`;

  // Create a div element to hold the content
  const contentElement = document.createElement("div");
  contentElement.innerHTML = combinedContent;

  // Append the content to the document body for rendering
  document.body.appendChild(contentElement);

  // Configure options for html2pdf.js
  const options = {
    margin: 9.9 ,
    filename: `Exemption_Letter_${firstname}_${lastname}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, logging: false },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // Generate PDF using html2pdf.js
  html2pdf()
    .from(contentElement)
    .set(options)
    .outputPdf("blob") // Generate the PDF as a blob
    .then((pdfBlob) => {
      // Create a URL for the PDF blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Open the URL in a new browser tab
      const newTab = window.open(pdfUrl, "_blank");
      if (!newTab) {
        console.error(
          "Unable to open the PDF in a new tab. Please check your browser settings."
        );
      }

      // Clean up the DOM after rendering
      document.body.removeChild(contentElement);
    })
    .catch((err) => {
      console.error("Error generating PDF:", err);
    });
};

