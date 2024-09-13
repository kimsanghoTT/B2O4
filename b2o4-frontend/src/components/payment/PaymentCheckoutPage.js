import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../css/PaymentCheckoutPage.css';
import MyPageContext from "../MyPageContext";

const clientKey = "test_ck_AQ92ymxN34YkyXwdXe2PVajRKXvd";

const generateRandomString = () => window.btoa(Math.random().toString()).slice(0, 20);
const customerKey = generateRandomString();

export function PaymentCheckoutPage() {
  const [payment, setPayment] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isRequesting, setIsRequesting] = useState(false);  
  const navigate = useNavigate();
  const location = useLocation();

  const { loginMember } = useContext(MyPageContext);
  console.log("loginMember : ", loginMember);
  const { stadium, personCount, reservationDate, reservationTime, totalPrice } = location.state;

  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const payment = tossPayments.payment({
          customerKey,
        });
        setPayment(payment);
      } catch (error) {
        console.error("결제 정보를 불러오는 중 오류가 발생했습니다:", error);
      }
    }

    fetchPayment();
  }, []);

  const requestPayment = async () => {
    if (isRequesting) return;

    setIsRequesting(true);  

    try {
      const orderId = generateRandomString();
      const response = await payment.requestPayment({
        method: selectedPaymentMethod,
        amount: {
          currency: "KRW",
          value: totalPrice,
        },
        orderId,
        orderName: `${stadium.stadiumName} 예약 (${reservationDate}, ${reservationTime} 시간대, ${personCount}명)`,
        successUrl: window.location.origin + "/payment/success",
        failUrl: window.location.origin + "/payment/fail",
        customerEmail: loginMember.memberEmail,
        customerName: loginMember.memberName,
        customerMobilePhone: loginMember.memberPhone,
      });

      // Ensure `response.paymentKey` is correctly retrieved
      const paymentKey = response.paymentKey || response.data?.paymentKey;

      if (!orderId || !paymentKey || !totalPrice) {
        console.error("Failed to retrieve essential payment information: ", { orderId, paymentKey, totalPrice });
      } else {
        const paymentInfo = {
          orderId,
          paymentKey,
          totalPrice,
          stadium,
          reservationDate,
          reservationTime,
          personCount
        };
        console.log("Storing paymentInfo in sessionStorage: ", paymentInfo);
        sessionStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
      }

      console.log(response);
      
    } catch (error) {
      console.error("결제 요청 중 오류가 발생했습니다:", error);
    } finally {
      setIsRequesting(false);  
    }
  };

  const selectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <div className="wrapper-payment">
      <div className="box_section">
        <h1>일반 결제</h1>
        <div id="payment-method">
          {["CARD", "TRANSFER", "VIRTUAL_ACCOUNT", "MOBILE_PHONE", "CULTURE_GIFT_CERTIFICATE", "FOREIGN_EASY_PAY"].map((method) => (
            <button
              key={method}
              id={method}
              className={`button2 ${selectedPaymentMethod === method ? "active" : ""}`}
              onClick={() => selectPaymentMethod(method)}
              disabled={isRequesting}  
            >
              {method}
            </button>
          ))}
        </div>
        <button className="button" onClick={requestPayment} disabled={isRequesting}>
          결제하기
        </button>
      </div>
    </div>
  );
}

export default PaymentCheckoutPage;
