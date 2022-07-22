import styled from "styled-components";

export const SocialMediaButton = styled.button`
  display: flex;
  justify-content: center;
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
  font-family: "DM Sans", sans-serif;

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

export const Disable = styled.div`
  opacity: 0.5;
  width: 100%;
  pointer-events: none;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.75rem;
`;
