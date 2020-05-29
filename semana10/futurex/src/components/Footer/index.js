import React from 'react';
import {
  FooterContainer,
  SocialMediaContainer,
  Facebook,
  Instagram,
  Twitter
} from './style';

const Footer = (props) => {
  
  return (
    <FooterContainer>
      <SocialMediaContainer>
        <Facebook />
        <Instagram />
        <Twitter />
      </SocialMediaContainer>
      <p>Todos os direitos reservados</p>
    </FooterContainer>
  )
}

export default Footer;