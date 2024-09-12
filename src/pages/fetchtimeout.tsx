import { useState } from "react";

const FetchTimeoutExample = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "/api/hello",
        {
          signal: AbortSignal.timeout(1000),
        }
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

  return (
    <div className="flex flex-col items-center justify-center">
      {loading ? (
        <p className="text-gray-700">Loading...</p>
      ) : (
        <>
          <button onClick={fetchData} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Fetch Data with Timeout</button>
          {data && <p className="text-green-500">Data: {JSON.stringify(data)}</p>}
          {error && <p className="text-red-500">Error: {JSON.stringify(error)}</p>}
        </>
      )}
    </div>
  );
};

export default FetchTimeoutExample;
