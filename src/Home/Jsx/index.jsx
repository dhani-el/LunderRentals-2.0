import { useMediaQuery } from 'react-responsive';
import { Paragraph, AchivementText, LargeText, CallToAction, Modelo, SplashScreen} from './components';
import '../Styles/index.css';
import { useState } from 'react';


export default function Home(){
    const isLandScape  = useMediaQuery({query: '(orientation:landscape)'});
    const [removeSplash, setRemoveSplash] = useState(false);
    return <div id = "bodyDiv">
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
                <SplashScreen displaySplash={!removeSplash} />
            </div>
}

