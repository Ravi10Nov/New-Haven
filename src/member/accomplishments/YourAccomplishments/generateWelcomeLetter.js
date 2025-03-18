// import jsPDF from "jspdf";
// import img from "./certificateLogo.jpg";

// export const generateWelcomeCertificate = (
//   firstname,
//   spiritualname,
//   lastname,
//   certificateDate,
//   welcomeLetterBody
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
//     const day = date.getDate();
//     const monthIndex = date.getMonth();
//     const year = date.getFullYear();

//     return `${months[monthIndex]} ${day}, ${year}`;
//   };

//   const doc = new jsPDF("portrait");
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
//   doc.text("Spirit of Truth", 40, 23);
//   doc.setFontSize(16);
//   doc.setFont("helvetica", "bold");
//   doc.text("Native American Church", 40, 29);

//   // Add date and name
//   doc.setFontSize(12);
//   doc.text(`${formatDate(certificateDate)}`, 15, 50);
//   doc.text(`Dear ${firstname} '${spiritualname}' ${lastname},`, 15, 60);

//   // Letter content
//   const content = `I would like to welcome you as our newest member of the Spirit of Truth Native American Church Family. Now that you have started on the Sacred Healing Way, you are somewhat familiar with the covenants you have made. I am very happy to assist you on your Spiritual Walk, but it is your responsibility to continue down the path by following the Spirit. Also, there are many opportunities for further education to assist you on your journey. For example, you may choose to become a Native American Medicine Man/Woman and a Minister of your religion.

// As the President and Principal Medicine Chief, I want you to know you can contact me if you have any questions. Also, I want to give you your first two assignments in the Church.

// 1. Read and familiarize yourself with the Constitution of the Church.
// 2. Read and familiarize yourself with the Ethical Code of Conduct of the Church.

// Once you have completed those two course assignments, feel free to continue on with further course training. The course training is essential to establish the "Precedence of Competence" and "Pattern of Behavior" that the law requires to have you religiously exempted to practice some Ceremonies and Healing Ministries found in the Spirit of Truth Native American Church. If you desire to eventually lead those Ceremonies, it is our goal to assist you in establishing your legal protection. Also, to open up a Healing Center to Minister to those who are sick or affected, you will want to make sure you are covered under the law through the Church or it will be considered to be "practicing medicine without a license". The Church supports their members in fulfilling their spiritual and legal requirements.

// The Spirit of Truth Native American Church must take membership in the Church Family seriously. If any member were to be assailed in court, the first thing that I must do as the President of the Church is to assess the current status of the individual. If the individual is fulfilling their covenants and performing a Bona Fide Ceremony or Traditional Practice, then I, as the President, am authorized to stand forward with Affidavits of Fact to assist the troubled member. We ask all members to be "Doers of the Word, not Hearers only". We desire all to take a stand for the defense of our Religious Freedoms and also take part in creating a better world for our descendants.

// Once again welcome to the Church Family and I look forward to assisting you on your journey. Have a wonderful day.

// Sincerely,`;

//   doc.setFontSize(11);
//   const splitContent = doc.splitTextToSize(content, 180);
//   doc.text(splitContent, 15, 70);

//   // Signature and contact info
//   doc.setFont("Lucida Handwriting", "italic");
//   doc.setFontSize(24);
//   doc.setTextColor(0, 0, 255);
//   doc.text("Man Found Standing", 15, 243, { angle: 2.5 });

//   doc.setTextColor(0);
//   doc.setFont("helvetica", "normal");
//   doc.setFontSize(11);
//   doc.text("Man Found Standing", 15, 258);
//   doc.text("Principal Medicine Chief", 15, 264);
//   doc.text("PO Box 2045", 15, 270);
//   doc.text("Ava, MO 65608", 15, 276);
//   doc.text("Email: Admin@SpiritofTruthNativeAmericanChurch.org", 15, 282);

//   doc.save(`Welcome Letter.pdf`);
// };



// import jsPDF from "jspdf";
// import img from "./certificateLogo.jpg";
// import html2canvas from "html2canvas";

// export const generateWelcomeCertificate = (
//   firstname,
//   spiritualname,
//   lastname,
//   certificateDate,
//   welcomeLetterBody
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
//     const day = date.getDate();
//     const monthIndex = date.getMonth();
//     const year = date.getFullYear();
//     return `${months[monthIndex]} ${day}, ${year}`;
//   };

//   const doc = new jsPDF("portrait");
//   doc.addFont("helvetica", "normal");

//   // Add logo and church name
//   doc.addImage(img, "JPEG", 15, 15, 20, 20);
//   doc.setFontSize(18);
//   doc.setFont("helvetica", "bold");
//   doc.text("Spirit of Truth", 40, 23);
//   doc.setFontSize(16);
//   doc.text("Native American Church", 40, 29);

//   // Add date and salutation
//   doc.setFontSize(12);
//   // doc.setFont("helvetica", "normal");
//   doc.text(`${formatDate(certificateDate)}`, 18, 50);
//   doc.text(`Dear ${firstname} '${spiritualname}' ${lastname},`, 18, 60);

//   // Prepare welcome letter content
//   const welcomeLetterElement = document.createElement("div");
//   welcomeLetterElement.innerHTML = welcomeLetterBody;
//   welcomeLetterElement.style.width = "600px";
//   welcomeLetterElement.style.padding = "10px";
//   welcomeLetterElement.style.fontSize = "11px"; // Reduced font size
//   welcomeLetterElement.style.fontWeight = "bold";
//   welcomeLetterElement.style.color = "black";
//   document.body.appendChild(welcomeLetterElement);

//   const allTextElements = welcomeLetterElement.querySelectorAll("*");
//   allTextElements.forEach((el) => {
//     el.style.color = "black";
//   });

//   // Convert content to canvas
//   html2canvas(welcomeLetterElement, {
//     useCORS: true,
//     scale: 2,
//     backgroundColor: null,
//   }).then((canvas) => {
//     const imgData = canvas.toDataURL("image/png");
//     const imgWidth = 180; // A4 width in mm
//     const pageHeight = doc.internal.pageSize.height;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;
//     const bottomMargin = 20; // Bottom margin for every page
//     const topMargin = 60; // Start body right after salutation
//     let position = topMargin;

//     // Add content to pages
//     doc.addImage(imgData, "PNG", 15, position, imgWidth, imgHeight);
//     let heightLeft = imgHeight - (pageHeight - position - bottomMargin);

//     while (heightLeft > 0) {
//       doc.addPage();
//       position = 20;
//       doc.addImage(imgData, "PNG", 15, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight - position - bottomMargin;
//     }

//     // Add signature and footer
//     const footerPosition = pageHeight - bottomMargin - 30;

//     doc.setFontSize(12);
//     doc.setFont("helvetica", "bold");
//     doc.text("Sincerely,", 18, footerPosition);

//     // Signature and contact info
//     doc.setFont("Lucida Handwriting", "italic");
//     doc.setFontSize(24);
//     doc.setTextColor(0, 0, 255);
//     doc.text("Man Found Standing", 18, footerPosition+8, { angle: 2.5 });

//     doc.setTextColor(0); 
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(11);
//     doc.text("Man Found Standing", 18, footerPosition+13);
//     doc.text("Principal Medicine Chief", 18, footerPosition+18);
//     doc.text("PO Box 2045", 18, footerPosition+23);
//     doc.text("Ava, MO 65608", 18, footerPosition+29);
//     doc.text("Email: Admin@SpiritofTruthNativeAmericanChurch.org", 18, footerPosition+34);

//     // Generate PDF
    
//     doc.save(`Welcome Letter.pdf`);
//     document.body.removeChild(welcomeLetterElement);
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

export const generateWelcomeCertificate = (
  firstname,
  spiritualname,
  lastname,
  certificateDate,
  welcomeLetterBody
) => {
  const formatDate = (dateString) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const monthIndex = date.getUTCMonth();
    const year = date.getUTCFullYear();
    return `${months[monthIndex]} ${day}, ${year}`;
  };

  const cleanContent = (content) => content.replace(/\s*,/g, ",");

  const cleanedExemptionBody = cleanContent(welcomeLetterBody);
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
      <h4 style="font-size: 14px; margin: 10px 0;">${formatDate(certificateDate)}</h4>
      <h4 style="bold; font-size: 14px; margin: 0;">Dear ${firstname} '${spiritualname}' ${lastname}</h4>
      <br>
    </div>
    <div style="color: black; white-space: pre-wrap;">${sanitizeAndRenderWithFontSizes(cleanedExemptionBody)}</div>
  <div style="margin-left: 3px; margin-top: 20px; text-align: left; color: black;">
    <h2 style="">Sincerely,</h2>
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
    filename: `Welcome_Letter_${firstname}_${lastname}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, logging: false },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // Generate PDF using html2pdf.js
  html2pdf()
    .from(contentElement)
    .set(options)
    .save()
    .then(() => {
      // Clean up the DOM after generating the PDF
      document.body.removeChild(contentElement);
    })
    .catch((err) => {
      console.error("Error generating PDF:", err);
    });
};