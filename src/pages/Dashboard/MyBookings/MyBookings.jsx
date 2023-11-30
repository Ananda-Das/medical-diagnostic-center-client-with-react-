import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import BookingCard from "./BookingCard";

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [myTest, setMyTest] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosSecure.get(`/my/booked/test/details`);
      //   console.log(res.data);
      const filteredData = res?.data?.filter((test) => test.email === user?.email);
      setMyTest(filteredData);
    };
    fetchData();
  }, [axiosSecure, user?.email]);

  console.log(myTest);

  return (
    <div>
      <h1 className="text-5xl font-bold text-center mb-7">MY Booked Tests: {myTest && myTest?.length}</h1>
      <div className="grid grid-cols-2 gap-5 justify-center items-center">
        {myTest && myTest?.map((card) => <BookingCard key={card._id} card={card}></BookingCard>)}
      </div>
    </div>
  );
};

export default MyBookings;
