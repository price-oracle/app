import styled from 'styled-components';

import {
  Logo, 
  THEME_TEXT_PRIMARY,
  THEME_BACKGROUND,
  BoxButton,
  SPACING_16,
  SPACING_192,
  SPACING_384,
  SPACING_64,
  MOBILE_MAX_WIDTH
} from '../../components/shared';

export const Container = styled.div<{ height: number }>`
  background-color: ${THEME_BACKGROUND};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

export const TopContent = styled.div``;

export const MiddleContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100vw;

  @media (max-width: ${MOBILE_MAX_WIDTH}) {
    align-self: center;
  }
`;

// export const DataBoxButton = styled(BoxButton).attrs({
//   height: '146px',
// })`
//   background-color: ${THEME_BACKGROUND};
//   color: ${THEME_TEXT_PRIMARY};
//   padding: 2rem 0;
//   flex-direction: column;

//   &:hover {
//     left: calc(50% - 8px);
//   }

//   @media (max-width: ${MOBILE_MAX_WIDTH}) {
//     padding: 1rem 0;
//     position: relative;
//   }
// `;

export const DataTitle = styled.div`
  font-family: PlusJakartaSans;
  font-size: 40px;
  font-weight: 800;
  line-height: 50px;
  margin-bottom: 0.5rem;
  text-align: center;

  @media (max-width: ${MOBILE_MAX_WIDTH}) {
    font-size: 30px;
    line-height: unset;
  }
`;

export const DataSubtitle = styled.div`
  font-family: PlusJakartaSans;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  text-align: center;

  @media (max-width: ${MOBILE_MAX_WIDTH}) {
    font-weight: unset;
  }
`;

export const BottomContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(20%, auto));
  grid-gap: 1rem;
  margin: 1rem;

  @media (max-width: ${MOBILE_MAX_WIDTH}) {
    grid-template-columns: repeat(2, minmax(20%, auto));
  }
`;

export const Link = styled.a`
  align-items: center;
  box-sizing: border-box;
  color: ${THEME_TEXT_PRIMARY};
  display: flex;
  font-family: PlusJakartaSans;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  justify-content: center;
  line-height: 20px;
  padding: 16px 0;
  text-decoration: none;
  width: 180px;

  div {
    border-bottom: 2px solid ${THEME_BACKGROUND};
  }

  &:hover {
    div {
      border-bottom-color: ${THEME_TEXT_PRIMARY};
    }
  }
`;

export const StyledLogo = styled(Logo)`
  width: ${SPACING_384};

  @media (max-width: ${MOBILE_MAX_WIDTH}) {
    width: ${SPACING_192};
  }
`;

export const EnterBoxButton = styled(BoxButton)`
  padding: ${SPACING_16} ${SPACING_64};
  width: fit-content;
`;

export const TextContainer = styled.div`
  text-align: center;
  max-width: 50rem;
  line-height: 2rem;
  margin: 2rem auto;

  @media (max-width: ${MOBILE_MAX_WIDTH}) {
    flex-direction: column;

    & > div {
      width: 18rem;
      margin: ${SPACING_16} auto;
      text-align: center;
    }
  }
`;
