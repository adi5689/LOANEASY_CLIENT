import useLoanRepayments from "../hooks/useLoanRepayment"; 
import { useAuthContext } from "../context/AuthContext";
import FOUND from '../assets/450.jpg';
import { Link } from "react-router-dom";

const AllLoans = () => {
  const { currentUser, setActiveTab } = useAuthContext();
  const userId = currentUser?.id;

  const {
    loans,
    selectedLoan,
    selectedRepayment,
    amountError,
    handleLoanClick,
    handleCloseDropdown,
    handlePayNowClick,
    handlePaymentSubmit,
    showPayNowButton,
    repaymentSuccess,
  } = useLoanRepayments(userId);

  const formatDate = (date) => {
    // Check if date is already a Date object
    if (date instanceof Date) {
      // Extracting the date parts
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } else {
      // If it's a string, trying to parse it
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        // Handling invalid date string
        return "Invalid Date";
      } else {
        // Extracting the date parts
        const day = parsedDate.getDate().toString().padStart(2, "0");
        const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
        const year = parsedDate.getFullYear();
        return `${day}/${month}/${year}`;
      }
    }
  };  
  return (
    <div>
      {loans.length === 0 ? (
        <div className="text-center font-anta flex justify-center items-center flex-col flex-shrink-0">
          <h1 className="font-anta text-center text-[32px] mt-10">ALL LOANS</h1>
          <img src={FOUND} alt="not found" className="mt-10 h-80"/>
        <p className="text-[24px] mt-5">No loan found.</p>
        
          <Link to="/" className="p-4 font-anta bg-blue-500 rounded-md mt-5" onClick={() => setActiveTab('applyLoan')}>
            <span>Apply for your first loan!</span>
          </Link>
        
      </div>
      ) : (
        <><h1 className="font-anta text-center text-[32px] mt-10">ALL LOANS</h1>
        <div className="mt-10">
          {loans.map((loan) => (
            <div
              key={loan.id}
              className="border-b border-gray-200 cursor-pointer p-4"
              onClick={() => handleLoanClick(loan)}
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-anta">Amount: &#8377;{loan.amount}</p>
                  <p className="font-anta">Term: {loan.term}</p>
                  <p className="font-anta">
                    Application Date: {formatDate(loan.date)}
                  </p>
                  <p className="font-anta">
                    Frequency: {loan.repaymentFrequency}
                  </p>
                </div>
                <div>
                  <p className="font-anta">
                    Status:
                    <span
                      className={`font-bold ${
                        loan.status === "PENDING"
                          ? "text-red-500"
                          : loan.status === "PAID"
                          ? "text-green-500"
                          : loan.status === "APPROVED"
                          ? "text-blue-500"
                          : ""
                      }`}
                    >
                     {" "} {loan.status}
                    </span>
                  </p>
                </div>
              </div>
              {selectedLoan && selectedLoan.id === loan.id && (
                <div className="mt-4 text-center">
                  <h2 className="text-xl font-anta mb-4">Repayment Details</h2>
                  {loan.repayments.map((repayment, index) => (
                    <div
                      key={index}
                      className="mb-2 border border-black rounded-md py-5"
                    >
                      <p className="font-anta">Installment {index + 1}:</p>
                      <p className="font-anta">
                        Amount: &#8377;{repayment.amount}
                      </p>
                      <p className="font-anta">
                        Due Date: {formatDate(repayment.dueDate)}
                      </p>
                      {loan.status === "APPROVED" && (
                        <p className="font-anta">
                          Status:
                          <span
                            className={`font-bold ${
                              repayment.status === "PENDING"
                                ? "text-red-500"
                                : repayment.status === "PAID"
                                ? "text-green-500"
                                : ""
                            }`}
                          >
                           {" "} {repayment.status}
                          </span>
                        </p>
                      )}
                      {loan.status === "APPROVED" &&
                        repayment.status === "PENDING" &&
                        showPayNowButton && (
                          <button
                            onClick={() => handlePayNowClick(repayment)}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                          >
                            Pay Now
                          </button>
                        )}
                      {selectedRepayment &&
                        selectedRepayment.id === repayment.id &&
                        (repayment.status === "PAID" ? null : repaymentSuccess ? (
                          <div className="mt-4 text-center">
                            <p className="text-green-500">
                              Your repayment is successful. Please wait a few
                              seconds for it to reflect in your statement.
                            </p>
                          </div>
                        ) : (
                          <form onSubmit={handlePaymentSubmit} className="mt-4">
                            <input
                              type="hidden"
                              name="loanId"
                              value={selectedRepayment.loan}
                            />
                            <input
                              type="hidden"
                              name="repaymentId"
                              value={selectedRepayment._id}
                            />
                            <label htmlFor="amount">Amount:</label>
                            <input
                              type="number"
                              name="amount"
                              id="amount"
                              required
                              className="border border-gray-300 p-2 rounded ml-2"
                            />
                            {amountError && (
                              <p className="text-red-500 text-sm my-2">
                                {amountError}
                              </p>
                            )}
                            <button
                              type="submit"
                              className="bg-green-500 text-white px-4 py-2 rounded ml-2"
                            >
                              Proceed
                            </button>
                          </form>
                        ))}
                    </div>
                  ))}
                  <button
                    onClick={handleCloseDropdown}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        </>
      )}
    </div>
  );
};


export default AllLoans;
