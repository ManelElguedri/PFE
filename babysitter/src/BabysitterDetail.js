import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BabysitterDetail.css";
import PaymentModal from "./PaymentModal";

function BabysitterDetail() {
  const { name } = useParams();
  const navigate = useNavigate();

  const babysitters = [
    {
      name: "Aisha",
      location: "Sfax",
      image:
        "/babysitter00.jpg",
      reviews: 5,
      bio: "Aisha is an experienced and energetic babysitter. She brings a lot of joy to families and loves playing games with children.",
      comments: [
        {
          author: "John",
          comment: "Aisha is great with my kids! Highly recommend.",
        },
        { author: "Emily", comment: "Very friendly and reliable." },
      ],
    },
    {
      name: "Fatima",
      location: "Tunis",
      image: "/babysitter00.jpg",
      reviews: 3,
      bio: "Fatima is calm and patient. She focuses on making children feel at ease and is great at understanding their needs.",
      comments: [
        {
          author: "Sarah",
          comment: "Fatima is very understanding and patient with my son.",
        },
        {
          author: "Ali",
          comment: "She’s always on time and does a fantastic job!",
        },
      ],
    },
    {
      name: "Selma",
      location: "Sousse",
      image: "/babysitter01.jpg",
      reviews: 4,
      bio: "Selma is a creative babysitter who enjoys doing arts and crafts with children. She is also very responsible and reliable.",
      comments: [
        {
    author: "Fatima",
    comment: "Selma is an amazing babysitter! She is very caring and my kids love spending time with her. Highly recommended!",
  },
  {
    author: "Omar",
    comment: "Very professional and always punctual. I feel safe leaving my children with Selma, she knows exactly how to handle them.",
  },
  {
    author: "Leila",
    comment: "She is super patient and friendly. My daughter is usually shy with babysitters, but she got along with Selma instantly!",
  },
  {
    author: "Karim",
    comment: "Selma has been babysitting for us for months now, and she has never disappointed us. She always brings fun activities for the kids!",
  },
  ]},
  {
    name: "Sara",
    location: "Sfax",
    image: "/babysitter02.jpg",
    reviews: 5,
    bio: "Sara is a fun and caring babysitter. She has a lot of experience with children and knows how to keep them entertained.",
    comments: [
      {
    author: "Amal",
    comment: "Sara is the best babysitter we have ever had! She is kind, patient, and full of energy. My kids always look forward to her visits.",
  },
  {
    author: "Youssef",
    comment: "Punctual and responsible. She always comes prepared with new games and activities for the kids. Highly professional and caring.",
  },
  {
    author: "Nadia",
    comment: "Sara treats my children as if they were her own. She is very understanding and knows exactly how to comfort them when they feel sad.",
  },
  {
    author: "Hassan",
    comment: "She is truly amazing with kids. My son used to be very shy, but with Sara, he opened up and became more social. I can't recommend her enough!",
  },
  {
    author: "Layla",
    comment: "She goes above and beyond! Not only does she take great care of my kids, but she also helps with their homework and teaches them valuable lessons.",
  },]},
  {
    name: "Nour",
    location: "Tunis",
    image: "/babysitter03.jpg",
    reviews: 6,
    bio: "Nour is a responsible and caring babysitter. She is very patient and always makes sure that children are safe and happy.",
    comments: [
      {
    author: "Mariam",
    comment: "Nour is an absolute gem! She is so caring and attentive. My kids feel safe and happy with her, and that's priceless for a parent.",
  },
  {
    author: "Adel",
    comment: "She is incredibly patient and knows exactly how to handle even the most energetic children. My twins love spending time with her!",
  },
  {
    author: "Salma",
    comment: "Very professional and trustworthy. I have left my 3-year-old with Nour multiple times, and I have never had a single worry.",
  },
  {
    author: "Rami",
    comment: "Nour is fantastic! She is creative and always finds new activities to keep my children entertained. I highly recommend her.",
  },
  {
    author: "Hiba",
    comment: "I was hesitant about hiring a babysitter, but Nour completely changed my mind. She is kind, responsible, and truly loves children.",
  },
  {
    author: "Karim",
    comment: "She even helps with bedtime routines and tells the best bedtime stories! My daughter now asks for Nour every night before sleeping.",
  },]},
  {
    name: "Mona",
    location: "Gabes",
    image: "/babysitter04.jpg",
    reviews: 7,
    bio: "Mona is a cheerful and friendly babysitter. She is very creative and loves organizing fun activities for children.",
    comments: [
      {
    author: "Fatma",
    comment: "Mona is simply amazing! She is patient, kind, and knows exactly how to make kids feel comfortable. My son adores her!",
  },
  {
    author: "Omar",
    comment: "Very responsible and punctual. Mona has a natural gift when it comes to dealing with children. I highly recommend her!",
  },
  {
    author: "Leila",
    comment: "She helped my daughter with her homework while making it fun! I couldn’t have asked for a better babysitter.",
  },
  {
    author: "Hassan",
    comment: "Mona has been babysitting my kids for over a year, and she’s like family now. She is trustworthy and incredibly caring.",
  },
  {
    author: "Amina",
    comment: "I was worried about leaving my toddler with a babysitter, but Mona made me feel at ease. She is so loving and careful!",
  },
  {
    author: "Sami",
    comment: "Mona always comes up with creative games and activities that keep my kids engaged and happy. She’s the best babysitter we’ve had!",
  },
  {
    author: "Yasmine",
    comment: "She goes beyond just babysitting – she teaches good manners and even basic skills to my kids. Truly exceptional!",
  },]},
  {
    name: "Lina",
    location: "Kairouan",
    image: "/babysitter05.jpg",
    reviews: 9,
    bio: "Lina is a dedicated and caring babysitter. She is very patient and always ensures that children are safe and well taken care of.",
    comments: [
      {
    author: "Sami",
    comment: "Lina is the most caring babysitter we’ve ever had! She treats my kids as if they were her own, and they absolutely love her.",
  },
  {
    author: "Nadia",
    comment: "She is so professional and responsible. Lina always arrives on time and makes sure my kids have fun while staying safe.",
  },
  {
    author: "Karim",
    comment: "I was hesitant about hiring a babysitter, but Lina made me feel at ease from day one. She has a natural gift with children!",
  },
  {
    author: "Layla",
    comment: "She’s like a big sister to my kids! Not only does she play with them, but she also teaches them new things every day.",
  },
  {
    author: "Hassan",
    comment: "Lina is incredibly patient, even with my hyperactive twin boys. I don’t know how she does it, but she’s a miracle worker!",
  },
  {
    author: "Maya",
    comment: "I can finally enjoy my nights out knowing that my children are in the best hands. Lina is simply amazing!",
  },
  {
    author: "Ali",
    comment: "She doesn't just babysit – she educates. My daughter learned new words and improved her reading skills thanks to Lina!",
  },
  {
    author: "Amira",
    comment: "Lina always comes up with creative and fun activities. My kids never get bored when she’s around!",
  },
  {
    author: "Omar",
    comment: "Trustworthy, kind, and very experienced. Lina is the only babysitter I trust with my newborn. She is a lifesaver!",
  },]},
  {
    name: "Ranim",
    location: "Tunis",
    image: "/babysitter06.jpg",
    reviews: 10,
    bio: "Ranim is a warm and caring babysitter. She is very attentive and always ensures that children are happy and comfortable.",
    comments: [
      {
    author: "Fatma",
    comment: "Mona is simply amazing! She is patient, kind, and knows exactly how to make kids feel comfortable. My son adores her!",
  },
  {
    author: "Omar",
    comment: "Very responsible and punctual. Mona has a natural gift when it comes to dealing with children. I highly recommend her!",
  },
  {
    author: "Leila",
    comment: "She helped my daughter with her homework while making it fun! I couldn’t have asked for a better babysitter.",
  },
  {
    author: "Hassan",
    comment: "Mona has been babysitting my kids for over a year, and she’s like family now. She is trustworthy and incredibly caring.",
  },
  {
    author: "Amina",
    comment: "I was worried about leaving my toddler with a babysitter, but Mona made me feel at ease. She is so loving and careful!",
  },
  {
    author: "Sami",
    comment: "Mona always comes up with creative games and activities that keep my kids engaged and happy. She’s the best babysitter we’ve had!",
  },
  {
    author: "Yasmine",
    comment: "She goes beyond just babysitting – she teaches good manners and even basic skills to my kids. Truly exceptional!",
  },]},
  {
    name: "Rania",
    location: "Sousse",
    image: "/babysitter07.jpg",
    reviews: 2,
    bio: "Rania is a patient and caring babysitter. She is very attentive and always ensures that children are safe and well looked after.",
    comments: [
      {
    author: "Selim",
    comment: "Rania is incredibly kind and responsible. She always makes sure my kids are happy and safe, and they absolutely love spending time with her!",
  },
  {
    author: "Aisha",
    comment: "I was nervous about leaving my baby with a babysitter, but Rania made me feel so comfortable. She is gentle, caring, and truly amazing with kids!",
  },]},
  {
    name: "Noura",
    location: "Sfax",
    image: "/babysitter0.jpg",
    reviews: 4,
    bio: "Noura is a friendly and reliable babysitter. She is very creative and loves playing games with children.",
    comments: [
      {
    author: "Fatima",
    comment: "Noura is an exceptional babysitter! She is kind, patient, and always comes up with fun activities to keep my kids engaged.",
  },
  {
    author: "Omar",
    comment: "She is very responsible and trustworthy. I feel completely at ease leaving my children with Noura, knowing they are in safe hands.",
  },
  {
    author: "Layla",
    comment: "Noura has a special way of making kids feel comfortable. My son, who is usually very shy, warmed up to her instantly!",
  },
  {
    author: "Hassan",
    comment: "She goes above and beyond! Not only does she take great care of my kids, but she also helps with their schoolwork and daily routines.",
  },]}
  ];

  const [newComment, setNewComment] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [showModal, setShowModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: "You", text: newMessage }]);
      setNewMessage(""); // Mesaj gönderildikten sonra input temizlenir.
    }
  };

  const handlePaymentDetailsChange = (event) => {
    const { name, value } = event.target;
    setPaymentDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitPayment = () => {
    alert("Payment details submitted!");
    setShowModal(false); // Modal'ı kapat
  };

  const babysitter = babysitters.find((b) => b.name === name);

  if (!babysitter) {
    return <div>Babysitter not found</div>;
  }

  return (
    <div className="babysitter-detail-container">
      <div className="babysitter-detail-header">
        <button className="back-button" onClick={() => navigate("/")}>
          Back
        </button>
        <h1>{babysitter.name}</h1>
        <p className="babysitter-location">{babysitter.location}</p>
        <p className="babysitter-reviews">{babysitter.reviews} Reviews</p>
      </div>
      <div className="babysitter-detail-body">
        <div className="babysitter-image-container">
          <img
            src={babysitter.image}
            alt={babysitter.name}
            className="babysitter-image"
          />
        </div>
        <div className="babysitter-bio">
          <h3>About</h3>
          <p>{babysitter.bio}</p>
        </div>

        {/* Yorumlar Bölümü */}
        <div className="comments-section">
          <h3>Comments</h3>
          <div className="comments-list">
            {babysitter.comments.map((comment, index) => (
              <div key={index} className="comment">
                <strong>{comment.author}:</strong> {comment.comment}
              </div>
            ))}
          </div>
        </div>

        {/* Mesajlaşma Kısmı */}
        <div className="message-section">
          <h3>Messages</h3>
          <div className="message-container">
            {messages.map((message, index) => (
              <div key={index} className="message">
                <strong>{message.sender}:</strong> {message.text}
              </div>
            ))}
          </div>
          <textarea
            value={newMessage}
            onChange={handleMessageChange}
            placeholder="Type your message here..."
          />
          <button onClick={handleSendMessage}>Send Message</button>
        </div>

        {/* Ödeme Yöntemi */}
        <div className="payment-section">
          <h3>Choose Payment Method</h3>
          <select value={paymentMethod} onChange={handlePaymentMethodChange}>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bankTransfer">Bank Transfer</option>
          </select>
          <button onClick={() => setShowModal(true)}>Proceed to Payment</button>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <button
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                X
              </button>
              <h3>Enter Payment Details</h3>
              <form onSubmit={handleSubmitPayment}>
                <button
                  onClick={() => setShowModal(true)}
                  className="pay-button"
                >
                  Proceed to Payment
                </button>

                {/* Ödeme Modalı */}
                <PaymentModal
                  isOpen={showModal}
                  onClose={() => setShowModal(false)}
                />
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date:</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={paymentDetails.expiryDate}
                    onChange={handlePaymentDetailsChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV:</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={paymentDetails.cvv}
                    onChange={handlePaymentDetailsChange}
                    required
                  />
                </div>
                <button type="submit">Submit Payment</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BabysitterDetail;
