import { useState } from "react";

const LongTaskExample = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const startLongTask = () => {
    setIsRunning(true);
    const abortController = new AbortController();
    setAbortController(abortController);
    const worker = new Worker('/longTaskWorker.js');
    worker.postMessage('start');

    new Promise((resolve, reject) => {
      abortController.signal.addEventListener('abort', () => {
        reject(abortController.signal.reason);
      });
      worker.onmessage = (e) => {
        console.log('message', e.data);
        resolve(e.data);
      };
      worker.onerror = (e) => {
        reject(e);
      };
    })
    .catch(console.error)
    .finally(() => {
      setIsRunning(false);
      worker.terminate();
    });
  };

  const handleAbort = () => {
    if (abortController) {
      abortController.abort();
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
          <button onClick={startLongTask} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start Long Task with worker</button>
        </>
      )}
    </div>
  );
};

export default LongTaskExample;
