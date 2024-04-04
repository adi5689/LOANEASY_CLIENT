// components/ApplyLoan.js
import { useState } from 'react';
import useCreateLoan from '../hooks/useCreateLoan';

const ApplyLoan = () => {
 const [amount, setAmount] = useState('');
 const [term, setTerm] = useState('');
 const [repaymentFrequency, setRepaymentFrequency] = useState('');
 const { createLoan, loading, error } = useCreateLoan();

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createLoan(amount, term, repaymentFrequency);
      alert('Loan application submitted successfully!');
      setAmount('');
      setTerm('');
      setRepaymentFrequency('');
    } catch (err) {
      alert('Failed to submit loan application. Please try again.');
    }
 };

 return (
    <div>
      <h1 className="font-anta text-center text-[32px] mt-10">APPLY FOR LOAN</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <div className="flex flex-col lg:flex-row justify-center items-center mt-10 gap-x-3 gap-y-10">
            <div>
              <input
                className="border-b border-black"
                placeholder="Enter the loan Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <input
                className="border-b border-black"
                placeholder="Enter the no. of term"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-x-2 border border-black rounded-md cursor-pointer">
              <select
                className="border-1 border-black rounded-md"
                value={repaymentFrequency}
                onChange={(e) => setRepaymentFrequency(e.target.value)}
              >
                <option>Select Loan Frequency</option>
                <option>weekly</option>
                <option>monthly</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="mt-14 p-4 bg-blue-500 rounded-md font-anta"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Apply for Loan'}
            </button>
          </div>
        </div>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
 );
};

export default ApplyLoan;
