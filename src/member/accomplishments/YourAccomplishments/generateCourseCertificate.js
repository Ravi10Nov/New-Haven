// import jsPDF from "jspdf";
// import img from "./certificateLogo.jpg";

// const calculateCenteredTextX = (text, doc) => {
//   const textWidth = doc.getTextWidth(text);
//   const pageWidth = doc.internal.pageSize.getWidth();
//   return (pageWidth - textWidth) / 2;
// };

// const renderRichText = (element, yPosition, doc, pageWidth, margin) => {
//   const classList = element.className.split(/\s+/);
//   const isCenter = classList.includes("ql-align-center");
//   const indentLevel = classList.find((cls) => cls.startsWith("ql-indent-"));
//   const indent = indentLevel ? parseInt(indentLevel.split("-")[2]) * 10 : 0;

//   let fontSize;
//   switch (element.tagName.toLowerCase()) {
//     case "h1":
//       fontSize = 20;
//       break;
//     case "h2":
//       fontSize = 18;
//       break;
//     case "h3":
//       fontSize = 16;
//       break;
//     case "h4":
//       fontSize = 14;
//       break;
//     case "p":
//       fontSize = 12;
//       break;
//     default:
//       fontSize = 12;
//   }

//   doc.setFontSize(fontSize);
//   doc.setFont("helvetica", "normal");

//   // Function to handle each text node separately
//   const renderTextWithStyles = (text, x, y) => {
//     text = text.replace(/\u00A0/g, " ").trim();  // Replace non-breaking spaces
//     if (text.length === 0) return 0;  // Skip empty strings
//     // console.log("Rendering text: ", text);  // Log text content
//     doc.text(text, x, y);
//     return doc.getTextWidth(text);
//   };

//   // Handle the whole element text content
//   const text = element.textContent.trim(); // Get raw text
//   // console.log("Element text content: ", text); // Log whole element text content
//   const availableWidth = pageWidth - 2 * margin - indent;
//   const words = text.split(/\s+/);
//   let line = "";
//   let lineWidth = 0;

//   words.forEach((word, index) => {
//     const wordWidth = doc.getTextWidth(word + " ");
//     if (lineWidth + wordWidth > availableWidth) {
//       let xPosition = isCenter
//         ? calculateCenteredTextX(line, doc)
//         : margin + indent;
//       lineWidth += renderTextWithStyles(line, xPosition, yPosition);
//       yPosition += fontSize * 0.5;
//       line = word + " ";
//       lineWidth = wordWidth;
//     } else {
//       line += word + " ";
//       lineWidth += wordWidth;
//     }

//     if (index === words.length - 1) {
//       let xPosition = isCenter
//         ? calculateCenteredTextX(line, doc)
//         : margin + indent;
//       lineWidth += renderTextWithStyles(line, xPosition, yPosition);
//       yPosition += fontSize * 0.5;
//     }
//   });

//   return yPosition + 2;
// };

// export const generateCourseCertificate = (
//   firstname,
//   spiritualname,
//   lastname,
//   certificateDate,
//   certificateBody
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
//     const monthIndex = date.getMonth();
//     const year = date.getFullYear();
//     return `${months[monthIndex]} ${year}`;
//   };

//   const doc = new jsPDF("landscape");
//   const pageWidth = doc.internal.pageSize.getWidth();
//   const pageHeight = doc.internal.pageSize.getHeight();
//   const margin = 20;

//   doc.addImage(img, "PNG", (pageWidth - 40) / 2, 10, 40, 40);

//   // Title Text
//   doc.setFontSize(16);
//   doc.setFont("helvetica", "normal");
//   const titleText =
//     "The Ministers Council of the Spirit of Truth Native American Church upon recommendation and by virtue of the authority in them vested, certify herewith";
//   const titleLines = doc.splitTextToSize(titleText, pageWidth - 2 * margin);
//   titleLines.forEach((line, index) => {
//     doc.text(line, calculateCenteredTextX(line, doc), 60 + index * 6);
//   });

//   // Full Name
//   const fullName = `${firstname} '${spiritualname}' ${lastname}`;
//   doc.setFontSize(28);
//   doc.setFont("helvetica", "bolditalic");
//   doc.text(fullName, calculateCenteredTextX(fullName, doc), 80);


//   const parser = new DOMParser();
//   const htmlDoc = parser.parseFromString(certificateBody, "text/html");
//   const body = htmlDoc.body;

//   let yPosition = 90;
//   for (let child of body.children) {
//     yPosition = renderRichText(child, yPosition, doc, pageWidth, margin);
//   }
//   // Reset text color to black for the rest of the document
//   doc.setTextColor(0, 0, 0);
//   doc.addFont(
//     "LucidaHandwritingItalic",
//     "Lucida Handwriting",
//     "italic",
//     "StandardEncoding",
//     "base64-encoded-string"
//   );

//   doc.setFontSize(18);
//   doc.setFont("Lucida Handwriting", "italic");
//   doc.text("Man Found Standing  ", margin, pageHeight - 30);

//   doc.setFontSize(18);
//   doc.setFont("helvetica", "bold");
//   doc.text(
//     `Effective Date: ${formatDate(certificateDate)}`,
//     pageWidth -
//     margin -
//     doc.getTextWidth(`Effective Date: ${formatDate(certificateDate)}`) - 5,
//     pageHeight - 30
//   );

//   doc.setFontSize(14);
//   doc.setFont("helvetica", "normal");
//   doc.text("Principal Medicine Chief", margin, pageHeight - 20);

//   doc.setFont("helvetica", "normal");
//   doc.text("Man Found Standing", margin, pageHeight - 15);

//   // const governingLaws = [
//   //   "Governing Laws: UDHR (United Nations ",
//   //   "Declaration), U.S. Constitution, NAFERA (Native",
//   //   "American Free Exercise of Religion Act, 1993)",
//   // ];

//   // governingLaws.forEach((line, index) => {
//   //   doc.text(
//   //     line,
//   //     pageWidth - margin - doc.getTextWidth(line),
//   //     pageHeight - 20 + index * 5
//   //   );
//   // });

//   doc.text("Governing Laws: UDHR (United Nations ", pageWidth -
//     margin - 100,
//     pageHeight - 22);
//   doc.text("Declaration), U.S. Constitution, NAFERA (Native", pageWidth -
//     margin - 100,
//     pageHeight - 16);
//   doc.text("American Free Exercise of Religion Act, 1993)", pageWidth -
//     margin - 100,
//     pageHeight - 10);

//   // Save the PDF
//   doc.save("courseCert.pdf");
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
      element.setAttribute("style", `${currentStyle} font-size: ${sizeMap[tag]};`);
    });
  });

  return container.innerHTML;
}

export const generateCourseCertificate = (
  firstname,
  spiritualname,
  lastname,
  certificateDate,
  certificateBody
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
    return `${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
  };

  const container = document.createElement("div");
  container.innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="${img}" width="150" alt="Logo" style="display: block; margin: 0 auto;"/>
    </div>
    <h1 style="text-align: center; font-size: 21.5px; margin-bottom: 10px;">The Ministers Council of the Spirit of Truth Native American Church Upon recommendation and by virtue of the authority in them vested, certify herewith</h1>
    <h1 style="font-size: 28px; font-weight: bold; font-style: italic; text-align: center;">
      ${firstname} '${spiritualname}' ${lastname}
    </h1>
    <div style="margin-top: -10px; white-space: pre-wrap;">
    ${sanitizeAndRenderWithFontSizes(certificateBody)}
    </div>
    <div style="display: flex; justify-content: space-between; margin-top: 5px; margin-bottom: 10px;">
      <!-- Left side -->
      <div style="text-align: left; margin-left: 20px;">
        <h3 style="font-size: 22px; font-weight: bold;">Sincerely,</h3>
        <h3 style="font-family: 'Lucida Handwriting', cursive; font-size: 24px; color: blue; transform: rotate(-2.5deg); margin-bottom: 20px;">
      Man Found Standing
      </h3>
        <h3>Principal Medicine Chief</h3>
        <h3>Man Found Standing</h3>
      </div>
      <!-- Right side -->
      <div style="text-align: left; margin-right: 20px;" >
        <h3 style="font-size: 22px; font-weight: bold;">Effective Date: ${formatDate(certificateDate)}</h3>
        <h3>Governing Laws: UDHR (United Nations Declaration),</h3>
        <h3>U.S. Constitution, NAFERA (Native American Free</h3>
        <h3> Exercise of Religion Act, 1993)</h3>
      </div>
    </div>
  `;

  const options = {
    margin: 10,
    filename: `Course_certificate_${Math.random()}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 4 },
    jsPDF: { unit: "mm", format: "a4", orientation: "landscape" }
  };

  // Generate the PDF
  html2pdf()
    .from(container)
    .set(options)
    .save()
    .then(() => {
      // Clean up the DOM after generating the PDF
      document.body.removeChild(container);
    })
    .catch((err) => {
      console.error("Error generating PDF:", err);
    });
}