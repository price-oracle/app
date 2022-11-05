import {
  Container,
  Box,
  Box1,
  Box2,
  Box3,
  Box4,
  Box5,
  Box6,
  Box7,
  Box8,
  Box9,
  Box10,
  Box11,
  Box12,
  Box13,
  Box14,
  Box15,
  Box16,
  Box17,
  Box1Mobile,
  Box2Mobile,
  Box3Mobile,
  Box4Mobile,
  Box5Mobile,
  Box6Mobile,
  Box7Mobile,
  Box8Mobile,
  Box9Mobile,
  Box10Mobile,
  Box11Mobile,
} from './HeaderBoxes.styles';

import Navigator from '../LandingNavigator';
import { useWindowDimensions } from '~/hooks/windowDimensions';

function HeaderBoxes() {
  const { isMobile } = useWindowDimensions();

  const desktopBoxes = (
    <>
      <Box1 />
      <Box2 />
      <Box3 />
      <Box4 />
      <Box5 />
      <Box6 />
      <Box7 />
      <Box8 />
      <Box9 />
      <Box10 />
      <Box11 />
      <Box12 />
      <Box13 />
      <Box14 />
      <Box15 />
      <Box16 />
      <Box17 />
    </>
  );

  const mobileBoxes = (
    <>
      <Box1Mobile />
      <Box2Mobile />
      <Box3Mobile />
      <Box4Mobile />
      <Box5Mobile />
      <Box6Mobile />
      <Box7Mobile />
      <Box8Mobile />
      <Box9Mobile />
      <Box10Mobile />
      <Box11Mobile />
    </>
  );

  const boxes = !isMobile ? desktopBoxes : mobileBoxes;

  return (
    <Container>
      <Navigator />
      {boxes}
    </Container>
  );
}

export default HeaderBoxes;
