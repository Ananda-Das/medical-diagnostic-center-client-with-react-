/* eslint-disable react/prop-types */


const BannerInfo = ({item}) => {
    const { title, image, description, couponCodeName, couponRate} = item;
    return (
        <div className="flex justify-center items-center gap-16 bg-[#004552] h-screen p-40">
            <div className="text-white space-y-3">
                <h1 className="text-7xl">{title}</h1>
                <p className="text-lg">{description}</p>
                <p className="text-3xl"> Use <span className="font-bold">{couponCodeName}</span> Code to <br /> get <span className="text-red-600 font-bold">{couponRate}%</span> Discount</p>

                <button className="btn btn-primary">All Test</button>

            </div>
            <div>
                <img className="w-[150%]" src={image} alt="Banner Image" />
            </div>
        </div>
    );
};

export default BannerInfo;