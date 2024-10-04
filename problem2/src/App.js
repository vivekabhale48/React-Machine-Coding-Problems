import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [stopLoop, setStopLoop] = useState(3)
  const [startLoop, setStartLoop] = useState(0);

  let numberOfPostPerPage = 10;
  let numberOfPages = data.length / numberOfPostPerPage;
  let indexOfFirstPostOnPage = currentPage * numberOfPostPerPage;
  let indexOfLastPostOnPage = indexOfFirstPostOnPage + numberOfPostPerPage;

  useEffect(()=> {
    fetchData();
  }, [])

  async function fetchData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const result = await response.json();
    setData(result);
  }

  function handleNext() {
    if(currentPage === stopLoop - 2) {
      setStopLoop(stopLoop+1)
      setStartLoop(startLoop+1)
    }
    setCurrentPage(currentPage + 1)
  }

  function handleOnPageNumberClick(index) {
    setCurrentPage(index)
    if(currentPage === stopLoop - 2) {
      setStopLoop(stopLoop+1)
      setStartLoop(startLoop+1)
    }
  }

  function handlePrevious() {
    setCurrentPage(currentPage - 1)
  }

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
        <button disabled={currentPage === 0} onClick={handlePrevious} className={`hover:bg-orange-200 transition-all duration-200 min-w-12 h-12 flex justify-center items-center bg-slate-200 ${currentPage === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          Prev
        </button>
        {
          Array
          .from({length: Math.ceil(numberOfPages)}, (_, index)=> index)
          .slice(startLoop, stopLoop)
          .map((index) => {
            return(
              <span onClick={() => handleOnPageNumberClick(index)} className={`hover:bg-orange-200 transition-all duration-200 w-12 h-12 flex justify-center items-center cursor-pointer ${currentPage === index ? 'bg-orange-400' : 'bg-slate-200'}`}>
                  {index + 1}
              </span>
            )
          })
        }
        {
          currentPage !== numberOfPages - 1 && (
            <span className='min-w-12 h-12 flex justify-center items-center bg-slate-200'>
              ...
            </span>
          )
        }
        
        <button disabled={currentPage === numberOfPages - 1} onClick={handleNext} className={`hover:bg-orange-200 transition-all duration-200 min-w-12 h-12 flex justify-center items-center bg-slate-200 ${currentPage === numberOfPages -1 ? 'cursor-not-allowed': 'cursor-pointer'}`}>
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
