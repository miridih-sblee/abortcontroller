import { useState } from "react";

const LongTaskExample = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const startLongTask = async () => {
    setIsRunning(true);
    const controller = new AbortController();
    setAbortController(controller);
    const { signal } = controller;

    try {
      alert(await new Promise((resolve, reject) => {
        let i = 0;
        const interval = setInterval(() => {
          if (signal.aborted) {
            clearInterval(interval);
            reject(signal.reason);
          } else {
            console.log(`Iteration ${i + 1}`);
            i++;
            if (i === 5) {
              clearInterval(interval);
              resolve('Task resolved');
            }
          }
        }, 1000);
        signal.addEventListener('abort', () => {
          clearInterval(interval);
          reject(signal.reason);
        });
      }));
    } catch (error) {
      console.error("Error during long task:", error);
    } finally {
      setIsRunning(false);
    }
  };

  const handleAbort = () => {
    if (abortController) {
      abortController.abort();
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {isRunning ? (
        <>
          <p className="text-gray-700">Long task running...</p>
          <button onClick={handleAbort} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Abort</button>
        </>
      ) : (
        <>
          <button onClick={startLongTask} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start Long Task</button>
        </>
      )}
    </div>
  );
};

export default LongTaskExample;
