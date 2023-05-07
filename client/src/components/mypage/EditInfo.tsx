import React, { useRef, useState,  } from 'react';
import styled, { css } from 'styled-components';

import { useRecoilCallback, useRecoilValue } from 'recoil';
import { userAmount, userNickname, userReferral } from '../../modules/atom';
import { editNicknameQuery, editReferralQuery } from '../../modules/mypage/atom';
import { ThinButton } from '../UI/ThinButton';
import { ThinInput } from '../UI/ThinInput';
import ModalAlert from '../UI/ModalAlert';

const EditInfo = () => {
  //modal 변수
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  //
  const [isEditClick, setIsEditClick] = useState(false);
  const [isReferClick, setIsReferClick] = useState(false);
  const nickEditInputRef = useRef<HTMLInputElement>(null);
  const referralEditInputRef = useRef<HTMLInputElement>(null);
  const referral = useRecoilValue(userReferral);

  const handleEditClick = () => {
    setIsEditClick(true);
  }

  const handleReferClick = () => {
    setIsReferClick(true);
  }

  const handleEditOkClick = async () => {
    await editNickName();
    setIsEditClick(false);
  }

  const handleReffClick = async () => {
    const referralResult = await editReferral();
    if(referralResult === false) openModal("추천인 등록 실패", "추천인 등록에 실패했어요.");
    else if(referralResult === true) openModal("추천인 등록 성공", "추천인 등록에 성공했어요.");
 
    setIsReferClick(false);
  }

  const editNickName = useRecoilCallback(({ set, snapshot }) => async () => {
    if(!nickEditInputRef.current) return;
    if(nickEditInputRef.current.value.trim() === "") {
      return; 
    }
    const queryResult = await snapshot.getPromise(editNicknameQuery(nickEditInputRef.current.value));
    console.log("nick", queryResult)
    if(!queryResult) {
      return false;
    } 
    set(userNickname, nickEditInputRef.current.value);
    return true;
  });

  const editReferral = useRecoilCallback(({ set, snapshot }) => async () => {
    if(!referralEditInputRef.current) return;
    if(referralEditInputRef.current.value.trim() === "") {
      return; 
    }
    const queryResult = await snapshot.getPromise(editReferralQuery(referralEditInputRef.current.value));
    console.log("refer", queryResult)
    if(!queryResult) {
      return false;
    } 
    set(userReferral, referralEditInputRef.current.value);
    set(userAmount, (curr => curr + 1000));
    return true;
  });

  const openModal = (title: string, message: string) => {
    setTitle(title);
    setMessage(message);
    setIsOpen(true);
  }

  const handleModalClick = () => {
    setIsOpen(false);
  }

  return <EditInfoLayout>
    {isOpen && (
      <ModalAlert
        title={title}
        message={message}
        onConfirm={handleModalClick}
      />
    )}
    {isEditClick ?
    <div className='open-edit-wrap'>
      <div>
        <ThinButton color='rgb(250, 250, 250)' onClick={handleEditOkClick}>OK</ThinButton>
      </div>
      <div>
        <div className='nickname-edit-wrap'>        
          <label htmlFor="nickname-edit-input" />
          <ThinInput id="nickname-edit-input" placeholder="NEW NICKNAME" ref={nickEditInputRef}/>
        </div>
      </div>      
    </div>
    : !isReferClick && <ThinButton color='rgb(250, 250, 250)' onClick={handleEditClick}>EDIT</ThinButton>    
    }

    {(!referral || referral === "") && (isReferClick ? 
    <div className='open-edit-wrap'>
      <div>
        <ThinButton color='rgb(250, 250, 250)' onClick={handleReffClick}>OK</ThinButton>
      </div>
      <div>
          <div className='referral-edit-wrap'>
            <label htmlFor="referral-edit-input" />
            <ThinInput id="referral-edit-input" placeholder="REFERRAL ADDR" ref={referralEditInputRef}/>
          </div>
      </div>      
    </div>
    : !isEditClick && <ThinButton color='rgb(250, 250, 250)' onClick={handleReferClick}>REFERRAL</ThinButton>    
    )}       
  </EditInfoLayout>
}

export default EditInfo;

const EditInfoLayout = styled.div`
  display: inline-flex;
  & #nickname-edit-input {
    //padding: 10px;
  }

  & .open-edit-wrap {
    display: grid;
    grid-template-columns: auto 1fr;
  }

  & .referral-edit-wrap {
    //margin-top: 10px;
  }
`