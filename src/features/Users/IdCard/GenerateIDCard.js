import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// export const generateIDCard = (userDetails, backSeal, frontSeal) => {
//   const cardElement = document.createElement("div");
//   cardElement.style.width = "309.375px";
//   cardElement.style.height = "378px";
//   cardElement.style.backgroundColor = "white";
//   cardElement.innerHTML = `
//     <div style="width: 309.375px; height: 378px; display: flex; flex-direction: column; overflow: hidden; background-color: white;">
//       <div style="width: 100%; height: 189px; display: flex; flex-direction: row; border: 2px solid black; overflow: hidden;">
//         <div style="height: 100%; width: 43%; display: flex; flex-direction: column; justify-content: flex-end; padding: 10px;">
//           <img src="${
//             userDetails.image
//           }" style="max-height: 60%; width: 90%; object-fit: contain; margin-bottom: 10px;">
//           <img src="${backSeal}" style="height: 30%; width: auto; align-self: flex-start;">
//         </div>
//         <div style="width: 57%; display: flex; flex-direction: column; padding: 10px;">
//           <h3 style="margin: 0; text-align: center; font-size: 16px; font-family: 'Times New Roman', serif;">Spirit of Truth</h3>
//           <h6 style="margin: 4px 0 10px; text-align: center; font-size: 12px; font-weight: 300; text-decoration: underline; text-underline-offset: 2px;">Native American Church</h6>
//           <div style="font-size: 10px; line-height: 1.2;">
//             <p style="margin: 2px 0; font-weight: 200;">${
//               userDetails.spiritualname || ""
//             }</p>
//             <p style="margin: 2px 0; font-weight: 300;">${
//               userDetails.firstname
//             } ${userDetails.middlename} ${userDetails.lastname}</p>
//             <p style="margin: 2px 0; font-weight: 300;">${
//               userDetails.addressline1
//             }</p>
//             <p style="margin: 2px 0; font-weight: 300;">${
//               userDetails.addressline2 || ""
//             }</p>
//             <p style="margin: 2px 0; font-weight: 300;">${userDetails.city}, ${
//               userDetails.state
//             }</p>
//             <p style="margin: 2px 0; font-weight: 300;">${
//               userDetails.zipcode
//             }</p>
//           </div>
//           ${
//             userDetails.birthdate
//               ? `<p style="font-size: 10px; font-family: monospace; font-weight: 500; text-align: right; margin-top: auto; margin-bottom: 0;">DOB: ${new Date(
//                   userDetails.birthdate
//                 ).toLocaleDateString()}</p>`
//               : ""
//           }
//         </div>
//       </div>
//       <div style="width: 100%; height: 189px; border: 2px solid black; border-top: 0; font-size: 8px; padding: 8px; position: relative; box-sizing: border-box; transform: rotate(180deg);">
//         <img src="${frontSeal}" style="position: absolute; bottom: 8px; right: 8px; height: 50px; width: auto; transform: rotate(180deg);">
//         <p style="margin: 0; padding: 0;">
//           Our members are legally recognized as "Indian" under the U.S. Federal law and are authorized to perform all religious ordinances and ceremonies pertaining to their assigned calling, in conjunction with the usage of all Plants, Animals, Stones, Feathers, and so forth which tenets unite us on the Sacred Way. All members are religiously exempt from the practices of mandated PCR swabs, immunizations, harmful masks, and all other "treatments" that go against our sincere 
//         </p>

//         <p style="margin: 0; padding: 0 60px 0 0;">
//           religious beliefs. We expect our civil and indigenous rights to be respected and upheld by all peoples and governments. Governing Laws: UDHR and NAFERA 1993
//         </p>



//       </div>
//     </div>
//   `;

//   document.body.appendChild(cardElement);

//   html2canvas(cardElement, {
//     scale: 2,
//     logging: true,
//     useCORS: true,
//     backgroundColor: "white",
//   }).then((canvas) => {
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "px",
//       format: [309.375, 378],
//     });
//     pdf.addImage(imgData, "PNG", 0, 0, 309.375, 378);
//     pdf.save("id_card.pdf");

//     document.body.removeChild(cardElement);
//   });
// };



// export const generateIDCard = (userDetails, backSeal, frontSeal) => {
//   const cardWidth = 309.375; // Width in px
//   const cardHeight = 378; // Height in px

//   const cardElement = document.createElement("div");
//   cardElement.style.width = `${cardWidth}px`;
//   cardElement.style.height = `${cardHeight}px`;
//   cardElement.style.backgroundColor = "white";

//   cardElement.innerHTML = `
//     <div style="width: 100%; height: 100%; display: flex; flex-direction: column; overflow: hidden; background-color: white; border: 2px solid black;">
//       <div style="width: 100%; height: 50%; display: flex; flex-direction: row; border-bottom: 2px solid black;">
//         <div style="height: 100%; width: 43%; display: flex; flex-direction: column; justify-content: flex-end; padding: 10px;">
//           <img src="${userDetails.image}" style="max-height: 60%; width: 90%; object-fit: contain; margin-bottom: 10px;">
//           <img src="${backSeal}" style="height: 30%; width: auto; align-self: flex-start;">
//         </div>
//         <div style="width: 57%; display: flex; flex-direction: column; padding: 10px;">
//           <h3 style="margin: 0; text-align: center; font-size: 16px; font-family: 'Times New Roman', serif; color: black;">Spirit of Truth</h3>
//           <h6 style="margin: 4px 0 10px; text-align: center; font-size: 12px; font-weight: 300; text-decoration: underline; text-underline-offset: 2px; color: black;">Native American Church</h6>
//           <div style="font-size: 10px; line-height: 1.2; color: black;">
//             <p style="margin: 2px 0; font-weight: 200; color: black;">${userDetails.spiritualname || ""}</p>
//             <p style="margin: 2px 0; font-weight: 300; color: black;">${userDetails.firstname} ${userDetails.middlename} ${userDetails.lastname}</p>
//             <p style="margin: 2px 0; font-weight: 300; color: black;">${userDetails.addressline1}</p>
//             <p style="margin: 2px 0; font-weight: 300; color: black;">${userDetails.addressline2 || ""}</p>
//             <p style="margin: 2px 0; font-weight: 300; color: black;">${userDetails.city}, ${userDetails.state}</p>
//             <p style="margin: 2px 0; font-weight: 300; color: black;">${userDetails.zipcode}</p>
//           </div>
//           ${
//             userDetails.birthdate
//               ? `<p style="font-size: 10px; font-family: monospace; font-weight: 500; text-align: right; margin-top: auto; margin-bottom: 0; color: black;">DOB: ${new Date(
//                   userDetails.birthdate
//                 ).toLocaleDateString()}</p>`
//               : ""
//           }
//         </div>
//       </div>
//       <div style="width: 100%; height: 50%; font-size: 8px; padding: 8px; position: relative; box-sizing: border-box; transform: rotate(180deg); border-top: 2px solid black;">
//         <img src="${frontSeal}" style="position: absolute; bottom: 8px; right: 8px; height: 50px; width: auto; transform: rotate(180deg);">
//         <p style="margin: 0; padding: 0; color: black;">
//           Our members are legally recognized as "Indian" under the U.S. Federal law and are authorized to perform all religious ordinances and ceremonies pertaining to their assigned calling, in conjunction with the usage of all Plants, Animals, Stones, Feathers, and so forth which tenets unite us on the Sacred Way. All members are religiously exempt from the practices of mandated PCR swabs, immunizations, harmful masks, and all other "treatments" that go against our sincere 
//         </p>
//         <p style="margin: 0; padding: 0 60px 0 0; color: black;">
//           religious beliefs. We expect our civil and indigenous rights to be respected and upheld by all peoples and governments. Governing Laws: UDHR and NAFERA 1993
//         </p>
//       </div>
//     </div>
//   `;

//   document.body.appendChild(cardElement);

//   html2canvas(cardElement, {
//     scale: 2,
//     logging: true,
//     useCORS: true,
//     backgroundColor: "white",
//   }).then((canvas) => {
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "pt", // Use points for accurate print size
//       format: [cardWidth, cardHeight],
//     });
//     pdf.addImage(imgData, "PNG", 0, 0, cardWidth, cardHeight);
//     pdf.save("id_card.pdf");

//     document.body.removeChild(cardElement);
//   });
// };






// export const generateIDCard = (userDetails, backSeal, frontSeal) => {
//   const cardWidth = 309.375; // Width in px
//   const cardHeight = 378; // Height in px

//   const cardElement = document.createElement("div");
//   cardElement.style.width = `${cardWidth}px`;
//   cardElement.style.height = `${cardHeight}px`;
//   cardElement.style.backgroundColor = "white";

//   const dayMonthYear = (d) => {
//     // Parse the date in UTC
//     const parsedDate = new Date(d);

//     // Extract the date components in UTC
//     let ye = parsedDate.getUTCFullYear();
//     let mo = new Intl.DateTimeFormat('en', { month: 'short', timeZone: 'UTC' }).format(parsedDate);
//     let da = new Intl.DateTimeFormat('en', { day: '2-digit', timeZone: 'UTC' }).format(parsedDate);

//     return `${da}-${mo}-${ye}`;
//   };

//   cardElement.innerHTML = `
//     <div style="width: 100%; height: 100%; display: flex; flex-direction: column; overflow: hidden; background-color: white; border: 2px solid black;">
//       <!-- Front of the card -->
//       <div style="width: 100%; height: 50%; display: flex; flex-direction: row; border-bottom: 2px solid black;">
//         <!-- Image and Medicine Wheel -->
//         <div style="height: 100%; width: 43%; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding: 10px;">
//           <img src="${userDetails.image}" style="height: 60%; width: 80%; object-fit: contain; margin-bottom: 10px; border-radius: 5px;">
//           <img src="${backSeal}" style="height: 30%; width: auto; margin-top: 8px;">
//         </div>
//         <!-- User Details -->
//         <div style="width: 57%; display: flex; flex-direction: column; padding: 0px;">
//           <h3 style="margin: 0; text-align: left; font-size: 16px; font-family: 'Times New Roman', serif; color: black;">Spirit of Truth</h3>
//           <h6 style="margin: 4px 0 2px; text-align: left; font-size: 12px; font-weight: 300; text-decoration: underline; text-underline-offset: 2px; color: black;">Native American Church</h6>
//           <div style="font-size: 11px; line-height: 1.2; color: black;">
//             <p style="margin: 2px 0; font-weight: 200; color: black;">${userDetails.spiritualname || ""}</p>
//             <p style="margin: 2px 0; font-weight: 300; color: black;">${userDetails.firstname} ${userDetails.middlename} ${userDetails.lastname}</p>
//             <p style="margin: 2px 0; font-weight: 300; color: black;">${userDetails.addressline1}</p>
//             <p style="margin: 2px 0; font-weight: 300; color: black;">${userDetails.addressline2 || ""}</p>
//             <p style="margin: 2px 0; font-weight: 300; color: black;">${userDetails.city}, ${userDetails.state}</p>
//             <p style="margin: 2px 0; font-weight: 300; color: black;">${userDetails.zipcode}</p>
//           </div>
//           ${
//             userDetails.birthdate
//               ? `<p style="font-size: 11px; font-family: monospace; font-weight: 500; text-align: right; margin-top: auto; margin-bottom: 10px; margin-right:5px; color: black;">DOB: ${dayMonthYear(userDetails.birthdate)}</p>`
//               : ""
//           }
//         </div>
//       </div>
//       <!-- Back of the card -->
//       <div style="width: 100%; height: 50%; font-size: 9px; line-height: 1.4; padding: 8px; position: relative; box-sizing: border-box; transform: rotate(180deg); border-top: 2px solid black;">
//         <img src="${frontSeal}" style="position: absolute; bottom: 8px; right: 8px; height: 50px; width: auto; transform: rotate(180deg);">
//         <p style="margin: 0; padding: 0; color: black;">
//           Our members are legally recognized as "Indian" under the U.S. Federal law and are authorized to perform all religious ordinances and ceremonies pertaining to their assigned calling, in conjunction with the usage of all Plants, Animals, Stones, Feathers, and so forth which tenets unite us on the Sacred Way. All members are religiously exempt from the practices of mandated PCR swabs, immunizations, harmful masks, and all other "treatments" that go against our sincere 
//         </p>
//         <p style="margin: 0; padding: 0 60px 0 0; color: black;">
//           religious beliefs. We expect our civil and indigenous rights to be respected and upheld by all peoples and governments. Governing Laws: UDHR and NAFERA 1993
//         </p>
//       </div>
//     </div>
//   `;

//   document.body.appendChild(cardElement);

//   html2canvas(cardElement, {
//     scale: 2,
//     logging: true,
//     useCORS: true,
//     backgroundColor: "white",
//   }).then((canvas) => {
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "pt",
//       format: [cardWidth, cardHeight],
//     });
//     pdf.addImage(imgData, "PNG", 0, 0, cardWidth, cardHeight);
//     pdf.save("id_card.pdf");

//     document.body.removeChild(cardElement);
//   });
// };



// export const generateIDCard = (userDetails, backSeal, frontSeal) => {
//   const cardWidth = 309.375; // Width in px
//   const cardHeight = 378; // Height in px

//   const cardElement = document.createElement("div");
//   cardElement.style.width = `${cardWidth}px`;
//   cardElement.style.height = `${cardHeight}px`;
//   cardElement.style.backgroundColor = "white";

//   const dayMonthYear = (d) => {
//     // Parse the date in UTC
//     const parsedDate = new Date(d);

//     // Extract the date components in UTC
//     let ye = parsedDate.getUTCFullYear();
//     let mo = new Intl.DateTimeFormat('en', { month: 'short', timeZone: 'UTC' }).format(parsedDate);
//     let da = new Intl.DateTimeFormat('en', { day: '2-digit', timeZone: 'UTC' }).format(parsedDate);

//     return `${da}-${mo}-${ye}`;
//   };

//   cardElement.innerHTML = `
//     <div style="width: 100%; height: 100%; display: flex; flex-direction: column; overflow: hidden; background-color: white; border: 2px solid black;">
//       <!-- Front of the card -->
//       <div style="width: 100%; height: 50%; display: flex; flex-direction: row; border-bottom: 2px solid black;">
//         <!-- Image and Medicine Wheel -->
//         <div style="height: 100%; width: 43%; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding: 10px;">
//           <img src="${userDetails.image}" style="height: 60%; width: 80%; object-fit: contain; margin-bottom: 10px; border-radius: 5px;">
//           <img src="${backSeal}" style="height: 30%; width: auto; margin-top: 8px;">
//         </div>
//         <!-- User Details -->
//         <div style="width: 57%; display: flex; flex-direction: column; padding: 0px;">
//           <h3 style="margin: 0; text-align: left; font-size: 16px; font-family: 'Times New Roman', serif; color: black;">Spirit of Truth</h3>
//           <h6 style="margin: 4px 0 2px; text-align: left; font-size: 12px; font-weight: 300; text-decoration: underline; text-underline-offset: 2px; color: black;">Native American Church</h6>
//           <div style="font-size: 11px; line-height: 1.2; color: black;">
//             <p style="margin: 2px 0; font-weight: 200; color: black;">${userDetails.spiritualname || ""}</p>
//             <p style="margin: 2px 0; font-weight: 300; color: black;">${userDetails.firstname} ${userDetails.middlename} ${userDetails.lastname}</p>
//             <p style="margin: 2px 0; font-weight: 300; color: black;">${userDetails.addressline1}</p>
//             <p style="margin: 2px 0; font-weight: 300; color: black;">${userDetails.addressline2 || ""}</p>
//             <p style="margin: 2px 0; font-weight: 300; color: black;">${userDetails.city}, ${userDetails.state}</p>
//             <p style="margin: 2px 0; font-weight: 300; color: black;">${userDetails.zipcode}</p>
//           </div>
//           ${
//             userDetails.birthdate
//               ? `<p style="font-size: 11px; font-family: monospace; font-weight: 500; text-align: right; margin-top: auto; margin-bottom: 10px; margin-right:5px; color: black;">DOB: ${dayMonthYear(userDetails.birthdate)}</p>`
//               : ""
//           }
//         </div>
//       </div>
//       <!-- Back of the card -->
//       <div style="width: 100%; height: 50%; font-size: 9.5px; line-height: 1.4; padding: 8px; position: relative; box-sizing: border-box; transform: rotate(180deg); border-top: 2px solid black;">
//         <p style="margin: 0; padding: 3px; color: black;">
//           Our members are legally recognized as "Indian" under
//           U.S. Federal law and are authorized to perform all
//           religious ordinances and ceremonies associated with
//           their sacred calling. This includes the use of all plants,
//           animals, stones, feathers, and other Sacred Objects.
//           As a result of our sincerely held religious beliefs, our
//           members are exempt from practices such as PCR
//           swabs, immunizations, harmful masks, and other
//           medical "treatments" that conflict with those beliefs.
//           We expect our civil and Indigenous rights to be fully
//           respected and upheld by all peoples & governments.
//           Governing Laws: UDHR and NAFERA 1993.

//         </p>
//       </div>
//     </div>
//   `;

//   document.body.appendChild(cardElement);

//   html2canvas(cardElement, {
//     scale: 2,
//     logging: true,
//     useCORS: true,
//     backgroundColor: "white",
//   }).then((canvas) => {
//     const imgData = canvas.toDataURL("image/png");
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "pt",
//       format: [cardWidth, cardHeight],
//     });
//     pdf.addImage(imgData, "PNG", 0, 0, cardWidth, cardHeight);
//     pdf.save("id_card.pdf");

//     document.body.removeChild(cardElement);
//   });
// };



export const generateIDCard = (userDetails, backSeal, frontSeal) => {
  const cardWidth = 250; // Width in px
  const cardHeight = 315; // Height in px

  const cardElement = document.createElement("div");
  cardElement.style.width = `${cardWidth}px`;
  cardElement.style.height = `${cardHeight}px`;
  cardElement.style.backgroundColor = "white";

  const dayMonthYear = (d) => {
    const parsedDate = new Date(d);
    let ye = parsedDate.getUTCFullYear();
    let mo = new Intl.DateTimeFormat('en', { month: 'short', timeZone: 'UTC' }).format(parsedDate);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit', timeZone: 'UTC' }).format(parsedDate);
    return `${da}-${mo}-${ye}`;
  };

  cardElement.innerHTML = `
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column; overflow: hidden; background-color: white; border: 2px solid black;">
      <div style="width: 100%; height: 50%; display: flex; flex-direction: row; border-bottom: 2px solid black;">
        <div style="height: 100%; width: 43%; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding: 10px;">
          <img src="${userDetails.image}" style="height: 60%; width: 80%; object-fit: contain; margin-bottom: 10px; border-radius: 5px;">
          <img src="${backSeal}" style="height: 30%; width: auto; margin-top: 8px;">
        </div>
        <div style="width: 57%; display: flex; flex-direction: column; padding: 0px;">
          <h3 style="margin: 0; text-align: left; font-size: 16px; font-family: 'Times New Roman', serif; color: black;">Spirit of Truth</h3>
          <h6 style="margin: 4px 0 2px; text-align: left; font-size: 10px; font-weight: 300; text-decoration: underline; text-decoration-thickness: 0.5px; text-underline-offset: 4px; color: black;">Native American Church</h6>
          <div style="font-size: 11px; line-height: 1.2; color: black;">
            <p style="margin: 2px 0; font-weight: 200; color: black;">${userDetails.spiritualname || ""}</p>
            <p style="margin: 2px 0; font-weight: 300; color: black;">${userDetails.firstname} ${userDetails.middlename} ${userDetails.lastname}</p>
            <p style="margin: 2px 0; font-weight: 300; color: black;">${userDetails.addressline1}</p>
            <p style="margin: 2px 0; font-weight: 300; color: black;">${userDetails.addressline2 || ""}</p>
            <p style="margin: 2px 0; font-weight: 300; color: black;">${userDetails.city}, ${userDetails.state}</p>
            <p style="margin: 2px 0; font-weight: 300; color: black;">${userDetails.zipcode}</p>
          </div>
          ${userDetails.birthdate
      ? `<p style="font-size: 11px; font-family: monospace; font-weight: 500; text-align: right; margin-top: auto; margin-bottom: 10px; margin-right:5px; color: black;">DOB: ${dayMonthYear(userDetails.birthdate)}</p>`
      : ""
    }
        </div>
      </div>
      <div style="width: 100%; height: 50%; font-size: 8.2px; line-height: 1.4; padding: 2px 6px; position: relative; box-sizing: border-box; transform: rotate(180deg); border-top: 2px solid black;">
        <p style="margin: 0; padding: 2px; color: black;">
          Our members are legally recognized as "Indian" under
          U.S. Federal law and are authorized to perform all
          religious ordinances and ceremonies associated with
          their sacred calling. This includes the use of all plants,
          animals, stones, feathers, and other Sacred Objects.
          As a result of our sincerely held religious beliefs, our
          members are exempt from practices such as PCR
          swabs, immunizations, harmful masks, and other
          medical "treatments" that conflict with those beliefs.
          We expect our civil and Indigenous rights to be fully
          respected and upheld by all peoples & governments.
          Governing Laws: UDHR and NAFERA 1993.
        </p>
      </div>
    </div>
  `;

  document.body.appendChild(cardElement);

  html2canvas(cardElement, {
    scale: 2,
    logging: true,
    useCORS: true,
    backgroundColor: "white",
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      // format: [cardWidth, cardHeight],
      format: "a4",
    });
    // pdf.addImage(imgData, "PNG", 0, 0, cardWidth, cardHeight);
    // pdf.save("id_card.pdf");
    // document.body.removeChild(cardElement);
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const xPos = (pageWidth - cardWidth) / 2; // Center horizontally
    const yPos = 100; // Add margin from top

    pdf.addImage(imgData, "PNG", xPos, yPos, cardWidth, cardHeight);
    pdf.save("id_card.pdf");

    document.body.removeChild(cardElement);
  });
};

