import styled from 'styled-components';

export const Notification = styled.div`
  height: 8%;
  width: 20%;
  background-color: #C1F7EE;
  margin-top: 5%;
  margin-left: 76%;
  transform-origin: right;
  /* -webkit-animation: notify 3s ease-in-out infinite;
  animation: notify 3s ease-in-out infinite; */

  /* @keyframes notify {
    0% {transform: scaleX(0);}
    10% {transform: scaleX(1);}
    13% {transform: scale(1.1);}
    16% {transform: scale(1);}
    55% {transform: scaleX(1); border-radius: 0%;}
    65% {transform: scaleX(0.25); border-radius: 50%;}
    95% {transform: scaleX(0.25); border-radius: 50%;}
    100% {transform: scaleX(0);}
  }

  .identifier {
    position: absolute;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: #94DACD;
    margin-top: 5.5px;
    margin-left: 7.5px;
    -webkit-animation: exit 3s ease-in-out infinite;
    animation: exit 3s ease-in-out infinite;
  }

  .text {
    position: absolute;
    height: 6px;
    width: 70px;
    background-color: #94DACD;
    margin-top: 12.25px;
    margin-left: 40px;
    -webkit-animation: exit 3s ease-in-out infinite;
    animation: exit 3s ease-in-out infinite;
  }

  @keyframes exit {
    0% {opacity: 1;}
    55% {opacity: 1;}
    65% {opacity: 0;}
    100% {opacity: 0;}
  }

  .number {
    position: absolute;
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    color: #94DACD;
    margin-top: -40px;
    margin-left: 557px;
    -webkit-animation: enter 3s ease-in-out infinite;
    animation: enter 3s ease-in-out infinite;
  }

  @keyframes enter {
    0% {opacity: 0;}
    55% {opacity: 0;}
    65% {opacity: 1; transform: scaleX(1);}
    95% {opacity: 1; transform: scaleX(1);}
    100% {opacity: 0; transform: scaleX(1);}
  } */
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background: #2a2a2a;
  opacity: 0.25;
  z-index: 100;
`;
