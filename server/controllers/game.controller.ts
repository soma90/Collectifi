import express, {Request, Response, NextFunction} from 'express';
import Web3 from 'web3';
import {MyRequest} from '../@types/session';
import erc20abi from '../abi/erc20abi';
import soccerabi from '../abi/soccerabi';
import db from '../models';
const web3 = new Web3(`HTTP://127.0.0.1:${process.env.GANACHE_PORT}`);
const erc20Contract = new web3.eth.Contract(erc20abi, process.env.ERC20_CA);
const soccerContract = new web3.eth.Contract(soccerabi, process.env.SOCCER_CA);

export const game_fund_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    const {game, value} = req.body;
    const fromAddress = req.session.user?.address;
    console.log('======================', game, value, fromAddress);

    const approve = await erc20Contract.methods
      .approve(process.env.SOCCER_CA, value)
      .send({from: fromAddress, gas: 500000});
    console.log('===========approve===========', approve);
    const fund = await soccerContract.methods
      .fund(fromAddress, game, value)
      .send({from: process.env.SERVER_ADDRESS, gas: 500000});

    // db에서 token 뺏기
    const userId = req.session.user?.id;
    const user = await db.User.findOne({
      where: {
        id: userId,
      },
    });
    const takeToken = await user.decrement('token_amount', {by: value});

    console.log('=========fund=============', fund);
    // const transferFrom = await erc20Contract.methods
    //   .transferFrom(fromAddress, process.env.SERVER_ADDRESS, value)
    //   .send({from: process.env.SERVER_ADDRESS, gas: 500000});
    // console.log('=========transferFrom=============', transferFrom);
    return res.status(200).send({message: '성공'});
  } catch (e) {
    console.log(e);
  }
};

export const game_fund_get = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    const totalToken = await soccerContract.methods.totalToken().call();

    const winToken = await soccerContract.methods.winToken().call();
    const loseToken = await soccerContract.methods.loseToken().call();
    const drawToken = await soccerContract.methods.drawToken().call();

    const winDiainage = (totalToken / winToken).toFixed(2);
    const loseDiainage = (totalToken / loseToken).toFixed(2);
    const drawDiainage = (totalToken / drawToken).toFixed(2);

    return res.status(200).send({
      message: '성공',
      data: {
        winDiainage: winDiainage,
        loseDiainage: loseDiainage,
        drawDiainage: drawDiainage,
        winToken: winToken,
        loseToken: loseToken,
        drawToken: drawToken,
        totalToken,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const game_reward_post = async (req: MyRequest, res: Response, next: NextFunction) => {
  try {
    const {game} = req.body;
    const fromAddress = req.session.user?.address;
    let token = 0;
    console.log('======================', game, fromAddress);

    const totalToken = await soccerContract.methods.totalToken().call();

    if (game == 'win') {
      token = await soccerContract.methods.winToken().call();
    }
    if (game == 'lose') {
      token = await soccerContract.methods.loseToken().call();
    }
    if (game == 'draw') {
      token = await soccerContract.methods.drawToken().call();
    }

    const drainage = Math.floor(totalToken / token);

    const approve = await erc20Contract.methods
      .approve(process.env.SOCCER_CA, totalToken)
      .send({from: process.env.SERVER_ADDRESS, gas: 500000});

    const matchedReward = await soccerContract.methods
      .matchedReward(game, drainage)
      .send({from: process.env.SERVER_ADDRESS, gas: 500000});
    console.log('=======match====', matchedReward);
    return res.status(200).send({message: '성공'});
  } catch (e) {
    return res.status(400).send({message: '실패'});
  }
};
