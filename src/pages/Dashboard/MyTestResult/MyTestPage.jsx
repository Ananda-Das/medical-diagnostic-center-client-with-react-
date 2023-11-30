/* eslint-disable react/prop-types */
import { useState } from "react";


const MyTestPage = ({card}) => {

    // eslint-disable-next-line no-unused-vars
    const [data, setData] = useState(card);

    console.log(data);
    return (
        <div>
            
            <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Test Name</th>
              <th>Payment</th>
              <th>Transaction Id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.testDetails.map((test) => (
              <tr key={test._id}>
                <td className="font-bold">{test?.name}</td>
                <td>{data.price}</td>
                <td>{data.transactionId}</td>
                <td>
                  <button  className="btn btn-ghost btn-sm"> {data.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
            
        </div>
    );
};

export default MyTestPage;