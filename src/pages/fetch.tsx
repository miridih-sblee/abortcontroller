import { useState } from "react";

const FetchExample = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setData(null);
    setError(null);
    const controller = new AbortController();
    setAbortController(controller);
    const { signal } = controller;

    /* signal.addEventListener("abort", () => {
      console.log("abort");
    }); */

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

  const handleAbort = () => {
    if (abortController) {
      abortController.abort();
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {loading ? (
        <>
          <p className="text-gray-700">Loading...</p>
          <button onClick={handleAbort} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Abort</button>
        </>
      ) : (
        <>
                  <button onClick={handleAbort} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Abort</button>

          <button onClick={fetchData} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Fetch Data</button>
          {data && <p className="text-green-500">Data: {JSON.stringify(data)}</p>}
          {error && <p className="text-red-500">Error: {JSON.stringify(error)}</p>}
        </>
      )}
    </div>
  );
};

export default FetchExample;
