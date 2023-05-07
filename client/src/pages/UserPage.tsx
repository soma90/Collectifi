import React from 'react';
import {Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import Mypage from '../components/mypage/MyPage';
import Fallback from '../components/Fallback';

const UserPage = () => {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <Suspense>
        <Mypage />
      </Suspense>
    </ErrorBoundary>
  );
};

export default UserPage;
