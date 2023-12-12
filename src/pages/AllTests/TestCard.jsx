/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TestCard = ({ test }) => {
  const testInfo = test;

  return (
    <div>
      <motion.div className="container" whileHover={{ scale: 1.1, rotate: 0 }} >
        <div className="card bg-base-100 shadow-xl">
          <figure className="max-h-52">
            <img src={testInfo.imageUrl} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{testInfo.name}</h2>
            <div className="flex justify-between items-center">
              <div>Available Date: {testInfo.date}</div>
              <div>Available Slot: {testInfo.slot}</div>
            </div>
            <div className="card-actions">
              <Link to={`/test/${testInfo._id}`}>
                <button className="btn btn-primary w-full">View Details</button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TestCard;
