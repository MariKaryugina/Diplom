import Lottie from "react-lottie";

import { Canvas } from "@react-three/fiber";
import { Link } from "react-router-dom";

import { Stars } from "@react-three/drei";

import styled from "styled-components";
import { StaticEarth } from "../../components";
import { Button } from "@mui/material";
import { MouseParallaxChild, MouseParallaxContainer } from "react-parallax-mouse";

// import firstVirus from '../../photo/1.jpg';
// import secondVirus from '../../photo/2.jpg';
import thirdVirus from '../../photo/3.png';
import fourthVirus from '../../photo/4.png';

import covid1 from '../../photo/covid1';
import covid2 from '../../photo/covid2';

const Container = styled.div`
  top: 0;
  width: 100%;
  height: 100%;
`;

function rInteger(min: number, max: number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const Parallax = () => {
  const items = Array(20).fill(1);

  return (
    <MouseParallaxContainer
      containerStyle={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
    >
      {items.map(() => (
        <MouseParallaxChild
          style={{
            position: 'absolute',
            top: `${rInteger(15, 85)}%`,
            left: `${rInteger(15, 85)}%`,
          }}
          factorX={Math.random() + 0.1}
          factorY={Math.random() + 0.1}
        >
          <img
            style={{
              width: `${rInteger(30, 50)}px`,
              height: `${rInteger(30, 50)}px`,
              position: 'absolute'
            }}
            src={Math.random() < 0.5 ? thirdVirus : fourthVirus}
            alt=""
          />
        </MouseParallaxChild>
      ))}
    </MouseParallaxContainer>
  )
};

const LottieElement = ({
  left = 0,
  top = 0,
  width = 150,
  height = 150,
  data,
}: any) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };


  return (
    <div style={{ position: 'absolute', top, left }}>
      <Lottie width={width} height={height} options={defaultOptions} />
    </div>
  )
}

export const Main = () => {
  return (
    <Container>
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, zIndex: -2, backgroundColor: 'black' }}>
        <Canvas>
          <Stars
            radius={400}
            depth={60}
            count={15000}
            factor={7}
            saturation={1}
            fade={true}
          />
        </Canvas>
      </div>

      <div>
        <LottieElement top={'5%'} left={'0%'} width={250} height={250} data={covid1} />
        <LottieElement top={'45%'} left={'5%'} width={250} height={250} data={covid1} />
        {/* <LottieElement top={'25%'} left={'45%'} width={250} height={250} data={covid1} /> */}
        <LottieElement top={'20%'} left={'25%'} width={250} height={250} data={covid1} />
        <LottieElement top={'80%'} left={'25%'} width={250} height={250} data={covid1} />
        {/* <LottieElement top={'60%'} left={'25%'} width={250} height={250} data={covid1} /> */}
        {/* <LottieElement top={'30%'} left={'15%'} width={100} height={100} data={covid2} />
        <LottieElement top={'90%'} left={'5%'} width={100} height={100} data={covid2} />
        <LottieElement top={'60%'} left={'20%'} width={200} height={200} data={covid2} /> */}
        <LottieElement top={'20%'} left={'80%'} width={250} height={250} data={covid1} />
        <LottieElement top={'10%'} left={'70%'} width={250} height={250} data={covid1} />
        <LottieElement top={'60%'} left={'70%'} width={250} height={250} data={covid1} />
        <LottieElement top={'78%'} left={'85%'} width={150} height={150} data={covid1} />
      </div>

      {/* <Parallax /> */}

      {/* <div style={{ width: '100%', height: '100%', background: 'transparent', position: 'absolute', top: 0, zIndex: -2 }}> */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, zIndex: -1 }}>
        <Canvas>
          <StaticEarth />
        </Canvas>
      </div>

      <nav
        style={{
          zIndex: 2,
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          color: 'white', padding: '20px', position: 'absolute', top: '50%', left: '50%'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <Button style={{ width: '300px', height: '80px', background: 'linear-gradient(167deg, #59a6f9, transparent, #59a6f9)' }} variant="contained">
            <Link style={{
              textDecoration: 'none',
              color: 'white',
              fontSize: '40px',
              fontWeight: 900,
              fontFamily: 'cursive',
            }} to="/earth">КАРТА</Link>
          </Button>

          <Button style={{ width: '300px', height: '80px', background: 'linear-gradient(167deg, #59a6f9, transparent, #59a6f9)' }} variant="contained">
            <Link style={{
              textDecoration: 'none',
              color: 'white',
              fontSize: '40px',
              fontWeight: 900,
              fontFamily: 'cursive',
            }} to="/simulate">СИМУЛЯТОР</Link>
          </Button>
        </div>
      </nav>
      {/* </div> */}
    </Container>
  );
};
