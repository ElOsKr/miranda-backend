/* eslint-disable node/no-process-env */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import passport from 'passport';
import {Strategy as localStrategy} from 'passport-local';
import { UserModel } from '@src/model/model';
import { Strategy as JWTstrategy} from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'mail',
            passwordField: 'password',
        },
        async (email: string, password: string, done) => {
            try{
                const user = await UserModel.findOne({ email });

                if(!user) {
                    return done(null, false, {message: 'User not found'});
                }

                const validate = await user.isValidPassword(password);

                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                  }
          
                  return done(null, user, { message: 'Logged in Successfully' });
            }catch ( error ){
                done(error);
            }
        },
    ),
);

passport.use(
    new JWTstrategy(
      {
        secretOrKey: process.env.SECRET_KEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      },
    ),
  );