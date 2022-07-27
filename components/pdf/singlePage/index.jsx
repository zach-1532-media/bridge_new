/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-shadow */

import { React, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import workerSrc from '../../../lib/pdf-worker';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const SinglePage = ({ pdf }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const OnDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ mb: '1em' }}>
        <Document file={pdf} onLoadSuccess={OnDocumentLoadSuccess}>
          {Array.from({ length: numPages }, (_, index) => (
            <Box border={1}>
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </Box>
          ))}
        </Document>
      </Box>
      <Box>
        <Typography variant="body1" sx={{ mb: '.5em' }}>
          Page {pageNumber || numPages ? 1 : '--'} of {numPages || '--'}
        </Typography>
        {numPages >= 1 ? (
          <></>
        ) : (
          <>
            <Button
              variant="outlined"
              disabled={pageNumber <= 1}
              onClick={previousPage}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              Next
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SinglePage;
