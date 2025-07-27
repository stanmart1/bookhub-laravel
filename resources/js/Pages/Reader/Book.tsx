import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import EReader from '../../Components/Reader/EReader';
import ReaderContainer from '../../Components/Reader/ReaderContainer';
import ReaderToolbar from '../../Components/Reader/ReaderToolbar';
import ReaderSidebar from '../../Components/Reader/ReaderSidebar';
import ReaderControls from '../../Components/Reader/ReaderControls';
import PageNavigation from '../../Components/Reader/PageNavigation';
import ReaderSettings from '../../Components/Reader/ReaderSettings';

const fetchBook = async (bookId) => {
  const { data } = await axios.get(`/api/books/${bookId}`);
  return data;
};

const Book = () => {
  const { props } = usePage();
  const { bookId } = props;
  const { data: book, isLoading, isError } = useQuery(['book', bookId], () => fetchBook(bookId));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const totalPages = 100; // This will come from the book data later

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleMoreClick = () => {
    // Handle more options
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading book</div>;
  }

  return (
    <EReader>
      <ReaderToolbar
        title={book.title}
        onMenuClick={handleMenuClick}
        onMoreClick={handleMoreClick}
      />
      <ReaderSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        items={[{ label: 'Chapter 1' }, { label: 'Chapter 2' }]} // This will come from the book data later
      />
      <ReaderContainer>
        {/* PDF.js or ePub.js viewer will go here, using book.file_path */}
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '2rem'
        }}>
          Page {page} of {book.title}
        </div>
      </ReaderContainer>
      <PageNavigation page={page} count={totalPages} onChange={handlePageChange} />
      <ReaderControls />
      <button onClick={() => setSettingsOpen(true)}>Settings</button>
      <ReaderSettings open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </EReader>
  );
};

export default Book;
