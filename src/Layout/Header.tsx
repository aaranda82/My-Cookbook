import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colorScheme } from "../colorScheme";
import HeaderButtons from "../components/HeaderButtons";
import { RootState } from "../reducers/rootReducer";
import { styles } from "../styles";

const { primaryColorOne, primaryColorTwo } = colorScheme;
const { mobileMaxWidth, primaryFont } = styles;

interface LIProps {
  loggedIn: string | null;
}
const HeaderContainer = styled.header<LIProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  width: 100%;
  background-color: ${(props) => (props.loggedIn ? primaryColorOne : "white")};
  z-index: 5;
`;

const LogoContainer = styled.div<LIProps>`
  width: 60%;
  display: flex;
  justify-content: ${(props) => (props.loggedIn ? "left" : "center")};
`;

const Logo = styled.div<LIProps>`
  margin: ${(props) => (props.loggedIn ? "10px 0" : "20px 0")};
  font-family: ${primaryFont};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 30px;
  text-align: ${(props) => (props.loggedIn ? "left" : "center")};
  color: ${(props) => (props.loggedIn ? primaryColorTwo : primaryColorOne)};
  & > a {
    color: ${(props) => (props.loggedIn ? primaryColorTwo : primaryColorOne)};
    text-decoration: none;
    margin-left: 20px;
  }
  @media (max-width: ${mobileMaxWidth}) {
    font-size: 20px;
  }
`;

const LogoSpacer = styled.div`
  width: 20%;
  @media (max-width: ${mobileMaxWidth}) {
    display: none;
  } ;
`;

const Header = () => {
  const displayName = useSelector(
    (state: RootState) => state.userReducer.displayName,
  );
  const HandleLogo = () => {
    return (
      <>
        {displayName ? null : <LogoSpacer />}
        <LogoContainer loggedIn={displayName} id="logo cont">
          <Logo loggedIn={displayName}>
            {displayName ? <Link to={"/"}>My Recipes</Link> : "My Recipes"}
          </Logo>
        </LogoContainer>
      </>
    );
  };

  return (
    <HeaderContainer id="Header" loggedIn={displayName ? "loggedIn" : null}>
      <HandleLogo />
      <HeaderButtons />
    </HeaderContainer>
  );
};

export default Header;
