import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Jwt } from 'jsonwebtoken';
import { User } from './models/user';
 
//session
export default function login(servidor) {

    servidor.use(session({
        /* ----------------------------------------------------- */
        /*           Persistencia por redis database             */
        /* ----------------------------------------------------- */
        store: MongoStore.create({
            //En Atlas connect App :  Make sure to change the node version to 2.2.12:
            mongoUrl: `mongodb+srv://root:12345@cluster0.mqhwyzp.mongodb.net/test`,
        }),
        /* ----------------------------------------------------- */

        secret: 'shhhhhhhhhhhhhhhhhhhhh',
        ttl: 600,
        cookie:{
            httpOnly:false,
            secure:false,
            maxAge:60000
        },
        rolling:true,
        resave: true,
        saveUninitialized: false
    }))

    passport.use(
        "login",
        new LocalStrategy(
            {
                passReqToCallback: true,
            },
            (req, username, password, done) => {
              User.findOne({ username: username }, (err, user) => {
                   if (err) return done(err);
                    if (!user) {
                        console.log("User Not Found with username " + username);
                        return done(null, false);
                    }
                    console.log(validatePassword(user, password))

                    if (!validatePassword(user, password)) {
                        console.log("Invalid Password");
                        return done(null, false);
                    }
                    return done(null, user);
                });
            }
        )
    );

     
	  const validatePassword = (user, password) => {

		const  objetoOriginal = jwt.verify(user.password, SALT)

		   if(password === objetoOriginal.password)
		     return true;
		   else
		     return null;
	  };
	  
	  var createHash = function (password) {
		  const token = jwt.sign({password: password}, SALT);  //, { expiresIn: '24h' });
		  return token;
	  };


	  servidor.use(passport.initialize());
	  
	 //Sesiones
	  servidor.use(passport.session());
	  	  
	  passport.serializeUser((user, done) => {
		  done(null, user._id);
	  });
	  
	  passport.deserializeUser((id, done) => {
		  User.findById(id, function (err, user) {
			  done(err, user);
		  });
	  });
	  //Fin Sesiones
	  
      
}

