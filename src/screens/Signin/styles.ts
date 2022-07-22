import styled from "styled-components";
import { EmailContainerProps } from "./types";

export const Container = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #2a2a2a;
  opacity: 0.25;
  z-index: 999;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  position: relative;
  width: 18rem;
  min-height: 13.618rem;
  background: #fafafa;
  border-radius: 1.5rem;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin-bottom: 1rem;
`;

export const BackArrowIconContainer = styled.div`
  position: absolute;
  left: 1rem;
  cursor: pointer;
`;

export const LogoImage = styled.img`
  min-height: 1.5rem;
  max-height: 3rem;
  min-width: 3rem;
  max-width: 10rem;
`;

export const CloseIconContainer = styled.div`
  position: absolute;
  right: 1.313rem;
  cursor: pointer;
`;

export const Text = styled.h2`
  font-weight: bold;
  font-size: 1rem;
  margin-top: 0;
  color: #6a6a6a;
  font-family: "DM Sans", sans-serif;
  margin-bottom: 0.5rem;
`;

export const EmailContainer = styled.div<EmailContainerProps>`
  width: 100%;
  background: #ffffff;
  opacity: 0.99;
  border: ${(props) =>
    props.hasError ? "2px solid #FF5473" : "1px solid #e0e0e0"};
  box-sizing: border-box;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  padding: 0.625rem 1rem;
  align-items: center;
`;

export const ErrorMessage = styled.div`
  align-self: start;
  font-family: "DM Sans";
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  line-height: 18px;
  color: #ff5473;
  margin: 0.3rem 0 0.5rem 0;
`;

export const TextContainer = styled.div<EmailContainerProps>`
  width: 100%;
  background: #ffffff;
  opacity: 0.99;
  border: ${(props) =>
    props.hasError ? "2px solid #FF5473" : "1px solid #e0e0e0"};
  box-sizing: border-box;
  border-radius: 0.5rem;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  padding: 1rem;
`;

export const TextInput = styled.input`
  width: 100%;
  margin-left: 0.75rem;
  color: #2a2a2a;
  font-family: "DM Sans", sans-serif;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.313rem;
  border: none;

  ::placeholder {
    color: #cacaca;
  }

  :focus {
    border: none;
    outline: none;
  }
`;

export const EmailInput = styled.input`
  width: 100%;
  margin-left: 0.75rem;
  color: #2a2a2a;
  font-family: "DM Sans", sans-serif;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.313rem;
  border: none;

  ::placeholder {
    color: #cacaca;
  }

  :focus {
    border: none;
    outline: none;
  }
`;

export const ContinueButton = styled.button`
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
  font-weight: bold;
  font-size: 1.125rem;
  line-height: 1.75rem;
  cursor: pointer;
  margin-bottom: 1rem;
`;

export const SwitchModeText = styled.p`
  font-family: "DM Sans", sans-serif;
  font-size: 1rem;
  line-height: 1.313rem;
  color: #000000;
  margin-top: 0;

  button {
    font-family: "DM Sans", sans-serif;
    font-size: 1rem;
    line-height: 1.313rem;
    color: #000000;
    padding: 0;
    border: none;
    background: none;
    font-weight: bold;
    cursor: pointer;
  }
`;

export const OptionToSocialText = styled.p`
  margin-top: 0;
  margin-bottom: 1rem;
  font-family: "DM Sans", sans-serif;
  font-size: 0.875rem;
  line-height: 1.125rem;
  text-align: center;
  color: #aaaaaa;
  display: flex;
  align-items: center;

  ::before {
    display: inline-block;
    content: "";
    border-top: 0.063rem solid #eaeaea;
    width: 5rem;
    margin-right: 0.625rem;
    margin-left: 0;
  }

  ::after {
    display: inline-block;
    content: "";
    border-top: 0.063rem solid #eaeaea;
    width: 5rem;
    margin-left: 0.625rem;
  }
`;

export const SeparatorLine = styled.div`
  width: 100%;
  height: 0;
  border-top: 0.063rem solid #eaeaea;
  margin: 0.5rem 0 1rem 0;
`;

export const TermsText = styled.p`
  margin: 0 1rem 0 1rem;
  font-size: 0.75rem;
  line-height: 1rem;
  text-align: center;
  color: #6a6a6a;
  font-family: "DM Sans", sans-serif;
`;

export const StrongUnderlineText = styled.a`
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
  color: #6a6a6a;
`;

export const MagicLoading = styled.div`
  margin: 30px auto 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
