import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Library for making HTTP requests
import Spinner from '../components/Spinner'; // Custom spinner component for loading state
import { Link } from 'react-router-dom'; // Link component for navigation
import { MdOutlineAddBox } from 'react-icons/md'; // Icon component from react-icons library
import Table from '../components/home/Table'; // Custom Table component
import Card from '../components/home/Card'; // Custom Card component

// Define the Home component
const Home = () => {
  // useState hooks to manage state variables
  const [books, setBooks] = useState([]); // State to store the list of books
  const [loading, setLoading] = useState(false); // State to manage the loading state
  const [showType, setShowType] = useState('table'); // State to toggle between 'table' and 'card' view

  // useEffect hook to perform side effects (e.g., data fetching) when the component mounts
  useEffect(() => {
    setLoading(true); // Set loading state to true
    axios
      .get('http://localhost:5555/books') // Send GET request to fetch books data
      .then((response) => {
        setBooks(response.data.data); // Update books state with the fetched data
        setLoading(false); // Set loading state to false after data is loaded
      })
      .catch((error) => {
        console.log(error); // Log any error that occurs during the request
        setLoading(false); // Set loading state to false even if there is an error
      });
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-teal-300 hover:bg-teal-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className='bg-teal-300 hover:bg-teal-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Available Books</h1>
        <Link to='/books/addnew'>
          <MdOutlineAddBox className='text-teal-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <Table books={books} />
      ) : (
        <Card books={books} />
      )}
    </div>
  );
};
export default Home;