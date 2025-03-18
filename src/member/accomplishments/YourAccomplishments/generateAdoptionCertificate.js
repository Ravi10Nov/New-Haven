import jsPDF from "jspdf";
import img from "./certificateLogo.jpg";

export const generateAdoptionCertificate = (
  firstname,
  spiritualname,
  lastname,
  certificateDate
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

    // const date = new Date(dateString);
    // const monthIndex = date.getMonth();
    // const year = date.getFullYear();

    // const formattedDate = `${months[monthIndex]} ${year}`;
    // // console.log(formattedDate);
    // return formattedDate;

    const date = new Date(dateString);
    return `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
  };

  const calculateCenteredTextX = (text) => {
    const textWidth = doc.getTextWidth(text); // Use getTextWidth for jsPDF v1.0.0 or later

    // Check for compatibility with older jsPDF versions (if getTextWidth is not available)
    if (!textWidth) {
      console.warn(
        "jsPDF version might not support getTextWidth. Using an estimate for centering."
      );
      const fontSize = doc.getFontSize(); // Get the current font size
      const estimatedCharsPerInch = 10; // Adjust this value based on your font
      const estimatedWidth = (text.length / estimatedCharsPerInch) * fontSize;
      return (doc.internal.pageSize.getWidth() - estimatedWidth) / 2;
    }

    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = (pageWidth - textWidth) / 2;

    return centerX;
  };

  const doc = new jsPDF("landscape");
  doc.addFont(
    "LucidaHandwritingItalic",
    "Lucida Handwriting",
    "italic",
    "StandardEncoding",
    "base64-encoded-string"
  );
  doc.addImage(img, "JPEG", 129, 10, 40, 40);

  doc.setFontSize(40);
  doc.setFont("helvetica", "bolditalic");
  doc.text("  Adoption Certificate", 77, 65);

  doc.setFontSize(16);
  doc.setFont("helvetica", "normal");
  doc.text(
    "The Council Committee on New Membership of the Spirit of Truth Native American Church",
    35,
    80
  );
  doc.text(
    "Upon recommendation and by virtue of the authority vested in them, certify herewith . . .",
    39,
    88
  );

  const fullName = `${firstname} '${spiritualname}' ${lastname}`;
  doc.setFontSize(30);
  doc.setFont("helvetica", "bolditalic");
  doc.text(fullName, calculateCenteredTextX(fullName), 105);

  doc.setFontSize(15);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Having made application for Spiritual Adoption and having made appropriate covenants qualifies in every way to be a",
    10,
    120
  );
  doc.text("member of the Church in full fellowship.", 10, 128);

  doc.text(
    "All the rights and responsibilities appertaining to Membership in the Church are duly given, in accordance with the",
    10,
    142
  );
  doc.text(
    "guidelines set forth by the Church’s Constitution, Ethical Code of Conduct, Principal Medicine Chief, appropriate",
    10,
    150
  );
  doc.text("Councils of the Church, and the Sacred Scriptures.", 10, 158);

  doc.setFontSize(18);
  doc.setFont("Lucida Handwriting", "italic");
  doc.text("Man Found Standing  ", 20, 175);

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(`Effective Date: ${formatDate(certificateDate)}`, 175, 175);

  // doc.line(50, 20, 190, 10);

  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("Principal Medicine Chief", 15, 187);

  doc.setFont("helvetica", "normal");
  doc.text("Man Found Standing", 15, 193);

  doc.text("Governing Laws: UDHR (United Nations ", 175, 187);
  doc.text("Declaration), U.S. Constitution, NAFERA (Native", 175, 193);
  doc.text("American Free Exercise of Religion Act, 1993)", 175, 199);
  doc.save(`Adoption_cert.pdf`);
};
