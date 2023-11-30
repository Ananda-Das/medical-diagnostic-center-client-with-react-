/* eslint-disable react/prop-types */


const BannerInfo = ({item}) => {
    const {name} = item;
    return (
        <div>
            <h1 className="text-7xl">{name}</h1>
        </div>
    );
};

export default BannerInfo;