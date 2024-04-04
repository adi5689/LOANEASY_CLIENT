import LOGO from "../assets/LOAN.png";
import useAdminPanel from "../hooks/useAdminPanel";
import { useAuthContext } from "../context/AuthContext";
import Modal from 'react-modal'; 
import { useState } from 'react'; 


Modal.setAppElement('#root');

const AdminSection = () => {
 const { loans, loading, error, approveLoan } = useAdminPanel();
 const { handleLogout } = useAuthContext();
 const [showLogoutModal, setShowLogoutModal] = useState(false); 

 if (loading) return <div>Loading...</div>;
 if (error) return <div>Error: {error}</div>;

 const handleLogoutConfirm = () => {
    handleLogout();
    setShowLogoutModal(false); 
 };

 return (
    <div>
      <header className="flex justify-between items-center bg-blue-500 py-4 px-4 lg:px-10">
        <div>
          <img src={LOGO} alt="logo" className="w-28" />
        </div>
        <div className="text-white text-xl font-bold font-anta">ADMIN DASH</div>
        <button
          onClick={() => setShowLogoutModal(true)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </header>
      <h1 className="font-anta text-center text-[24px] p-5">All Loans</h1>
      <div className="overflow-x-auto p-4 lg:p-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="col-width">SL no.</th>
              <th className="col-width">Applicant Name</th>
              <th className="col-width">ID</th>
              <th className="col-width">Amount</th>
              <th className="col-width">Term</th>
              <th className="col-width">Frequency</th>
              <th className="col-width">Status</th>
              <th className="col-width">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loans.map((loan, index) => (
              <tr key={index}>
                <td className="col-width text-center">{index + 1}</td>
                <td className="capitalize col-width text-center">{loan.userName}</td>
                <td className="col-width text-center">{loan._id}</td>
                <td className="col-width text-center">&#8377; {loan.amount}</td>
                <td className="col-width text-center">{loan.term}</td>
                <td className="col-width text-center">{loan.repaymentFrequency}</td>
                <td className="col-width text-center">{loan.status}</td>
                <td className="col-width flex justify-center">
                 {loan.status !== "APPROVED" && loan.status !== "PAID" && (
                    <button
                      onClick={() => approveLoan(loan._id)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Approve
                    </button>
                 )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={showLogoutModal}
        onRequestClose={() => setShowLogoutModal(false)}
        contentLabel="Logout Confirmation"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white', 
            borderRadius: '0.25rem', 
            padding: '2rem', 
            width: '80%', 
            maxWidth: '25rem', 
          },
        }}
      >
        <h2 className="text-lg font-bold text-center mb-4 font-anta">Are you sure you want to logout?</h2>
        <div className="flex justify-center space-x-4">
          <button onClick={handleLogoutConfirm} className="bg-blue-500 text-white font-anta px-4 py-2 rounded-lg">Yes, Logout</button>
          <button onClick={() => setShowLogoutModal(false)} className="bg-red-500 text-white font-anta px-4 py-2 rounded-lg">Cancel</button>
        </div>
      </Modal>
    </div>
 );
};

export default AdminSection;
