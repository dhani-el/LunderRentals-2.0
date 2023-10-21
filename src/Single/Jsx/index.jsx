import { useSearchParams,useParams } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { CarImage,CarDescription, CarPrice } from "./components";
// import { useAppSelector } from "../../Store/store";

const location ={
    address:"5,Mufutau Shobola, Ogba Lagos,Nigeria",
    meters:'50'
}

const features = [
    {
        Icon:Search,
        featureValue:'auto contact ',
        optFeature:null
    },
    {
        Icon:Search,
        featureValue:'auto contact',
        optFeature:null
    },
    {
        Icon:Search,
        featureValue:'auto contact ',
        optFeature:null
    },
    {
        Icon:Search,
        featureValue:'auto contact ',
        optFeature:null
    },
]

export default function SingleCar(){
    const [searchParams, setSearchParams] = useSearchParams();
    const model = searchParams.get('model');
    const {brand}  = useParams();
    const Selector = useAppSelector(function(state){ return state.CarData.Cars[brand]});
    const data  = Selector.data;
    const logo =  Selector.logo;
    const info  = data.filter((adata)=> adata.model == model )[0]
    
    return <div id="singleCarContainer">
            <CarImage image={info.image} logo={logo} title={info.model} year={info.year}/>
            <CarDescription  carFeatures={features} location={location}/>
            <CarPrice price="N120k"/>
    </div>
}