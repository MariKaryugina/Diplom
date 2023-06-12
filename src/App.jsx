import './App.css';
import styled from "styled-components";
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Earth } from './components/earth/Earth';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;


const App = () => {
  return (
    <Container>
      <Canvas>
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
    </Container>
  );
}

export default App;
