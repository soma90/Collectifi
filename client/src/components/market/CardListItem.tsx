import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import PlayerCard from '../UI/PlayerCard';

type Props = {  
  info?: string;
  linkTo?: string;
  onClick?: () => void;
  className?: string;
  isSelected?: boolean;
  isPreventDefault?: boolean;
  children: React.ReactElement<object, typeof PlayerCard>; //React.ReactNode
}

const CardListItem: React.FC<Props> = (props) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if(props.isPreventDefault) 
      event.preventDefault();
    if(props.onClick)
      props.onClick();
  }
  
  return (   
    <CardListItemLayout 
      className={props.className} 
      linkTo={props.linkTo}
      isClick={props.onClick}
      isSelect={props.isSelected}
    >
      <Link to={props.linkTo || ""} onClick={handleClick}>
        <div className='wrapper'>
          <div className='item-wrapper'>
            {props.children}
          </div>
          {props.info && <div className='info-wrapper'>
            <div className='price'>{props.info}</div>
          </div>}        
        </div>   
      </Link>    
    </CardListItemLayout>
  )
}

export default CardListItem;

const CardListItemLayout = styled.div<{isClick?: ()=>void; linkTo?: string; className?: string; isSelect?: boolean}>`
  display: inline-block;  
  border-radius: 20px;
  border: 1px solid transparent;
  background-origin: border-box;
  background-clip: content-box, border-box;
  background-image: linear-gradient(rgb(236, 236, 236) 0%, rgb(239, 239, 239) 97.72%), linear-gradient(rgb(236, 236, 236) 0%, rgb(239, 239, 239) 97.72%);
  ${props => css`    
    &:hover {
      background-image: linear-gradient(rgb(250, 250, 250) 0%, rgb(250, 250, 250) 100%), linear-gradient(${props.theme.mainColor} 0%, rgb(255, 225, 235) 100%);
      box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 20px;
    }
    `
  }  
  ${props => props.isSelect && `
    background-image: linear-gradient(rgb(250, 250, 250) 0%, rgb(250, 250, 250) 100%), linear-gradient(${props.theme.mainColor} 0%, rgb(255, 225, 235) 100%);
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 20px;
  `}
  ${props => (!props.linkTo && !props.isClick) && `pointer-events: none;`}

  & .wrapper {
    padding: 20px;
  }

  & .info-wrapper {
    background-color: rgba(203, 203, 203, 0.3);
    border-radius: 40px;
    padding: 10px;
    font-weight: 600;
    text-align: center;
    margin-top: 10px;
  }
`