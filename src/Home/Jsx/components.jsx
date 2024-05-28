import { useEffect, useLayoutEffect, useRef,useState} from 'react';
import { flushSync } from 'react-dom';
import { Button } from "@mui/material";
import Swipe from "@mui/icons-material/Swipe";
import { Canvas, useLoader,useFrame} from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshReflectorMaterial, PerspectiveCamera } from '@react-three/drei';
import {LinearEncoding, RepeatWrapping, TextureLoader} from 'three';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { motion,usePresence  } from 'framer-motion';
import splashImage from "/one.png";
import RoughTexture from "/texture/rough.jpg";
import NormalTexture from "/texture/normal.jpg";
import OneImage from "/images/1.0.jpeg"
import TwoImage from "/images/2.0.jpeg"
import FourImage from "/images/9.0.jpeg"


export function AchivementText(){
    return <div id='acheivementDivContainer'>
            <span className='singleAchivement'>
                <p className='number'>100+</p>
                <p> TYPES OF CARS</p>
            </span>
            <span className='singleAchivement'>
                <p className='number'>7K+</p>
                <p>CLIENTS SERVED</p>
            </span>
    </div>
}

export function LargeText(){
    return <div id = "LargeTextDiv">
        <p>RENT PERFORMANCE CARS</p>
    </div>
}

export function Paragraph(){
    return <div id = "paragraph" >
        <p>
            WE DESIRE OUR CUSTOMERS TO HAVE A HASSEL FREE EXPERIENCE HENCE WE MAKE IT EASY TO RENT A CAR BY BY PROVIDING A VARIETY OF CARS, VERIFIED CAR OWNERS AND CAR RENTAL DELIVERY AND PICKUP 
        </p>
    </div>
}

export function CallToAction(){
    const navigate = useNavigate()
    return <div id='callToActionDiv' >
            <Button variant='contained' onClick={()=> navigate("/rent")}  ><p>RENT NOW</p></Button>
        </div>
}

export function Modelo({setModelReady}){
    const spinIndicatorRef = useRef(null);

    function removeSpinIndicator(){
        if(spinIndicatorRef.current !== null ){
            spinIndicatorRef.current.style.display = "none"
            return
        }
    }

    return <div id='model'onTouchMove={removeSpinIndicator} onMouseDown={removeSpinIndicator} >
        <Canvas shadows >
            <ambientLight intensity = {1} color={"white"} />
            <directionalLight intensity={1}  position={[0,5,0]} />
            <spotLight color={"white"} angle={0.15} distance={8} intensity={40} penumbra={10} position={[0,3,0]} />
            <HomeCarModel setModelReady={setModelReady}  />
            <Ground/>
        </Canvas>
        <div id='spinIndicator' ref={spinIndicatorRef} >
                <Swipe/>
           </div>
    </div>
}

export function HomeCarModel({setModelReady}){
    const isLandScape  = useMediaQuery({query: '(orientation:landscape)'});
    const scale  = isLandScape ? ([0.005,0.005,0.005]) : ([0.0020,0.0020,0.0020]);
    const modelPosition  = isLandScape ? ([0,0.68,0.5]) : ([0,0.68,1.4]);
    const rotationSpeed  = isLandScape ? 4 : 2;
    const cameraPosition = isLandScape ? [0,1,6] : [0,0.7,6]
    const Scene = useLoader(GLTFLoader,'/lambo.glb');
    const meshRef  = useRef(null);

    useLayoutEffect(function(){
        console.log("inside layout effect #1");
        setModelReady(true);
    },[]);

    useFrame(function({clock}){
        meshRef.current.rotation.y = clock.getElapsedTime() / rotationSpeed;
    })

    return <>
                <PerspectiveCamera makeDefault fov={50} zoom={isLandScape ? 1 : 2} position={cameraPosition} lookAt={modelPosition}/>
                <color args={[0,0,0]} attach= 'background' />
                <mesh receiveShadow = {true} castShadow={true} ref={meshRef} > 
                    <primitive castShadow object={Scene.scene}  scale = {scale} position = {modelPosition}  receiveShadow = {true}  />
                </mesh>
            </>
}

export function Ground(){
    const [normal, roughness] = useLoader(TextureLoader, [RoughTexture,NormalTexture]);

    useEffect(function(){
        [normal,roughness].forEach(function(map){
            map.wrapS = RepeatWrapping;
            map.wrapT = RepeatWrapping;
            map.repeat.set(5,5);
        });
        normal.encoding = LinearEncoding;
    }, [normal,roughness]);

    return <mesh rotation-x = {-Math.PI * 0.5} castShadow receiveShadow >
                <planeGeometry args={[15,15]} />
                <MeshReflectorMaterial 
                envMapIntensity={0}
                normalMap={normal}
                normalScale = {[0.15,0.15]}
                roughnessMap={roughness}
                dithering = {true}
                color={[0.015,0.015,0.015]}
                roughness={1.2}
                blur={[1000,400]}
                mixBlur={30}
                mixStrength={80}
                mixContrast={1}
                resolution={1024}
                mirror={0}
                depthScale={0.2}
                minDepthThreshold={0.9}
                debug = {0}
                maxDepthThreshold={1}
                depthToBlurRatioBias={0.25}
                reflectorOffset={0.8}/>
            </mesh>
}

export function SplashScreen({displaySplash}){
    const animationz = {
        initial:{
            opacity:1,
            display:"flex",
        },
        exit:{
            opacity:0,
            transition:{
                duration:0.5
            },
            transitionEnd:{
                display:"none"
            }
        }
    }

    return <motion.div id='mainSplashDiv' variants={animationz} initial="initial" exit="exit"  >
                <motion.img src={splashImage}  alt='lunder rentals splash screen image' />
                <SplashProgressBar removeSplashScreen={displaySplash}/>
            </motion.div>
}

function SplashProgressBar({removeSplashScreen}){
    const [isPresent, safeToRemove] = usePresence()
    const [percentage,setPercentage] = useState(0);
    const waitMax = 94;
    const timeOutRef = useRef(null)
    function generateProgress(){
        timeOutRef.current = setTimeout(() => {
            ProgressProcess()
        }, 1670);
    }
    function ProgressProcess(){
        let randomValue = GenerateRandomValue();
        console.log("random value is : ", randomValue );
        flushSync(()=>{
            setPercentage(init=> init + randomValue <= waitMax ? init + randomValue : init )
        })
    }
    function GenerateRandomValue(){
        let multiplier = 7;
        return Math.ceil(Math.random() * multiplier)
    }

    useEffect(function(){
        percentage >= waitMax ? clearTimeout(timeOutRef) : generateProgress();
        return ()=> clearTimeout(timeOutRef)
    },[percentage])

    useEffect(function(){
        if (removeSplashScreen) {
            setPercentage(init=>100)
        }
    },[removeSplashScreen])

    useEffect(function(){
        if(isPresent){
            setPercentage(init=>100);
            setTimeout(safeToRemove, 500)
        }
    },[isPresent])
    return <motion.div id="SplashProgressBar" >
                <motion.p id="pee">{percentage}</motion.p><motion.p>%</motion.p>
            </motion.div>
}

export function BodyContent(){
    return <motion.div id='bodyContentContainer'>
                <First/>
                <Second/>
                <Third/>
                <Fourth/>
    </motion.div>
}

function First(){
    return <motion.div id='firstContainer'>
                <motion.div id='imageContainer'>
                    <motion.img src={OneImage}/>
                </motion.div>

                <motion.div id='text'>
                    <motion.p id='Title'>TOP OF THE SHELVE CARS</motion.p>
                    <motion.div id='underline'></motion.div>
                    <motion.p id='paragraph'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse sit voluptates voluptatibus. Error consequatur laborum, accusamus quidem ad ipsam sit nihil id commodi perspiciatis libero voluptates culpa iusto eius et odit ab voluptate debitis sint facere esse adipisci officiis placeat? Atque ipsum rerum incidunt dolorem! Temporibus optio ea eos aspernatur!
                    </motion.p>
                </motion.div>
    </motion.div>
}

function Second(){
    return <motion.div id='secondContainer'>
                <motion.div id='text'>
                    <motion.p id='Title'>AFFORDABLE YET EXCLUSIVE</motion.p>
                    <motion.div id='underline'></motion.div>
                    <motion.p id='paragraph'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse sit voluptates voluptatibus. Error consequatur laborum, accusamus quidem ad ipsam sit nihil id commodi perspiciatis libero voluptates culpa iusto eius et odit ab voluptate debitis sint facere esse adipisci officiis placeat? Atque ipsum rerum incidunt dolorem! Temporibus optio ea eos aspernatur!
                    </motion.p>
                </motion.div>

                <motion.div id='imageContainer'>
                    <motion.img src={TwoImage}/>
                </motion.div>
</motion.div>
}

function Third(){
    return <motion.div>

    </motion.div>
}

function Fourth(){
    return <motion.div id='fourthContainer'>
                <motion.div id='text'>
                    <motion.p id='Title'>AFFORDABLE YET EXCLUSIVE</motion.p>
                    <motion.div id='underline'></motion.div>
                    <motion.p id='paragraph'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse sit voluptates voluptatibus. Error consequatur laborum, accusamus quidem ad ipsam sit nihil id commodi perspiciatis libero voluptates culpa iusto eius et odit ab voluptate debitis sint facere esse adipisci officiis placeat? Atque ipsum rerum incidunt dolorem! Temporibus optio ea eos aspernatur!
                    </motion.p>
                </motion.div>

                <motion.div id='imageContainer'>
                    <motion.img src={FourImage}/>
                </motion.div>
            </motion.div>
}