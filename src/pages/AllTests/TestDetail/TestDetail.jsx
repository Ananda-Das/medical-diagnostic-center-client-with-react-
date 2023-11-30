import { useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const TestDetail = () => {
  const testDetials = useLoaderData();

  const axiosSecure = useAxiosSecure();

  const { id } = useParams();

  // console.log(id);

  // const { user } = useAuth();

  const singleTestDetails = testDetials.find((testDetials) => testDetials._id === id);

  // console.log(singleTestDetails);

  const { imageUrl, name, price, details, slot, _id, date } = singleTestDetails;

  const [disprice, Setdisprice] = useState("");
  const [orgiprice, setorgiprice] = useState(price);
  let finalPrice = disprice ? disprice : orgiprice;

  const handleDiscount = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const discount = form.get("discount");
    const { data } = await axiosSecure(`https://diagnostic-center-management-server-smoky.vercel.app/banners/${discount}`);

    // console.log(data.discount);

    if (discount != data.couponCodeName) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `Coupon Code is not match`,
        showConfirmButton: false,
        timer: 1500,
      });
    }

    const discoupon = parseFloat(data.couponRate);

    const discountPrice = (price * discoupon) / 100;
    const newPrice = price - discountPrice;

    Setdisprice(newPrice);
    setorgiprice(price);
  };

  const {user} = useAuth()
  console.log(user);

  const handleBooking = ()=>{
    //send in the server
    const bookingInfo ={
      testId: _id,
      user: user.email,
      price: finalPrice,
      date: date,
      bookingStatus: false,
      report: 'pending'
  }

  axiosSecure.post("/add/booking", bookingInfo).then((res) => {
      if (res.data.insertedId) {
        // Swal.fire({
        //   position: "top-end",
        //   icon: "success",
        //   title: "User created successfully.",
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
        // navigate("/");
        console.log("success");
      }
    });
  }

  return (
    <div>
      <h1 className="text-4xl font-bold ml-10 py-7">{name} Details</h1>
      <div className="w-[30%] h-[30%] mx-auto">
        <img className="w-full mx-auto" src={imageUrl} alt="" />
      </div>
      <div className="flex justify-center items-center gap-7 py-7">
        <div>
          <p>Avaiable Date: <span className="text-red-500 font-bold">{date}</span></p>
        </div>
        <div>
        <p>Avaiable Slot: <span>{slot}</span></p>
        </div>
      </div>

      <div className="w-4/5 mx-auto">
        <p className="text-lg">{details}</p>
      </div>

      <div className="w-4/5 mx-auto flex justify-end mb-10">
        {slot > 0 ? (
          <button
            onClick={() => {
              document.getElementById("my_modal_2").showModal();
            }}
            className="btn btn-info"
          >
            Book Now
          </button>
        ) : (
          <p>No Slot Available</p>
        )}
      </div>

      {/* modal start */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Payment</h3>

          {/* user Info table start */}
          <p>Test Price: {orgiprice}</p>
          <p>Have any Coupon?</p>
          <form onSubmit={handleDiscount}>
            <input type="text" name="discount" placeholder="Type here" className="input input-bordered input-accent w-full max-w-xs" />{" "}
            <button className="btn btn-info">Apply</button>
          </form>

          <p>New Price: {finalPrice}</p>

          {/* <Link to={`/dashboard/payment/?price=${finalPrice}`} > */}
          <Link to={`/dashboard/payment/?tid=${_id}`} >
          {/* <Link to={`/dashboard/payment/?tid=${_id}/?price=${finalPrice}`} > */}
          {/* <Link to={{ pathname: '/dashboard/payment', state: { finalPrice } }}> */}
            <button onClick={handleBooking} className="btn btn-primary">Pay Now</button>
          </Link>

          {/* user Info table end */}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {/* modal end */}
    </div>
  );
};

export default TestDetail;
