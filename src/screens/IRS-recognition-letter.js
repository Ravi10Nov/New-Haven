// import { ArrowForward, ArrowBack } from '@material-ui/icons'
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import Footer from '../components/footer';
import NavbarComp from '../components/navbar';
import '../css/RiseofMedical.css';
import { Document,Page,pdfjs } from 'react-pdf'
import IRSdeterminationletter from '../assets/pdfs/IRS Determination Letter.pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function IRSRecognitionLetter() {
  return (
    <div id="Top">
      <NavbarComp />
      <div className='container flex items-center justify-center' style={{ padding: 15 }}>
      <Document size='B0' file={IRSdeterminationletter} onLoadError={(error)=>{console.log(error)}}>
          <Page size='B0' pageNumber={1} />
      </Document>

      </div>
      <Footer />
    </div>
  );
}
