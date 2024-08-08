import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const RequestWithdrawal = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8080/withdraw", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setWithdrawals(response.data);
      } catch (error) {
        console.error("Error fetching withdrawal requests:", error);
      }
    };

    fetchWithdrawals();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://127.0.0.1:8080/withdraw/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setWithdrawals((prevWithdrawals) =>
        prevWithdrawals.map((withdrawal) =>
          withdrawal._id === id ? { ...withdrawal, status } : withdrawal
        )
      );
    } catch (error) {
      console.error(`Error updating status to ${status}:`, error);
    }
  };

  const handleApprove = (id) => {
    updateStatus(id, "approved");
  };

  const handleReject = (id) => {
    updateStatus(id, "rejected");
  };

  return (
    <div className="container mt-5">
      <h2>Withdrawal Requests</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Student Name</th>
            <th scope="col">Class Title</th>
            <th scope="col">Reason</th>
            <th scope="col">Status</th>
            <th scope="col">Request Date</th>
            <th scope="col">Check</th>
          </tr>
        </thead>
        <tbody>
          {withdrawals.map((withdrawal) => (
            <tr key={withdrawal._id}>
              <td>{withdrawal.userId.fullname}</td>
              <td>{withdrawal.classId.title}</td>
              <td>{withdrawal.reason}</td>
              <td>{withdrawal.status}</td>
              <td>{new Date(withdrawal.requestDate).toLocaleString()}</td>
              <td>
                {withdrawal.status === "pending" ? (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleApprove(withdrawal._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleReject(withdrawal._id)}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span>N/A</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestWithdrawal;
