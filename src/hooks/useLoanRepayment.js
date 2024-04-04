import { useState, useEffect, useCallback, useMemo } from 'react';
import api from './api';
import { useAuthContext } from '../context/AuthContext'; 

const useLoanRepayments = (userId) => {
    const { currentUser } = useAuthContext();
    const [loans, setLoans] = useState([]);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [selectedRepayment, setSelectedRepayment] = useState(null);
    const [amountError, setAmountError] = useState('');
    const [showPayNowButton, setShowPayNowButton] = useState(true);
    const [repaymentSuccess, setRepaymentSuccess] = useState(false);

    const fetchLoans = useCallback(async () => {
        if (!currentUser) return; 

        try {
            const token = currentUser.token; 
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            };
            const response = await api.get(`/api/loans/user`, config);
            setLoans(response.data);
        } catch (error) {
            console.error('Failed to fetch loans:', error);
        }
    }, [currentUser]);

    useEffect(() => {
        fetchLoans();
    }, [fetchLoans]);

    const fetchLoanDetails = useCallback(async (loanId) => {
        if (!currentUser) return; 

        try {
            const token = currentUser.token; 
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            };
            const response = await api.get(`/api/loans/user/${loanId}`, config);
            setSelectedLoan(response.data);
        } catch (error) {
            console.error('Failed to fetch loan details:', error);
        }
    }, [currentUser]);

    const handleLoanClick = useCallback((loan) => {
        fetchLoanDetails(loan.id);
    }, [fetchLoanDetails]);

    const handleCloseDropdown = useCallback(() => {
        setSelectedLoan(null);
    }, []);

    const handlePayNowClick = useCallback((repayment) => {
        setSelectedRepayment(repayment);
        setAmountError('');
        setShowPayNowButton(false);
    }, []);

    const handlePaymentSubmit = useCallback(async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const amount = parseFloat(formData.get('amount'));
    
        if (amount < selectedRepayment.amount) {
            setAmountError("The installment amount must be equal to or greater.");
            return;
        }
    
        try {
            if (!currentUser) return; // Ensure currentUser is available
    
            const token = currentUser.token; // Assuming the token is stored in currentUser
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            };
            const response = await api.post('/api/repayments/makerepayment', {
                loanId: selectedRepayment.loan,
                termId: selectedRepayment.id,
                amount: amount,
            }, config);
    
            // After successfully submitting the repayment, refetch the loan details to update the repayment data
            setRepaymentSuccess(true); // Set repaymentSuccess to true
            fetchLoanDetails(selectedLoan.id);
        } catch (error) {
            console.error('Failed to submit repayment:', error);
        }
    }, [currentUser, selectedRepayment, selectedLoan, fetchLoanDetails]);
    
    

    return {
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
    };
};

export default useLoanRepayments;
