import {useState,useEffect} from 'react'
import { SearchComponent, Brands,Cars} from "./components";
// import { useAppSelector } from "../../Store/store";


export default function Rent(){
        const [brand,setBrand] = useState('All');
        const Brandss = useAppSelector(state => state.CarData.Brands);
        const Carss = useAppSelector(state => state.CarData.Cars);
        useEffect(function(){
                console.log(`the current brand is :${brand}`);
                
        })
    return <div id='rentContainer'>
                <SearchComponent/>
                <Brands brands={Brandss} handleBrandChange={setBrand}/>
                <Cars ListOfCars={Carss[brand].data} brand= {Carss[brand].brand} />
        </div>

}