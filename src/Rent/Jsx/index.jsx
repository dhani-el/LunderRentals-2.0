import {useState,useEffect} from 'react'
import { SearchComponent, Brands,Cars} from "./components";
import { useQueryClient } from '@tanstack/react-query';


export default function Rent(){
        const [brand,setBrand] = useState('');
        const queryClient  =  useQueryClient();
console.log("render or rerender");
        useEffect(function(){
                console.log(`the current brand is :${brand}`);
        });

        // useEffect(function(){
        //         console.log("inside useEffect invalidator");
        //         // queryClient.removeQueries();
        //         // queryClient.refetchQueries();

        // }),[brand];

    return <div id='rentContainer'>
                <SearchComponent/>
                <Brands handleBrandChange={setBrand}/>
                <Cars brand= {brand} />
        </div>

}