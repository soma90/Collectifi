import React from 'react';
import BoardTitleItem from './BoardTitleItem';
import BoardListItem from './BoardListItem';

type Props = {
  title?: React.ReactElement<typeof BoardTitleItem>;
  children: React.ReactElement<typeof BoardListItem>[];
  className?: string;
};

const BoardList: React.FC<Props> = props => {
  return (
    <div className={props.className}>
      <div>{props.title}</div>
      <ul>{props.children}</ul>
    </div>
  );
};

export default BoardList;
