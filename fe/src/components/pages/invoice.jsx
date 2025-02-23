import { useReactToPrint } from 'react-to-print';
import { useRef, useState } from 'react';

const Invoice = () => {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>buka</button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <button onClick={() => reactToPrintFn()}>Print</button>
          <div ref={contentRef} className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold">Popup Title</h2>
            <p className="mt-2 text-gray-600">This is a simple popup component.</p>
            <button className="mt-4 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoice;
