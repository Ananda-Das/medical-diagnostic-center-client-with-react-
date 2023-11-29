import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const Banner = () => {

  const axiosPublic= useAxiosPublic();

  const { data: banners = [] } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/banners");
      return res.data;
    },
  });

  console.log(banners);

  const activeBanner = banners.find((banner) => banner.isActive === true);

  console.log(activeBanner);

  return (
    <div className="flex justify-center items-center gap-3 bg-[#004552] h-screen">
      <div>
        <h1 className="text-7xl">Title</h1>
        <p className="text-3xl">Text</p>
        <button className="btn btn-primary">All Test</button>
      </div>
      <div className="max-h-screen">
        <img className="w-[60%]" src="https://mida.peerduck.com/wp-content/uploads/2023/03/k4lmtg-1024x1000.png" alt="" />
      </div>
    </div>
  );
};

export default Banner;
