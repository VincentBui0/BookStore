import React, { useState, useEffect } from 'react';
import BackButton from '../components/GoBack'; // Custom back button component
import Spinner from '../components/Spinner'; // Custom spinner component for loading state
import axios from 'axios'; // Library for making HTTP requests
import { useNavigate, useParams } from 'react-router-dom'; // Hooks for navigation and accessing URL parameters
import { useSnackbar } from 'notistack'; // Hook for displaying notifications

// Define the Edit component
const Edit = () => {
  // useState hooks to manage form input states
  const [title, setTitle] = useState(''); // State for book title
  const [author, setAuthor] = useState(''); // State for book author
  const [publishYear, setPublishYear] = useState(''); // State for book publish year
  const [category, setCategory] = useState(''); // State for book category
  const [pageNumber, setPageNumber] = useState(''); // State for book page number
  const [rating, setRating] = useState(''); // State for book rating
  const [loading, setLoading] = useState(false); // State to manage the loading state
  const navigate = useNavigate(); // Hook for navigation
  const { id } = useParams(); // Hook to get the 'id' parameter from the URL
  const { enqueueSnackbar } = useSnackbar(); // Hook to show notifications

  // useEffect hook to fetch book data when the component mounts
  useEffect(() => {
    setLoading(true); // Set loading state to true
    axios.get(`http://localhost:5555/books/${id}`) // Send GET request to fetch book details by ID
      .then((response) => {
        // Set form input states with the fetched data
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setCategory(response.data.category);
        setPageNumber(response.data.pageNumber);
        setRating(response.data.rating);
        setLoading(false); // Set loading state to false after data is loaded
      })
      .catch((error) => {
        setLoading(false); // Set loading state to false even if there is an error
        alert('An error happened. Please check console'); // Show alert message for error
        console.log(error); // Log error to console
      });
  }, [id]); // Dependency array with 'id' ensures this effect runs when the 'id' changes

  // Function to handle form submission for editing the book
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
      category,
      pageNumber,
      rating
    };
    setLoading(true); // Set loading state to true
    axios.put(`http://localhost:5555/books/${id}`, data) // Send PUT request to update book details
      .then(() => {
        setLoading(false); // Set loading state to false after request is complete
        enqueueSnackbar('Book has been edited!', { variant: 'success' }); // Show success notification
        navigate('/'); // Navigate to the home page
      })
      .catch((error) => {
        setLoading(false); // Set loading state to false even if there is an error
        enqueueSnackbar('Error', { variant: 'error' }); // Show error notification
        console.log(error); // Log error to console
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
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
            type='number'
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
        <button className='p-2 bg-teal-300 m-8' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default Edit