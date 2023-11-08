import { useMediaQuery } from 'react-responsive';
import { Paragraph, AchivementText, LargeText, CallToAction, Modelo, SplashScreen} from './components';
import '../Styles/index.css';
import { useEffect,  useState } from 'react';


export default function Home(){
    const isLandScape  = useMediaQuery({query: '(orientation:landscape)'});
    const [removeSplash, setRemoveSplash] = useState(false);

    useEffect(function(){
        console.log("stageOne");
    },[]);

    return <div id = "bodyDiv">
                  <ProgressBar/>
                <div id='abslouteContentContainer'>
                    <div id='top'>
                    {isLandScape && <AchivementText/>}
                        <LargeText/>
                        {!isLandScape && <AchivementText/>}
                        <Paragraph/>
                    </div>
                    <CallToAction/>
                </div>
                <Modelo setModelReady={setRemoveSplash}/>
                <SplashScreen displaySplash={!removeSplash}  />
      
            </div>
}

function ProgressBar(){
    const [progressValue, setProgressBar] = useState(0);

    useEffect(function(){
        let  timeoutId
        if (progressValue >= 90) {
            return
        }
        timeoutId = setTimeout(() => {
            setProgressBar(initial => initial + 10)
            console.log(progressValue);
        }, 2000);


        return ()=>{
            clearTimeout(timeoutId);
        }
    })
    return <div style={{zIndex:50, color:"white", position:"absolute"}} >
        <p>{progressValue}/100</p>
    </div>
}