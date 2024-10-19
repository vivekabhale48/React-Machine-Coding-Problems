import { useEffect, useRef, useState } from 'react';
import './App.css'

function App() {
  
  const [enteredValue, setEnteredValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [originalSelectedSuggestions, setOriginalSelectedSuggestions] = useState([]);
  const inputRef = useRef();
  const [selectedUserEmailSet, setSelectedUserEmailSet] = useState(new Set());

  useEffect(() => {
    function findSuggestions() {
      if(enteredValue.trim() === '') {
        setSuggestions([]);
        return;
      };
      fetch(`https://dummyjson.com/users/search?q=${enteredValue}`)
      .then((response) => response.json())
      .then((results) => setSuggestions(results?.users))
      .catch((err) => console.log(err))
    }
    findSuggestions();
    
    
  }, [enteredValue])



  function selectedSuggestions(user) {
    setOriginalSelectedSuggestions([...originalSelectedSuggestions, user])
    setSelectedUserEmailSet(new Set([...selectedUserEmailSet, user.email]))
    setEnteredValue("");
    setSuggestions([])
    inputRef.current.focus();
  }

  return (
    <main>
      <div className='mt-2 border-gray-300 border-[2px] rounded-[50px] mx-3 flex'>
        {
          originalSelectedSuggestions && originalSelectedSuggestions.map((user, index) => (
            <span key={index} className='px-4 bg-black text-sm text-white rounded-[50px] flex items-center justify-center my-2 mx-1 text-nowrap'>
              <img className='w-5 h-5 mr-4' src={user?.image} alt={user?.email} />
              {`${user?.firstName} ${user?.lastName}`}
              <span className='text-xl text-white mx-2 mb-1 cursor-pointer'>x</span>
            </span>
          ))
        }
        <input ref={inputRef} value={enteredValue} onChange={(e) => setEnteredValue(e.target.value)} className='w-full p-3 bg-transparent outline-none' type="text" />
      </div>
      {/* suggestions  */}
      {
        suggestions.length > 0 && (
          <ul className='no-scrollbar h-[350px] overflow-y-auto flex flex-col ml-[20px] mt-[10px] border-gray-500 border-[1.5px] w-fit bg-[#fcfafabd] rounded'>
            {
              suggestions?.map((user) => (
                !selectedUserEmailSet.has(user.email) ? (
                <li onClick={() => selectedSuggestions(user)} className='flex items-center border-b p-2 hover:bg-slate-100 cursor-pointer' key={user?.email}>
                  <img className='w-7 h-7 mr-4' src={user?.image} alt={user?.email} />
                  {`${user?.firstName} ${user?.lastName}`}
                </li>
                ) : 
                (<></>)
              ))
            }
          </ul>
        )
      }
    </main>

  )
}

export default App
