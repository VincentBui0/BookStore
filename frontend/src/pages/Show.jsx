import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Library for making HTTP requests
import { useParams } from 'react-router-dom'; // Hook for accessing URL parameters
import BackButton from '../components/GoBack'; // Custom back button component
import Spinner from '../components/Spinner'; // Custom spinner component for loading state

// Define the ShowBook component
const ShowBook = () => {
  // useState hooks to manage state variables
  const [book, setBook] = useState({}); // State to store the book details
  const [loading, setLoading] = useState(false); // State to manage the loading state
  const { id } = useParams(); // Hook to get the 'id' parameter from the URL

  // useEffect hook to perform side effects (e.g., data fetching) when the component mounts
  useEffect(() => {
    setLoading(true); // Set loading state to true
    axios
      .get(`http://localhost:5555/books/${id}`) // Send GET request to fetch book details by ID
      .then((response) => {
        setBook(response.data); // Update book state with the fetched data
        setLoading(false); // Set loading state to false after data is loaded
      })
      .catch((error) => {
        console.log(error); // Log any error that occurs during the request
        setLoading(false); // Set loading state to false even if there is an error
      });
  }, [id]); // Dependency array with 'id' ensures this effect runs when the 'id' changes


  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{book._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Title</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Author</span>
            <span>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Category</span>
            <span>{book.category}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Page Number</span>
            <span>{book.pageNumber}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Rating</span>
            <span>{book.rating}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;