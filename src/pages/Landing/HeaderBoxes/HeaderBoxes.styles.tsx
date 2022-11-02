import styled, { keyframes } from 'styled-components';
import {
  SPACING_128,
  SPACING_192,
  SPACING_24,
  SPACING_256,
  SPACING_32,
  SPACING_64,
  SPACING_96,
  MOBILE_MAX_WIDTH,
  THEME_BORDER,
  THEME
} from '../../../components/shared';

const createAnimation = ({
  rotate,
  initialX,
  initialY,
}: {
  rotate: string;
  initialX?: string;
  initialY?: string;
}): any => {
  return keyframes`
    0% {
      opacity: 0;
      transform: translate(${initialX || '0'}, ${initialY || '0'}) rotate(0);
    }

    100% {
      opacity: 1;
      transform: translate(0, 0) rotate(${rotate});
    }
  `;
};
console.log(THEME.type === 'dark' && 'filter: invert(100%);');
export const Container = styled.div`
  ${THEME.type === 'light' && 'filter: invert(100%);'}
  overflow-x: clip;
  position: absolute;
  top: 0;
  width: 100%;
`;

const Box = styled.div`
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  background-color: #fff;
  border: ${THEME_BORDER};
  mix-blend-mode: difference;
  position: absolute;
`;

const BoxSize1 = styled(Box)`
  height: ${SPACING_24};
  width: ${SPACING_24};
`;

const BoxSize2 = styled(Box)`
  height: ${SPACING_32};
  width: ${SPACING_32};
`;

const BoxSize3 = styled(Box)`
  height: ${SPACING_64};
  width: ${SPACING_64};
`;

const BoxSize4 = styled(Box)`
  height: ${SPACING_96};
  width: ${SPACING_96};
`;

const BoxSize5 = styled(Box)`
  height: ${SPACING_128};
  width: ${SPACING_128};

  @media (max-width: ${MOBILE_MAX_WIDTH}) {
    display: none;
  }
`;

const BoxSize6 = styled(Box)`
  height: ${SPACING_192};
  width: ${SPACING_192};

  @media (max-width: ${MOBILE_MAX_WIDTH}) {
    display: none;
  }
`;

const BoxSize7 = styled(Box)`
  height: ${SPACING_256};
  width: ${SPACING_256};

  @media (max-width: ${MOBILE_MAX_WIDTH}) {
    display: none;
  }
`;

export const Box1 = styled(BoxSize5)`
  animation-name: ${createAnimation({
  rotate: '-112.65deg',
  initialY: '-100%',
})};
  left: -45px;
  top: 30px;
`;

export const Box2 = styled(BoxSize4)`
  animation-name: ${createAnimation({
  rotate: '-63.31deg',
  initialY: '-100%',
  initialX: '-100%',
})};
  left: 5px;
  top: 215px;

  @media (max-width: ${MOBILE_MAX_WIDTH}) {
    left: -5px;
    top: -10px;
  }
`;

export const Box3 = styled(BoxSize2)`
  animation-name: ${createAnimation({
  rotate: '-28.44deg',
  initialY: '-100%',
  initialX: '-100%',
})};
  left: -7px;
  top: 350px;

  @media (max-width: ${MOBILE_MAX_WIDTH}) {
    top: 100px;
  }
`;

export const Box4 = styled(BoxSize1)`
  animation-name: ${createAnimation({
  rotate: '-26.43deg',
  initialY: '-100%',
  initialX: '-100%',
})};
  left: 40px;
  top: 400px;

  @media (max-width: ${MOBILE_MAX_WIDTH}) {
    top: 40px;
    left: 120px;
  }
`;

export const Box5 = styled(BoxSize6)`
  animation-name: ${createAnimation({
  rotate: '-7.7deg',
  initialY: '-100%',
  initialX: '-100%',
})};
  left: 9vw;
  top: -30px;
`;

export const Box6 = styled(BoxSize2)`
  animation-name: ${createAnimation({
  rotate: '-28.44deg',
  initialY: '-100%',
  initialX: '-100%',
})};
  left: 8vw;
  top: 30px;
`;

export const Box7 = styled(BoxSize3)`
  animation-name: ${createAnimation({
  rotate: '-24.56deg',
  initialY: '-100%',
  initialX: '-100%',
})};
  left: 10vw;
  top: 190px;

  @media (max-width: ${MOBILE_MAX_WIDTH}) {
    left: 32vw;
    top: -20px;
  }
`;

export const Box8 = styled(BoxSize7)`
  animation-name: ${createAnimation({
  rotate: '-70.6deg',
  initialY: '-100%',
  initialX: '-25%',
})};
  left: 25vw;
  top: -100px;
`;

export const Box9 = styled(BoxSize5)`
  animation-name: ${createAnimation({
  rotate: '-21.25deg',
  initialY: '-100%',
})};
  left: 34vw;
  top: -20px;
`;

export const Box10 = styled(BoxSize4)`
  animation-name: ${createAnimation({
  rotate: '-68.34deg',
  initialY: '-100%',
})};
  right: 46vw;
  top: -20px;

  @media (max-width: ${MOBILE_MAX_WIDTH}) {
    right: 0;
    top: 5px;
  }
`;

export const Box11 = styled(BoxSize2)`
  animation-name: ${createAnimation({
  rotate: '-46.29deg',
  initialY: '-100%',
})};
  right: 40vw;
  top: 50px;
`;

export const Box12 = styled(BoxSize6)`
  animation-name: ${createAnimation({
  rotate: '-7.7deg',
  initialY: '-100%',
  initialX: '25%',
})};
  right: 31vw;
  top: -50px;
`;

export const Box13 = styled(BoxSize7)`
  animation-name: ${createAnimation({
  rotate: '-36.63deg',
  initialY: '-100%',
  initialX: '100%',
})};
  right: 120px;
  top: -15px;
`;

export const Box14 = styled(BoxSize2)`
  animation-name: ${createAnimation({
  rotate: '-28.44deg',
  initialY: '-100%',
  initialX: '100%',
})};
  right: 15px;
  top: 150px;

  @media (max-width: ${MOBILE_MAX_WIDTH}) {
    right: 5px;
    top: 100px;
  }
`;

export const Box15 = styled(BoxSize5)`
  animation-name: ${createAnimation({
  rotate: '-63.31deg',
  initialY: '-100%',
  initialX: '100%',
})};
  right: -15px;
  top: 220px;
`;

export const Box16 = styled(BoxSize2)`
  animation-name: ${createAnimation({
  rotate: '-78.4deg',
  initialY: '-100%',
})};
  right: 55px;
  top: 350px;

  @media (max-width: ${MOBILE_MAX_WIDTH}) {
    top: 10px;
    right: 30vw;
  }
`;

export const Box17 = styled(BoxSize1)`
  animation-name: ${createAnimation({
  rotate: '-66.64deg',
  initialY: '-100%',
  initialX: '100%',
})};
  right: 5px;
  top: 410px;

  @media (max-width: ${MOBILE_MAX_WIDTH}) {
    top: 8px;
    right: 35vw;
  }
`;
