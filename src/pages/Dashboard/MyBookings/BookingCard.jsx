/* eslint-disable react/prop-types */

import { useState } from "react";
import BookingPage from "./BookingPage";

const BookingCard = ({ card }) => {
  // const {email, testdetails} = card;
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(card);
  
  return (
    <div>
      {/* {email} */}
      {/* {testdetails[0].name} */}
        
      <div className="">
        {data.testDetails.map((detail) => (
          <BookingPage key={detail._id} detail={detail}></BookingPage>
        ))}
      </div>
    </div>
  );
};

export default BookingCard;
