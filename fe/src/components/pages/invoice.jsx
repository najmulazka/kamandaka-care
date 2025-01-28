import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

const Invoice = () => {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div>
      <button onClick={() => reactToPrintFn()}>Print</button>
      <div ref={contentRef}>This is Invoice</div>
    </div>
  );
};

export default Invoice;
