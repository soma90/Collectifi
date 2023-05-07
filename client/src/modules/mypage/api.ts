import axios from "axios";
import { SERVERURL, ISCONNECT } from "../atom";
import { userInfo  as userInfoData } from "../../data/mypage";

export const userInfo = async (id: number) => {
  //console.log("userInfo", id)
  if(!ISCONNECT) return userInfoData;
  const options = {
    method: 'GET',
    url: `${SERVERURL}/user/${id}`,
    headers: {accept: 'application/json'},
    withCredentials: true,    
  };

  try {
    const data = await axios(options);
    return data;
  } catch (err) {
    console.log("userInfo err: ",err);
    return null;
  }
  
  // const data = await axios(options);
  // return data;
}

export const editNickname = async (nickname: string) => {
  //if(!ISCONNECT) return sellCardData;
  const options = {
    method: 'POST',
    url: `${SERVERURL}/user/edit`,
    headers: {accept: 'application/json'},
    withCredentials: true,
    data: {
      "nickname" : nickname,
    }
  };

  try {
    const data = await axios(options);
    return data;
  } catch (err) {
    console.log("editNickname err: ",err);
    return null;
  }
}

export const editReferral = async (address: string) => {
  //if(!ISCONNECT) return sellCardData;
  const options = {
    method: 'POST',
    url: `${SERVERURL}/user/referral`,
    headers: {accept: 'application/json'},
    withCredentials: true,
    data: {
      "address" : address,
    }
  };

  try {
    const data = await axios(options);
    return data;
  } catch (err) {
    console.log("editReferral err: ",err);
    return null;
  }
}

export const galleryInfo = async (id: number) => {
  //console.log("userInfo", id)
  const options = {
    method: 'GET',
    url: `${SERVERURL}/gallery/mypage/${id}`,
    headers: {accept: 'application/json'},
    withCredentials: true,    
  };

  try {
    const data = await axios(options);
    return data;
  } catch (err) {
    console.log("galleryInfo err: ",err);
    return null;
  }
}

export const withdraw = async (id: number) => {
  //if(!ISCONNECT) return sellCardData;
  const options = {
    method: 'GET',
    url: `${SERVERURL}/gallery/withdraw/${id}/`,
    headers: {accept: 'application/json'},
    withCredentials: true,    
  };

  try {
    const data = await axios(options);
    return data;
  } catch (err) {
    console.log("withdraw err: ",err);
    return null;
  }
}

export const updateWithdraw = async (gallId: number, nftId: number) => {
  //if(!ISCONNECT) return sellCardData;
  const options = {
    method: 'POST',
    url: `${SERVERURL}/gallery/withdraw`,
    headers: {accept: 'application/json'},
    withCredentials: true,
    data: {
      gallery_id: gallId,
      nft_id: nftId,
    }
  };

  try {
    const data = await axios(options);
    return data;
  } catch (err) {
    console.log("updateWithdraw err: ",err);
    return null;
  }
}