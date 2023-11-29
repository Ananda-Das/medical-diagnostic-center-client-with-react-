import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import BookingCard from "./BookingCard";

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // const [displayTest, setDisplayTest] = useState([]);

  const [myTest, setMyTest] = useState([]);

  // const url = `/my/booked/test/?email=${user?.email}`;

  //   useEffect(() => {
  //     axiosSecure.get(url).then((res) => {
  //       setDisplayTest(res.data);
  //     });
  //   }, [url, axiosSecure]);

  //   console.log(displayTest);

  //   const {data: seletedTestInfo=[], refetch, isLoading} = useQuery({
  //     queryKey: ['testinformation'],
  //     queryFn: async()=>{
  //         const res = await axiosSecure.get(`/my/booked/test/details`);
  //         const filteredData = res?.data?.filter(test => test.email === user?.email);
  //         return(filteredData);
  //     }
  //   })
  //   console.log(seletedTestInfo);
  //   console.log(seletedTestInfo);
  //   console.log(myTest);

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

  //   const bookedUser = seletedTestInfo.filter(user=> seletedTestInfo.email === user.email);
  //   console.log(bookedUser);

  return (
    <div>
      <h1>MY Booked Tests: {myTest && myTest?.length}</h1>
      <div className="grid grid-cols-2 gap-5 justify-center items-center">{myTest && myTest?.map((card) => <BookingCard key={card._id} card={card}></BookingCard>)}</div>
    </div>
  );
};

export default MyBookings;
