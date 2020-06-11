import React from 'react';
import {
  ApprovedItem,
  DetailsExpPanel,
  DetailsExpPanelSum,
  DetailsExpPanelDet
} from './style';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ApprovedCandidate = (props) => {
  
  const { name, age, profession, applicationText, country, id } = props.person
  return (
    <ApprovedItem>
      <DetailsExpPanel>
        <DetailsExpPanelSum expandIcon={<ExpandMoreIcon />} >
          {name}
        </DetailsExpPanelSum>
        <DetailsExpPanelDet>
          {applicationText}<br/>
          Idade: {age} anos<br/>
          Profissão : {profession}<br/>
          País: {country}
        </DetailsExpPanelDet>
      </DetailsExpPanel>
    </ApprovedItem>
  )
}

export default ApprovedCandidate;