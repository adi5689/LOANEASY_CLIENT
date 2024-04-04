import { useState } from "react";
import LOGO from "../assets/LOAN.png";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { useAuthContext } from "../context/AuthContext";
import Modal from "react-modal";

// Making sure to bind the modal to app element
Modal.setAppElement("#root");

const Header = () => {
  const { currentUser, handleLogout, activeTab, setActiveTab } =
    useAuthContext();
  const [showUserOverlay, setShowUserOverlay] = useState(false);
  const [showNavOverlay, setShowNavOverlay] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setShowNavOverlay(false);
    setShowUserOverlay(false);
  };

  const handleUserIconClick = () => {
    setShowUserOverlay(!showUserOverlay);
    setShowNavOverlay(false);
  };

  const handleLogoutConfirm = () => {
    handleLogout();
    setShowLogoutModal(false);
  };

  return (
    <header className="flex justify-between items-center bg-blue-500 py-4 px-4 lg:px-10">
      <Link
        to="/"
        className="text-white cursor-pointer text-xl font-bold font-anta"
      >
        <div>
          <img src={LOGO} alt="logo" className="w-28" />
        </div>
      </Link>
      <div className="hidden lg:flex justify-between">
        <Link
          to="/"
          className={`block p-2 ${
            activeTab === "applyLoan" ? "border-b-2 border-orange-500" : ""
          } text-[20px] font-anta text-white`}
          onClick={() => handleNavClick("applyLoan")}
        >
          Apply Loan
        </Link>
        <Link
          to="/allloans"
          className={`block p-2 ${
            activeTab === "allLoans" ? "border-b-2 border-orange-500" : ""
          } text-[20px] font-anta text-white`}
          onClick={() => handleNavClick("allLoans")}
        >
          All Loans
        </Link>
      </div>
      <div className="flex items-center">
        {currentUser && (
          <>
            <FaUserCircle
              className="text-white text-2xl cursor-pointer mr-2 lg:mr-8"
              onClick={handleUserIconClick}
            />
            {showUserOverlay && (
              <div className="absolute right-0 top-[125px] w-[60vw] lg:w-[30vw] bg-gray-600 shadow-md">
                <div className="p-4">
                  <p className="font-bold text-sm lg:text-lg capitalize text-white">
                    User: {currentUser.name}
                  </p>
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="bg-red-500 text-white px-4 py-1 rounded-b-lg mt-5"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        <FaBars
          className="text-white text-2xl cursor-pointer lg:hidden"
          onClick={() => setShowNavOverlay(!showNavOverlay)}
        />
        {showNavOverlay && (
          <div className="absolute right-0 top-[125px] w-[60vw] lg:w-[30vw] bg-white shadow-md">
            <div className="p-4">
              <Link
                to="/"
                className={`block p-2 ${
                  activeTab === "applyLoan" ? "border-b-2 border-blue-500" : ""
                }`}
                onClick={() => handleNavClick("applyLoan")}
              >
                Apply Loan
              </Link>
              <Link
                to="/allloans"
                className={`block p-2 ${
                  activeTab === "allLoans" ? "border-b-2 border-blue-500" : ""
                }`}
                onClick={() => handleNavClick("allLoans")}
              >
                All Loans
              </Link>
            </div>
          </div>
        )}
      </div>
      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={showLogoutModal}
        onRequestClose={() => setShowLogoutModal(false)}
        contentLabel="Logout Confirmation"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            borderRadius: "0.25rem",
            padding: "2rem",
            width: "80%",
            maxWidth: "25rem",
          },
        }}
      >
        <h2 className="text-lg font-bold text-center mb-4 font-anta">
          Are you sure you want to logout?
        </h2>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleLogoutConfirm}
            className="font-anta bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Yes, Logout
          </button>
          <button
            onClick={() => setShowLogoutModal(false)}
            className="font-anta bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </header>
  );
};

export default Header;
