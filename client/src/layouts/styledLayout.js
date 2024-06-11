import { Grid, Header, Navbar } from '@mantine/core'
import styled from 'styled-components'
import { ColGrid, ScaleGrid } from '../assets/style/styled'
import { StyleButton } from '../components/buttons/styledButtonWB'

const NavGrid = styled(Grid)`
  background: #628b48;
  border-radius: 8px;
  margin: 4px -8px 10px;
  justify-content: space-around;
  padding: 4px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  .mantine {
    &-Grid-root {
      background: transparent;
      margin: 0;
      padding: 0;
      .mantine-Grid-col {
        padding: 0;
      }
    }
    &-Divider-root {
      margin: 0px 10px;
      border-color: #fafff5bb;
    }
  }
`
const NavCol = styled(Grid.Col)`
  border-radius: 8px;
  padding: 8px 14 px;
`

const SideBox = styled(Navbar)`
  height: 100vh;
  justify-content: space-between;
  gap: 40px;
  border-radius: 0px 15px 15px 0px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  padding: 16px;
  > div {
    margin: 16px 0;
    &:nth-child(2) {
      max-height: 75vh;
      overflow-y: hidden;
    }
  }
`

const SideSection = styled(Navbar.Section)`
  :nth-child(2) {
    flex-grow: 2;
  }
  :last-child {
    .mantine-NavLink-root {
      min-height: 32px;
      color: #ff0000;
      &:hover {
        outline: 1px solid #ff000097;
      }
    }
  }
  .mantine-NavLink-root {
    margin-bottom: 10px;
    border-radius: 8px;
    min-height: 48px;
  }
`
const HeaderNav = styled(Header)`
  background-color: #628b48;
  display: flex;
  height: 100%;
  width: calc(100% - 16px);
  margin: 0px auto;
  padding: 8px;
  border-radius: 0px 0px 8px 8px;
  box-shadow: none;
  > div {
    flex: 0 1 100%;
    align-items: center;
    justify-content: space-around;
    &:nth-child(1) {
      margin: 0px 8px;
      flex-basis: 35%;
      justify-content: center;
    }
    &:last-child {
      flex-basis: 45%;
      justify-content: flex-end;
    }
  }
  .mantine {
    &-Group-root {
      align-items: stretch;
      &:nth-child(2) {
        justify-content: center;
      }
      > * {
        color: #fafff5;
      }
      a {
        display: flex;
        height: 100%;
        align-items: center;
        padding: 0px 8px;
        border-radius: 6px;
        position: relative;
        margin: 0px 6px;
        i {
          padding-right: 8px;
          font-size: 18px;
          font-weight: 100;
          display: block;
        }
        &:hover,
        &.active {
          background: #fafff5;
          color: #628b48;
          transform: scale(1.05);
          &.active::before {
            border-radius: 6px;
          }
        }
      }
    }
  }
  .info {
    p {
      font-weight: 600;
    }
    > * {
      display: flex;
      align-items: center;
      margin: 0px 8px;
    }
    .icon-fingerprint {
      padding: 4px;
      position: relative;
      background-color: #628b48;
      border: #fafff5 2px solid;
      i {
        padding-right: 0px;
        font-size: 32px;
        &:nth-child(2) {
          color: #628b48;
          position: absolute;
          font-size: 14px;
          top: calc(50% - 1px);
          left: 50%;
          transform: translate(-50%, -50%);
          &::before {
            border-radius: 50px;
            background: #fafff5;
          }
        }
      }
      &:hover,
      &.active {
        i:nth-child(2)::before {
          background-color: #628b48;
          color: #fafff5;
        }
      }
      &.logout {
        i {
          font-size: 28px;
        }
      }
    }
  }
`
const DrawerSection = styled.div`
  border: 2px solid #628b48;
  padding: 12px 16px;
  border-radius: 6px;
  margin: 16px 0px;
  color: #455b37;
  .mantine-Title-root {
  }
  ${ScaleGrid} {
    padding: 4px 0px;
    ${ColGrid} {
      padding: 2px 4px;
      &:nth-child(even)::before {
        content: ':';
        margin-right: 8px;
      }

      ${StyleButton} {
        margin: 8px 0px;
        width: 100%;
      }
      .loader-fingerprint {
        width: fit-content;
        margin: 8px auto;
        border: #628b48 2px solid;
        padding: 8px 16px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        &-icon {
          position: relative;
          width: 32px;
          height: 32px;
          margin-right: 8px;
          svg {
            width: 100%;
            height: 100%;
          }
          i {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 20px;
          }
        }
        span {
          font-weight: 700;
        }
      }
    }
  }
  .mantine {
    &-Divider-root {
      border-color: #628b48;
    }
  }
`
export { DrawerSection, HeaderNav, NavGrid, NavCol, SideBox, SideSection }
