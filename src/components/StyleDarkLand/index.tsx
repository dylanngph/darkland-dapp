import { Box } from "@mui/material";
import { Button } from "components/Pancake-uikit";
import styled from "styled-components";

export const StyleButton = styled(Button)`
    display: flex;
    flex: 2;
    border-bottom: 7px solid #C16000;
`

export const Wrapper = styled(Box)`
  min-height: 100vh;
  color: #fff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-image: url('/images/blindbox/blindbox_page.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`