// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import img from "./certificateLogo.jpg";

// const renderRichText = (element, yPosition, doc, pageWidth, margin) => {
//   const classList = element.className.split(/\s+/);
//   const isCenter = classList.includes("ql-align-center");
//   const indentLevel = classList.find((cls) => cls.startsWith("ql-indent-"));
//   const indent = indentLevel ? parseInt(indentLevel.split("-")[2]) * 10 : 0;

//   let fontSize;
//   switch (element.tagName.toLowerCase()) {
//     case "h1":
//       fontSize = 16;
//       break;
//     case "h2":
//       fontSize = 14;
//       break;
//     case "h3":
//       fontSize = 12;
//       break;
//     case "h4":
//       fontSize = 10;
//       break;
//     case "h5":
//       fontSize = 9;
//       break;
//     case "p":
//     default:
//       fontSize = 5;
//   }

//   doc.setFontSize(fontSize);
//   doc.setFont("helvetica", "normal");

//   const renderTextWithStyles = (node, x, y) => {
//     if (node.nodeType === Node.TEXT_NODE) {
//       doc.setTextColor(0, 0, 0); // Set text color to black for all text nodes
//       doc.text(node.textContent, x, y);
//       return doc.getTextWidth(node.textContent);
//     } else if (node.nodeType === Node.ELEMENT_NODE) {
//       let width = 0;
//       const computedStyle = getComputedStyle(node);
//       const color = node.style.color || computedStyle.color || "#000000";
//       const bgColor =
//         node.style.backgroundColor || computedStyle.backgroundColor;

//       // Always set text color to black
//       doc.setTextColor(0, 0, 0);

//       if (bgColor && bgColor !== "transparent") {
//         const rgb = bgColor.match(/\d+/g);
//         if (rgb && rgb.length === 3) {
//           doc.setFillColor(
//             parseInt(rgb[0]),
//             parseInt(rgb[1]),
//             parseInt(rgb[2])
//           );
//           doc.rect(
//             x,
//             y - fontSize * 0.75,
//             doc.getTextWidth(node.textContent),
//             fontSize,
//             "F"
//           );
//         }
//       }

//       for (let child of node.childNodes) {
//         width += renderTextWithStyles(child, x + width, y);
//       }
//       return width;
//     }
//     return 0;
//   };
// };

// export const ViewCourseLetter = (
//   firstname,
//   spiritualname,
//   lastname,
//   certificateDate,
//   courseLetterBody
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
//     const day = date.getUTCDate();
//     const monthIndex = date.getUTCMonth();
//     const year = date.getUTCFullYear();

//     const formattedDate = `${day} ${months[monthIndex]} ${year}`;
//     console.log("formatted date", formattedDate);
//     return formattedDate;
//   };

//   const doc = new jsPDF("portrait");
//   doc.addFont(
//     "LucidaHandwritingItalic",
//     "Lucida Handwriting",
//     "italic",
//     "StandardEncoding",
//     "base64-encoded-string",
//     "Times"
//   );
//   doc.addImage(img, "JPEG", 15, 10, 35, 35);

//   doc.setFontSize(20);
//   doc.setFont("helvetica", "bolditalic");
//   doc.text("Spirit of Truth", 80, 24, null, null, "center");

//   doc.setFontSize(18);
//   doc.setFont("helvetica", "bolditalic");
//   doc.text("Native American Church", 57, 32);

//   doc.setFontSize(12);
//   doc.setFont("helvetica", "normal");
//   doc.text(`Date: ${formatDate(certificateDate)}`, 15, 53);

//   doc.text("", 15, 60); // Empty line after Date

//   const fullName = `${firstname} '${spiritualname}' ${lastname},`;
//   doc.setFontSize(12);
//   doc.setFont("helvetica", "normal");
//   doc.text(`Dear ${fullName}`, 15, 63);

//   const courseLetterBodyElement = document.createElement("div");
//   courseLetterBodyElement.innerHTML = courseLetterBody;
//   courseLetterBodyElement.style.width = "700px";
//   courseLetterBodyElement.style.paddingTop = "20px";
//   courseLetterBodyElement.style.paddingBottom = "20px";
//   courseLetterBodyElement.style.paddingLeft = "20px";
//   courseLetterBodyElement.style.paddingRight = "20px";
//   courseLetterBodyElement.style.color = "black";

//   const allTextElements = courseLetterBodyElement.querySelectorAll("*");
//   allTextElements.forEach((el) => {
//     el.style.color = "black";
//   });
//   document.body.appendChild(courseLetterBodyElement);

//   html2canvas(courseLetterBodyElement, {
//     useCORS: true,
//     scale: 4,
//     backgroundColor: null,
//     onclone: (clonedDoc) => {
//       const clonedElement = clonedDoc.body.querySelector("div");
//       clonedElement.style.color = "black";
//       clonedElement.style.width = "700px"; // Match adjusted width
//       clonedElement.style.paddingLeft = "20px";
//       clonedElement.style.paddingRight = "20px";
//       const allClonedElements = clonedElement.querySelectorAll("*");
//       allClonedElements.forEach((el) => {
//         el.style.color = "black";
//       });
//     },
//   }).then((canvas) => {
//     const imgData = canvas.toDataURL("image/png");
//     const imgWidth = 180;
//     const pageWidth  = doc.internal.pageSize.getWidth();
//     const pageHeight = doc.internal.pageSize.getHeight();
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;
//     let heightLeft = imgHeight;
//     let position = 60;

//     const xPosition = (pageWidth - imgWidth) / 2;

//     doc.addImage(imgData, "PNG", xPosition, position, imgWidth, imgHeight);
//     heightLeft -= pageHeight - position - 15;

//     while (heightLeft > 0) {
//       position = heightLeft - imgHeight + 15;
//       doc.addPage();
//       doc.addImage(imgData, "PNG", 15, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight - 15;
//     }
//     doc.setFontSize(16);
//     doc.setFont("Lucida Handwriting", "italic");
//     doc.text("Man Found Standing", 15, pageHeight - 45);

//     doc.setFontSize(12);
//     doc.setFont("helvetica", "normal");
//     doc.text("Sincerely,", 15, pageHeight - 55);

//     doc.text(
//       "Man Found Standing, Principal Medicine Chief",
//       15,
//       pageHeight - 35
//     );
//     doc.text(
//       "Governing Laws: UDHR (United Nations Declaration),",
//       15,
//       pageHeight - 30
//     );
//     doc.text(
//       "U.S. Constitution, NAFERA (Native American Free Exercise",
//       15,
//       pageHeight - 25
//     );
//     doc.text("of Religion Act, 1993)", 15, pageHeight - 20);

//     doc.text("", 15, pageHeight - 5); // Empty line before PO Box
//     doc.text(
//       "PO Box 2045  Ava, MO 65608",
//       105,
//       pageHeight - 10,
//       null,
//       null,
//       "center"
//     );

//     const pdfBlob = doc.output("blob");
//     const pdfUrl = URL.createObjectURL(pdfBlob);
//     const newTab = window.open(pdfUrl, "_blank");

//     if (newTab) {
//       newTab.focus();
//       document.body.removeChild(courseLetterBodyElement);
//     } else {
//       console.error(
//         "Unable to open new tab. Please check your browser settings."
//       );
//     }
//   });
// };





import html2pdf from "html2pdf.js";
import img from "./certificateLogo.jpg";

export const ViewCourseLetter = (
  firstname,
  spiritualname,
  lastname,
  certificateDate,
  courseLetterBody
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

    return `${day} ${months[monthIndex]} ${year}`;
  };

  // Build the HTML structure for the letter
  const container = document.createElement("div");
  container.style.width = "700px";
  container.style.margin = "auto";
  container.style.padding = "20px";
  container.style.fontFamily = "helvetica, sans-serif";
  container.style.color = "black";

  container.innerHTML = `
    <div style="display: flex; justify-content: flex-start; text-align: left; margin-bottom: 20px;">
      <img src="${img}" alt="Certificate Logo" style="width: 140px; height: auto; margin-right: 15px;" />
      <div>
        <h1 style="font-size: 28px; font-family: Helvetica, Arial, sans-serif; font-weight: bold; font-style: italic; margin: 0;">
          Spirit of Truth
        </h1>
        <h1 style="font-size: 25px; font-family: Helvetica, Arial, sans-serif; font-weight: bold; font-style: italic; margin: 0;">
          Native American Church
        </h1>
      </div>
    </div>
    <p style="margin-top: 20px; font-size: 16px; color: black">Date: ${formatDate(certificateDate)}</p>
    <p style="margin-top: 10px; font-size: 16px; color: black">Dear ${firstname} '${spiritualname}' ${lastname},</p>
    <div style="margin-top: 20px; margin-left: 10px; font-size: 16px; line-height: 1.5;">
      ${courseLetterBody}
    </div>
    <p style="font-size: 16px; color: black; margin-top: 20px;">Sincerely,</p>
    <h3 style="font-family: 'Lucida Handwriting', cursive; font-size: 24px; color: blue; transform: rotate(-2.5deg); margin-bottom: 20px;">
      Man Found Standing
    </h3>
    <p style="font-size: 16px; color: black;">Man Found Standing, Principal Medicine Chief</p>
    <p style="font-size: 16px; color: black;">Governing Laws: UDHR (United Nations Declaration),</p>
    <p style="font-size: 16px; color: black;">U.S. Constitution, NAFERA (Native American Free Exercise</p>
    <p style="font-size: 16px; color: black;">of Religion Act, 1993)</p>
    <p style="font-size: 16px; color: black; text-align: center; margin-top: 20px;">PO Box 2045, Ava, MO 65608</p>
  `;

  const options = {
    margin: 10,
    filename: `letter_${Math.random()}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 4, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // Generate the PDF
  html2pdf()
    .from(container)
    .set(options)
    .outputPdf("blob")
    .then((pdfBlob) => {
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const newTab = window.open(pdfUrl, "_blank");

      if (!newTab) {
        console.error(
          "Unable to open the PDF in a new tab. Please check your browser settings."
        );
      }
    })
    .catch((err) => {
      console.error("Error generating PDF:", err);
    });
};
