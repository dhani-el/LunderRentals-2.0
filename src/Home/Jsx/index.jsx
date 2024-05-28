import { useEffect,  useRef,  useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Paragraph, AchivementText, LargeText, CallToAction, Modelo, SplashScreen,BodyContent} from './components';
import { AnimatePresence } from 'framer-motion';
import '../Styles/index.css';


export default function Home(){
    const isLandScape  = useMediaQuery({query: '(orientation:landscape)'});
    const [removeSplash, setRemoveSplash] = useState(false);
    
    useEffect(function(){
        const header = document.getElementById("headerWrapper");
        if(!removeSplash){
            header.style.display = "none"
            return
        }
        header.style.display = "block"
    },[removeSplash]);

    return <div >
            <AnimatePresence>
                {!removeSplash && <SplashScreen displaySplash={removeSplash}  />}
            </AnimatePresence>
            <div id = "bodyDiv">
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
                <BodyContent/>
            </div>
            </div>
}
