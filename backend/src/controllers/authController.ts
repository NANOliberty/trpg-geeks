import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';

export const register = async (req: Request, res: Response) => {
  try {
    const { realName, nickname, password } = req.body;

    // 닉네임 중복 체크
    const existingUser = await prisma.user.findUnique({
      where: { nickname }
    });

    if (existingUser) {
      return res.status(400).json({ message: '이미 사용 중인 닉네임입니다.' });
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const user = await prisma.user.create({
      data: {
        realName,
        nickname,
        password: hashedPassword
      }
    });

    res.status(201).json({
      message: '회원가입이 완료되었습니다.',
      user: {
        id: user.id,
        nickname: user.nickname
      }
    });
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { nickname, password } = req.body;

    // 사용자 찾기
    const user = await prisma.user.findUnique({
      where: { nickname }
    });

    if (!user) {
      return res.status(401).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    // 비밀번호 확인
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    res.json({
      message: '로그인 성공',
      token,
      user: {
        id: user.id,
        nickname: user.nickname
      }
    });
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};
