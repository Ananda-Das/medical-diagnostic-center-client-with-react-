import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import BannerInfo from "./BannerInfo";

const Banner = () => {
  const axiosPublic = useAxiosPublic();

 

  const [activeBanner, setActiveBanner] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosPublic.get(`/banners`);
      const filteredData = res?.data?.filter((banner) => banner.isActive === true);
      setActiveBanner(filteredData);
    };
    fetchData();
  }, [axiosPublic]);

  console.log(activeBanner.name);

  

  return (
    <div className="flex justify-center items-center gap-3 bg-[#004552] h-screen">
      

      <div>
        {
          activeBanner.map(item=> <BannerInfo key={item._id} item={item}></BannerInfo>)
        }
      </div>
    </div>
  );
};

export default Banner;
