import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { classesSliceSelector } from "../redux/classesSlice/slice";

const Withdraw = ({ classId }) => {
  const [withdrawalStatus, setWithdrawalStatus] = useState(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // New state for error handling

  const { error: reduxError } = useSelector(classesSliceSelector);

  useEffect(() => {
    const fetchWithdrawalStatus = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8080/withdraw/status?classId=${classId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setWithdrawalStatus(response.data.withdrawal.status);
        setError(null); // Clear any previous errors
      } catch (e) {
        console.error("Error fetching withdrawal status:", e);
        setWithdrawalStatus(null); // Ensure status is cleared on error
        setError("Failed to fetch withdrawal status."); // Set error state
      }
    };

    fetchWithdrawalStatus();
  }, [classId]);

  const handleWithdraw = async () => {
    setLoading(true);
    try {
      await axios.post(
        "http://127.0.0.1:8080/withdraw",
        {
          classId,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setWithdrawalStatus("Pending");
      setError(null); // Clear any previous errors
    } catch (e) {
      console.error("Error processing withdrawal:", e);
      setWithdrawalStatus(null); // Ensure status is cleared on error
      setError("Failed to process withdrawal."); // Set error state
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Withdrawal Request Status</h2>
      {error && <p>{error}</p>} {/* Display error message if present */}
      {withdrawalStatus ? (
        <p>Status: {withdrawalStatus}</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Reason for withdrawal"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
          <button onClick={handleWithdraw} disabled={loading}>
            {loading ? "Processing..." : "Withdraw"}
          </button>
        </>
      )}
    </div>
  );
};

export default Withdraw;
