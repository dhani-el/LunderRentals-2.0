import {useState,useEffect} from 'react'
import { SearchComponent, Brands,Cars} from "./components";


export default function Rent(){
        const [brand,setBrand] = useState('');

        useEffect(function(){
                console.log(`the current brand is :${brand}`);
        });

    return <div id='rentContainer'>
                <SearchComponent/>
                <Brands handleBrandChange={setBrand}/>
                <Cars brand= {brand} />
        </div>

}