import {useState,useEffect} from 'react'
import { SearchComponent, Brands,Cars} from "./components";
import { useQueryClient } from '@tanstack/react-query';


export default function Rent(){
        const [brand,setBrand] = useState('');
        const queryClient  =  useQueryClient();
        useEffect(function(){
                console.log(`the current brand is :${brand}`);
        });


    return <div id='rentContainer'>
                <SearchComponent/>
                <Brands handleBrandChange={setBrand}/>
                <Cars brand= {brand} />
        </div>

}