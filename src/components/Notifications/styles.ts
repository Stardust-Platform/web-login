import styled from 'styled-components';

export const Notification = styled.div`
  position: absolute;
  min-height: 3rem;
  right: 55px;
  top: 24px;
  background: #FAFAFA;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.25);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  z-index: 10000;


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

export const TextContainer = styled.div`
  display: flex;
  margin-bottom: 4px;
`;

export const Text = styled.div`
  font-family: 'DM Sans';
  font-weight: bold;
  font-size: 14px;
  line-height: 24px;
  color: #000000;
  margin-left: 0.5rem;
  margin-right: 21px;
`;

export const CloseIconContainer = styled.div`
  cursor: pointer;
`;

export const NotificationMessage = styled.div`
  font-family: 'DM Sans';
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: #6A6A6A;
`;
