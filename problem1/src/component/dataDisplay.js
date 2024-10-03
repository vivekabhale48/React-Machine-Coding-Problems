import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, setIsDataGot } from "../redux/fetchSlice";

export default function DataDisplay() {
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.data);
    const lastFetched = useSelector((state) => state.data.lastFetched);
    const [canRefreshFromStore, setCanRefreshFromStore] = useState(true);
    const isDataGot = useSelector((state) => state.data.isDataGot);
    

    useEffect(()=>{
        dispatch(fetchData());
        dispatch(setIsDataGot(true));
        const timer = setInterval(() => {
            setCanRefreshFromStore(false);
          }, 5000);
      
        return () => clearTimeout(timer);
    }, [dispatch])

    function handleRefresh() {
        if(canRefreshFromStore) {
            console.log('do notting');
        }
        else {
            console.log('fetched data from the api!');
            dispatch(fetchData());
            setCanRefreshFromStore(true)
        }
    }  
    return (
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Data Display</h1>
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleRefresh}
            >
              Refresh Data
            </button>
          </div>
    
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <ul className="grid grid-cols-1 gap-4">
                {
                    data && data.slice(0, 10).map((item) => (
                        <li key={item.id} className="p-4 bg-white shadow-md rounded-lg">
                            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.body}</p>
                        </li>
                    ))
                }
            </ul>
          )}
        </div>
      );
}