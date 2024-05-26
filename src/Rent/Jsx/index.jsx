import {useState} from 'react'
import { SearchComponent, Brands,Cars} from "./components";


export default function Rent(){
        const [brand,setBrand] = useState('');
    return <div id='rentContainer'>
                <SearchComponent/>
                <Brands handleBrandChange={setBrand}/>
                <Cars brand= {brand} />
        </div>

}