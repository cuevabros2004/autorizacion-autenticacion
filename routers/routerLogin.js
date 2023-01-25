import { Router } from 'express';
import {controladorWebLogin} from '../controllers/controladorLogin.js'
import {controladorLoginUsuario} from '../controllers/controladorLogin.js'
import {controladorPostUsuario} from '../controllers/controladorLogin.js'
import {controladorLogout} from '../controllers/controladorLogin.js'

const routerLogin = Router()

routerLogin.get('/', controladorWebLogin)
routerLogin.get('/logout', controladorLogout)
routerLogin.get('/formulario/login', controladorLoginUsuario)
routerLogin.post('/formulario/login', controladorPostUsuario)

export  default routerLogin 

