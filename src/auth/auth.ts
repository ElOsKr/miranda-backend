import passport from 'passport';
import {Strategy as localStrategy} from 'passport-local';
import { Strategy as JWTstrategy} from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email: string, password: string, done) => {
            try{
                if(email !== 'admin@admin.com') {
                  return done(null, false, {message: 'Wrong email'});
                }
                if (password !== 'admin') {
                  return done(null, false, { message: 'Wrong Password' });
                }

                return done(null, {email: 'admin@admin.com', password: 'admin'}, { message: 'Logged in Successfully' });               
            }catch ( error ){
                done(error);
            }
        },
    ),
);

passport.use(
    new JWTstrategy(
      {
        secretOrKey: 'SECRET_KEY',
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