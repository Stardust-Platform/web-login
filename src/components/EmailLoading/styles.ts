import styled from "styled-components";

export const EmailVerificationText = styled.p`
  font-family: "DM Sans";
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.313rem;
  text-align: center;
  color: #2a2a2a;
  margin-bottom: 0.5rem;
`;

export const CodeContainer = styled.div`
  margin-top: 10px;
`;

export const ConfirmButton = styled.button`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.625rem 0.75rem;
  background: #5f2fff;
  border-radius: 0.625rem;
  border: none;
  color: #fff;
  font-family: "DM Sans", sans-serif;
  transition: all 0.3s;
  font-weight: bold;
  font-size: 1.125rem;
  line-height: 1.75rem;
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 10px;
`;

export const EmailActionText = styled.p`
  font-family: "DM Sans";
  font-size: 1rem;
  line-height: 1.313rem;
  text-align: center;
  color: #6a6a6a;
  margin: 0 0 1.5rem 0;
`;

export const LoaderContainer = styled.div`
  width: 2rem;
  height: 2rem;
  margin-bottom: 2.5rem;

  div {
    box-sizing: border-box;
    position: absolute;
    width: 2rem;
    height: 2rem;
    border: 3px solid #5f2fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #5f2fff transparent transparent transparent;
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }

  div:nth-child(2) {
    animation-delay: -0.3s;
  }

  div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ResendEmailContainer = styled.div`
  align-self: start;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "DM Sans";
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: #aaaaaa;
`;

export const ChangeEmail = styled.p`
  color: #5f2fff;
  cursor: pointer;
`;

export const ResendEmailLink = styled.span`
  color: #5f2fff;
  cursor: pointer;
`;
