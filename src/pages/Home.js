import { useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { Button, COLORS, FlexDiv, GameInfo, HighlightedText } from "../styling";
import { PlayerSide, PlayModes } from "../store/data";
import SymbolO from "../assets/svg/O-symbol.svg";
import SymbolX from "../assets/svg/X-symbol.svg";

const SideImage = styled.img`
  opacity: 0.3;
  cursor: pointer;
  transition: 300ms ease-in-out;

  ${(props) =>
    props.selected &&
    css`
      opacity: 1;
    `}
`;

const Home = () => {
  const [playMode, setPlayMode] = useState(null);
  const [playSide, setSide] = useState("X"); // choosing X by default

  const handlePlayMode = (mode) => {
    if (mode === PlayModes.AI || mode === PlayModes.FRIEND) {
      setPlayMode(mode);
    }
  };

  const handlePlaySide = (side) => {
    if (side === PlayerSide.O || side === PlayerSide.X) {
      setSide(side);
    }
  };

  const playModeView = (
    <div>
      <FlexDiv direction="row" gap="30px">
        <img height="auto" src={SymbolX} alt="X symbol" />
        <img height="auto" src={SymbolO} alt="O symbol" />
      </FlexDiv>

      <FlexDiv direction="column" gap="10px">
        <HighlightedText>Tic Tac Toe. Now with more fun!</HighlightedText>
        <h2>Choose your play mode</h2>

        <FlexDiv direction="column" gap="20px">
          <Button onClick={() => handlePlayMode(PlayModes.AI)}>
            Join Room
          </Button>
          <Button onClick={() => handlePlayMode(PlayModes.FRIEND)} secondary>
            Create room
          </Button>
        </FlexDiv>
      </FlexDiv>
    </div>
  );

  const pickSideView = (
    <FlexDiv direction="column">
      <h2>Pick your side</h2>

      <FlexDiv direction="row" gap="50px">
        <SideImage
          src={SymbolX}
          alt="X symbol"
          selected={playSide === PlayerSide.X}
          onClick={() => handlePlaySide(PlayerSide.X)}
        />
        <SideImage
          src={SymbolO}
          alt="O symbol"
          selected={playSide === PlayerSide.O}
          onClick={() => handlePlaySide(PlayerSide.O)}
        />
      </FlexDiv>

      <GameInfo>
        Playing with <HighlightedText>{playMode}</HighlightedText>
      </GameInfo>

      <Link to={`game/${playMode}/${playSide}`}>
        <Button secondary>Continue</Button>
      </Link>
    </FlexDiv>
  );

  return <FlexDiv flexHeight>{playMode ? pickSideView : playModeView}</FlexDiv>;
};

export default Home;
