import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import TestCard from "./TestCard";
import { useState } from "react";

const Alltests = () => {
  const axiosPublic = useAxiosPublic();

  const [test, setTest] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [filteredTests, setFilteredTests] = useState([]);

  const filterFutureTests = (tests) => {
    const currentDate = new Date();
    return tests.filter((test) => new Date(test.date) >= currentDate);
  };

  // eslint-disable-next-line no-unused-vars
  const { data } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tests");
      console.log(res.data);
      const allTest = res.data;
      const futureTest = filterFutureTests(allTest);
      setTest(futureTest);
      setFilteredTests(futureTest);
    },
  });

  const filterTestsByDate = () => {
    const filtered = test.filter((test) => test.date.includes(dateFilter));
    setFilteredTests(filtered);
  };

  return (
    <div>
      <label>
        Filter by Date:
        <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
      </label>
      <button onClick={filterTestsByDate}>Apply Filter</button>

      {filteredTests.length === 0 ? (
        <p>No tests available for the selected date.</p>
      ) : (
        <>
          <div className="grid grid-cols-3 justify-center items-center gap-3">
            {filteredTests.map((test) => (
              <TestCard key={test._id} test={test}></TestCard>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Alltests;
