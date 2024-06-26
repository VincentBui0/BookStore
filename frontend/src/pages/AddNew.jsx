import React, { useState } from 'react';
// Importing necessary React hooks and components
import BackButton from '../components/GoBack'; // Custom BackButton component for navigation
import Spinner from '../components/Spinner'; // Custom Spinner component for loading state
import axios from 'axios'; // Importing axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for programmatic navigation
import { useSnackbar } from 'notistack'; // Importing useSnackbar hook for displaying notifications

const AddNew = () => {
  // Defining state variables for the form fields using useState hook
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [category, setCategory] = useState('');
  const [pageNumber, setPageNumber] = useState('');
  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(false); // State variable to manage loading state
  const navigate = useNavigate(); // Hook to navigate programmatically
  const { enqueueSnackbar } = useSnackbar(); // Hook to show notifications

  // Function to handle saving a new book
  const handleSaveBook = () => {
    // Creating a data object with the state values
    const data = {
      title,
      author,
      publishYear,
      category,
      pageNumber,
      rating,
    };
    
    setLoading(true); // Setting loading state to true
    
    // Making a POST request to the server to save the book data
    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false); // Setting loading state to false upon success
        enqueueSnackbar('Book Created successfully', { variant: 'success' }); // Showing success notification
        navigate('/'); // Navigating to the home page
      })
      .catch((error) => {
        setLoading(false); // Setting loading state to false upon error
        enqueueSnackbar('Error', { variant: 'error' }); // Showing error notification
        console.log(error); // Logging the error to the console
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Add New Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-teal-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-pink-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-orange-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-pink-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-orange-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-pink-500'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-orange-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-pink-500'>Category</label>
          <input
            type='text'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='border-2 border-orange-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-pink-500'>Page Number</label>
          <input
            type='text'
            value={pageNumber}
            onChange={(e) => setPageNumber(e.target.value)}
            className='border-2 border-orange-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-pink-500'>Rating</label>
          <input
            type='text'
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className='border-2 border-orange-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-teal-300 m-8' onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
}

export default AddNew