import { useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const TestDetail = () => {
  const testDetials = useLoaderData();

  const axiosSecure = useAxiosSecure();

  const { id } = useParams();

  console.log(id);

  // const { user } = useAuth();

  const singleTestDetails = testDetials.find((testDetials) => testDetials._id === id);

  console.log(singleTestDetails);

  const { imageUrl, price, slot, _id, date } = singleTestDetails;

  const [disprice, Setdisprice] = useState("");
  const [orgiprice, setorgiprice] = useState(price);
  let finalPrice = disprice ? disprice : orgiprice;

  const handleDiscount = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const discount = form.get("discount");
    const { data } = await axiosSecure(`http://localhost:5000/banners/${discount}`);

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
      <div className="w-full">
        <img className="w-[70%] mx-auto" src={imageUrl} alt="" />
      </div>
      <div>
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

          {/* <Link to={`/dashboard/payment/${finalPrice}`} > */}
          <Link to={{ pathname: '/dashboard/payment', state: { finalPrice } }}>
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
