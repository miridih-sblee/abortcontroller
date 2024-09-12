import { useEffect, useState } from "react";

const FetchWithAbortController = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(false);
  const [abortController, setAbortController]= useState<AbortController>();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setAbortController(controller)

    const fetchData = async () => {
      setLoading(true);
      setData(null);
      setError(null);

      try {
        const response = await fetch(
          "/api/hello",
          { signal }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {loading ? (
        <>
          {abortController && <button onClick={() => abortController.abort()} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Abort</button>}
          <p className="text-gray-700 font-bold">Loading...</p>
        </>
      ) : (
        <>
          {data && <p className="text-green-500">Data: {JSON.stringify(data)}</p>}
          {error && <p className="text-red-500">Error: {JSON.stringify(error)}</p>}
        </>
      )}
    </div>
  );
};


const FetchUnmount = () => {
  const [isMounted, setIsMounted] = useState(false);

  const handleMount = () => setIsMounted(true);
  const handleUnmount = () => setIsMounted(false);

  return (
    <div className="flex flex-col items-center justify-center">
      <button onClick={isMounted ? handleUnmount : handleMount} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {isMounted ? 'Unmount' : 'Mount'}
      </button>
      {isMounted && <FetchWithAbortController />}
    </div>
  );
};


export default FetchUnmount;
