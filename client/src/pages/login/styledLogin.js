import { Box, Paper } from '@mantine/core'
import styled from 'styled-components'
import bg from '../../assets/images/plantations.jpg'
import { LogoStyled } from '../../assets/style/styled'

const LoginPage = styled(Box)`
  background: url(${bg});
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  position: relative;
  ${LogoStyled} {
    background: transparent;
    img {
      height: 80px;
    }
    span {
      display: none;
    }
  }
`
const GlassCard = styled(Paper)`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background: #ffffffbe;
  border-radius: 8px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(149, 149, 149, 0.44);
  text-align: start;
  min-width: 400px;
  padding: 30px 40px;
  position: relative;

  > div {
    margin: 4px 0;
  }
  .wide-logo {
    height: 120px;
    width: 100%;
  }
  .login__ {
    &copyright {
      margin-top: 19px;
      display: flex;
      justify-content: center;
      color: #383838;
    }
  }
`

export { LoginPage, GlassCard }
