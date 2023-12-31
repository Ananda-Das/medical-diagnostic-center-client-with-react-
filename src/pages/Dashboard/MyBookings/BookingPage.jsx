/* eslint-disable react/prop-types */

const BookingPage = ({ detail }) => {
  const testInfo = detail;

  return (
    <div>
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
            {/* <Link to={`/test/${testInfo._id}`}> */}
            <button className="btn btn-error w-full">Cancle Booking</button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
