import styled from 'styled-components';
import FacebokIcon from '@material-ui/icons/Facebook';
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";

export const FooterContainer = styled.div`
  background-color: lightgray;
  width: 100%;
  padding: 1.5em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
export const SocialMediaContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
`
export const Facebook = styled(FacebokIcon)`
`
export const Instagram = styled(InstagramIcon)`
`
export const Twitter = styled(TwitterIcon)`
`