import { useState } from "react";

const PaymentGateway = () => {
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const payNow = () => {
    setLoading(true);
    setTimeout(() => {
      alert("Payment Successful!");
      setLoading(false);
    }, 1500);
  };

  return (
    <div 
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5", padding: "24px", fontFamily: "Arial, sans-serif"}}>
      <div 
        style={{ width: "100%", maxWidth: "480px", background: "white", borderRadius: "20px", padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
        <h1 
          style={{ textAlign: "center", fontSize: "26px", marginBottom: "24px" }}>
            Payment Gateway
        </h1>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button 
            style={{ padding: "12px 16px", borderRadius: "12px", border: method === "card" ? "2px solid #007bff" : "1px solid #ccc", background: method === "card" ? "#e9f2ff" : "white", cursor: "pointer", flex: 1, fontWeight: "600", transition: "0.2s" }} 
            onClick={() => setMethod("card")}>
              Card
          </button>
          <button 
            style={{ padding: "12px 16px", borderRadius: "12px", border: method === "ewallet" ? "2px solid #007bff" : "1px solid #ccc", background: method === "ewallet" ? "#e9f2ff" : "white", cursor: "pointer", flex: 1, fontWeight: "600", transition: "0.2s" }} 
            onClick={() => setMethod("ewallet")}>
              E-Wallet
          </button>
          <button style={{ padding: "12px 16px", borderRadius: "12px", border: method === "bank" ? "2px solid #007bff" : "1px solid #ccc", background: method === "bank" ? "#e9f2ff" : "white", cursor: "pointer", flex: 1, fontWeight: "600", transition: "0.2s" }} 
            onClick={() => setMethod("bank")}>
              Bank
          </button>
        </div>

       
        {method === "card" && (
          <div>
            <input 
              style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #ccc", fontSize: "15px", marginBottom: "12px" }} 
              placeholder="Card Number" 
              maxLength={16} 
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <input 
                style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #ccc", fontSize: "15px", marginBottom: "12px", flex: 1 }} placeholder="MM/YY" 
              />
              <input 
                style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #ccc", fontSize: "15px", marginBottom: "12px", flex: 1 }} placeholder="CVV" 
                maxLength={3} 
              />
            </div>
            <input 
              style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #ccc", fontSize: "15px", marginBottom: "12px" }} 
              placeholder="Name on Card" 
            />
          </div>
        )}

        
        {method === "ewallet" && (
          <div>
            <input 
              style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #ccc", fontSize: "15px", marginBottom: "12px" }} 
              placeholder="Phone Number" 
            />
          </div>
        )}

       
        {method === "bank" && (
          <div>
            <input 
              style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #ccc", fontSize: "15px", marginBottom: "12px" }} 
              placeholder="Bank Name" 
            />
            <input 
              style={{ width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #ccc", fontSize: "15px", marginBottom: "12px" }} 
              placeholder="Account Number" 
            />
          </div>
        )}

        <button 
          style={{ width: "100%", padding: "16px", background: "#007bff", color: "white", border: "none", borderRadius: "14px", fontSize: "17px", cursor: "pointer", marginTop: "20px" }} 
          onClick={payNow} 
          disabled={loading}>
            {loading ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default PaymentGateway;
