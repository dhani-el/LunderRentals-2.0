import { useMediaQuery } from 'react-responsive';
import { Paragraph, AchivementText, LargeText, CallToAction, Modelo} from './components';
import '../Styles/index.css';


export default function Home(){
    const isLandScape  = useMediaQuery({query: '(orientation:landscape)'});
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
                    <Modelo/>
                </div>
}
