import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 1000;
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

export const Form = styled.form`
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

export const HeaderContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
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
  font-size: 0.875rem;
  line-height: 1.125rem;
  margin: 1rem 0;
  align-self: baseline;
  color: #aaaaaa;
  font-family: 'DM Sans', sans-serif;
`;

export const SocialMediaButton = styled.button`
  display: flex;
  justify-content: baseline;
  align-items: center;
  padding: 0.625rem 1rem;
  margin-bottom: 0.5rem;
  width: 100%;
  height: 2.563rem;
  background: #ffffff;
  border: 0.063rem solid #dadada;
  box-sizing: border-box;
  border-radius: 0.625rem;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.313rem;
  letter-spacing: -0.015em;
  color: #4a4a4a;
  font-family: 'DM Sans', sans-serif;

  &:hover {
    cursor: pointer;
    background: #f2eeff;
    border: 0.063rem solid #b59fff;
  }

  &:active {
    background: #f2eeff;
    opacity: 0.4;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.75rem;
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
  font-family: 'DM Sans', sans-serif;
`;

export const StrongUnderlineText = styled.a`
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
`;
