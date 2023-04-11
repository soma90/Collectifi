import React from 'react';
import styled from 'styled-components';
import PageTitle from '../UI/PageTitle';
import Tab from '../UI/Tab';
import CardList from '../market/CardList';
import BoardList from '../UI/BoardList';
import BoardTitleItem from '../UI/BoardTitleItem';
import BoardListItem from '../UI/BoardListItem';

const MyPage = () => {
  return (<MyPageLayout>
      <PageTitle title='MY PAGE'/>
      <Tab title={["MY CARD", "MY POST", "GET OFFER"]}>
        <CardList itemWidth='250px'/>
        <BoardList 
          title={<BoardTitleItem title={["POST1", "POST2", <div key={0}>POST3</div>]} 
          gridTemplateColumns='1fr 2fr 1fr'/>
        }
        >
          {new Array(10).fill(0).map((el, i) => {
            const listItem = ["test1", "test2", <div key={i}>test3</div>];
            return (<BoardListItem key={i} 
              listItem={listItem} 
              gridTemplateColumns='1fr 2fr 1fr'
              linkTo={`${i}`}/>)
          })}
        </BoardList>
        <BoardList 
          title={<BoardTitleItem title={["OFFER1", "OFFER2", "OFFER3", "OFFER4", "OFFER5"]} 
          gridTemplateColumns='1fr 2fr 2fr 1fr 1fr'/>}
        >
          {new Array(10).fill(0).map((el, i) => {
            const listItem = ["test1", "test2", "test3", "test4", "test5"];
            return (<BoardListItem key={i} 
              listItem={listItem} 
              gridTemplateColumns='1fr 2fr 2fr 1fr 1fr'
              linkTo={`${i}`}/>)
          })}
        </BoardList>
      </Tab>
    </MyPageLayout>)
}

export default MyPage;

const MyPageLayout = styled.div`
  max-width: 60%;
  margin: 0 auto;
  @media only screen and (max-width: 1024px) {
    max-width: 93%;
  }
`