import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MyTestPage from "./MyTestPage";

const MyTestResult = () => {
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
      <h1 className="text-5xl font-bold text-center mb-7">My Tests Results</h1>
      <div className="">
        {myTest && myTest?.map((card) => <MyTestPage key={card._id} card={card}></MyTestPage>)}
      </div>
    </div>
  );
};

export default MyTestResult;
