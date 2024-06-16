import {useState} from 'react'
import { SearchComponent, Brands,Cars} from "./components";


export default function Rent(){
        const [brand,setBrand] = useState('');
    return <div id='rentContainer' style={{padding:"0rem 1rem",display:"flex",flexDirection:"column",justifyContent:"center",gap:"1rem"}}>
                <SearchComponent/>
                <Brands handleBrandChange={setBrand}/>
                <Cars brand= {brand} />
        </div>

}