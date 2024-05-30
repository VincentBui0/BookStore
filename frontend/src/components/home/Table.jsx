import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
//Option to configure formatting of entries into that of a Table

const Table = ({ books }) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-900 rounded-md'>No</th>
          <th className='border border-slate-900 rounded-md'>Title</th>
          <th className='border border-slate-900 rounded-md max-md:hidden'>Author</th>
          <th className='border border-slate-900 rounded-md max-md:hidden'>Publish Year</th>
          <th className='border border-slate-900 rounded-md max-md:hidden'>Category</th>
          <th className='border border-slate-900 rounded-md max-md:hidden'>Page Number</th>
          <th className='border border-slate-900 rounded-md max-md:hidden'>Rating</th>
          <th className='border border-slate-900 rounded-md'>Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className='h-8'>
            <td className='border border-slate-900 rounded-md text-center'>{index + 1}</td>
            <td className='border border-slate-900 rounded-md text-center'>{book.title}</td>
            <td className='border border-slate-900 rounded-md text-center max-md:hidden'>{book.author}</td>
            <td className='border border-slate-900 rounded-md text-center max-md:hidden'>{book.publishYear}</td>
            <td className='border border-slate-900 rounded-md text-center max-md:hidden'>{book.category}</td>
            <td className='border border-slate-900 rounded-md text-center max-md:hidden'>{book.pageNumber}</td>
            <td className='border border-slate-900 rounded-md text-center max-md:hidden'>{book.rating}</td>
            <td className='border border-slate-900 rounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className='text-2xl text-green-800' />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className='text-2xl text-yellow-300' />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className='text-2xl text-red-600' />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
