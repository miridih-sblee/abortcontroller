import { useEffect, useState } from "react";

const Logger = () => {
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    document.addEventListener("mousemove", () => console.log("mousemove"), {
      signal,
    });
    document.addEventListener("mousedown", () => console.log("mousedown"), {
      signal,
    });
    document.addEventListener("mouseup", () => console.log("mouseup"), {
      signal,
    });

    return () => {
      abortController.abort();
    };
  }, []);

  return null;
};

const LoggerWithAbortController = () => {
  const [logAbort, setLogAbort] = useState(false);

  return (
    <div>
      <div className="flex justify-center space-x-4 mb-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setLogAbort(true)}>abort 로그시작</button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => setLogAbort(false)}>abort 로그종료</button>
      </div>
      {logAbort && <Logger />}
    </div>
  );
};
export default LoggerWithAbortController;
