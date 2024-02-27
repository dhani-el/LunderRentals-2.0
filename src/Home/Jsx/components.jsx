import { useEffect, useLayoutEffect, useRef} from 'react';
import { Button } from "@mui/material";
import Swipe from "@mui/icons-material/Swipe";
import { Canvas, useLoader,useFrame} from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls, MeshReflectorMaterial, PerspectiveCamera } from '@react-three/drei';
import {LinearEncoding, RepeatWrapping, TextureLoader} from 'three';
import { useMediaQuery } from 'react-responsive';
import LoadingBar from "react-top-loading-bar"
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import splashImage from "/one.png";



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
    const [normal, roughness] = useLoader(TextureLoader, ["/texture/rough.jpg","/texture/normal.jpg"]);

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
    const animations = {
        main:{
          initial : {
            opacity:1,
            zindex:20,
            duration:'2s',
        },
        animationOn:{
            opacity:1,
            zindex:20,
        },
        animationOff:{
            opacity:0,
            zindex:0,
            duration:'2s',
            transitionEnd:{
                display:"none",
            }
        }
    },
    image:{
        initial:{
            scaleX:1.0,
            scaleY:1.0,
        },
        animation:{
            scaleX:1.2,
            scaleY:1.2,
            transition:{
                repeat:"Infinity",
                repeatType: "reverse",
                repeatDelay: 0.5,
                ease:"easeInOut",
                duration:0.5
            },
        },

    }
}
    const LoadingBarRef = useRef(null);

    useEffect(function(){
        if (LoadingBarRef === null) {
            return     
        }
        LoadingBarRef.current.continuousStart()
    });

    useEffect(function(){
        if ( displaySplash === false) {
           LoadingBarRef.current.complete();
        }
    }, []);

    return <motion.div id='mainSplashDiv' className={displaySplash? "displaySplash": "" } variants={animations.main} initial="initial" animate={displaySplash ? "animationOn" : "animationOff"} >
                <motion.img src={splashImage} alt='lunder rentals splash screen image' variants={animations.image} initial="initial" animate={displaySplash ?"animation" : "initial"} />
                <LoadingBar ref={LoadingBarRef} color='aquamarine' height="1em" />
            </motion.div>
}

