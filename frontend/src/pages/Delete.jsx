// Import necessary modules and components from React and other libraries
import React, { useState } from 'react';
import BackButton from '../components/GoBack'; // Custom back button component
import Spinner from '../components/Spinner'; // Custom spinner component for loading state
import axios from 'axios'; // Library for making HTTP requests
import { useNavigate, useParams } from 'react-router-dom'; // Hooks for navigation and URL parameters
import { useSnackbar } from 'notistack'; // Hook for displaying notifications

// Define the Delete component
const Delete = () => {
  // useState hook to manage the loading state
  const [loading, setLoading] = useState(false);
  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();
  // Hook to get the 'id' parameter from the URL
  const { id } = useParams();
  // Hook to display notifications
  const { enqueueSnackbar } = useSnackbar();

  // Function to handle book deletion
  const handleDeleteBook = () => {
    setLoading(true); // Set loading state to true
    axios
      .delete(`http://localhost:5555/books/${id}`) // Send DELETE request to the server
      .then(() => {
        setLoading(false); // Set loading state to false on success
        enqueueSnackbar('Book has been deleted!', { variant: 'success' }); // Show success notification
        navigate('/'); // Navigate to the home page
      })
      .catch((error) => {
        setLoading(false); // Set loading state to false on error
        enqueueSnackbar('Error', { variant: 'error' }); // Show error notification
        console.log(error); // Log the error to the console
      });
  };
  
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-teal-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Delete this Book?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}

export default Delete;