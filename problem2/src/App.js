import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(()=> {
    fetchData();
  }, [])

  async function fetchData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const result = await response.json();
    setData(result);
  }

  let numberOfPostPerPage = 10;
  let numberOfPages = data.length / numberOfPostPerPage;
  let indexOfFirstPostOnPage = currentPage * numberOfPostPerPage;
  let indexOfLastPostOnPage = indexOfFirstPostOnPage + numberOfPostPerPage;

  const displayData = data.slice(indexOfFirstPostOnPage, indexOfLastPostOnPage);
  return (
    <div className="App m-5">
      <header className='text-[48px] font-bold text-center mb-10'>Pagination Implementation</header>
      <ul className='space-y-4'>
        {
          displayData && displayData.map((data, index) => (
              <li key={index} className='flex items-center bg-gray-100 p-4 rounded-lg shadow-md text-[20px]'>
                  <span className='font-bold'>{data?.title}</span> 
              </li>
          ))
        }
      </ul>

      <div className='mt-5 flex justify-center gap-3'>
        <button disabled={currentPage === 0} onClick={() => setCurrentPage(currentPage - 1)} className={`min-w-12 h-12 flex justify-center items-center bg-slate-200 ${currentPage === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          Prev
        </button>
        {
          Array.from({length: Math.ceil(numberOfPages)}, (_, index)=>{
            return(
              <span onClick={() => setCurrentPage(index)} className={`w-12 h-12 flex justify-center items-center cursor-pointer ${currentPage === index ? 'bg-orange-300' : 'bg-slate-200'}`}>
                {index + 1}
              </span>
            )
          })
        }
        <button disabled={currentPage === numberOfPages - 1} onClick={() => setCurrentPage(currentPage + 1)} className={`min-w-12 h-12 flex justify-center items-center bg-slate-200 ${currentPage === numberOfPages -1 ? 'cursor-not-allowed': 'cursor-pointer'}`}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
