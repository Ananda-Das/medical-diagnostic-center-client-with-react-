import Banner from "../../components/Home/Banner/Banner";
import OurTest from "../../components/Home/OurTest/OurTest";
import Promotions from "../../components/Home/Promotions";
import Recomendations from "../../components/Home/Recomendations/Recomendations";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OurTest></OurTest>
            <Promotions></Promotions>
            <Recomendations></Recomendations>
        </div>
    );
};

export default Home;