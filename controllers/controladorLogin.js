

function controladorWebLogin(req, res){
    
    if (req.session?.user){
        return res.redirect('/formulario')
    }else{
        res.render('login')
    }

}

function controladorLoginUsuario(req, res){
    if (req.session.user){
        res.json({usuario: req.session.user})
    } else {
        res.redirect('/')
    }
}

function controladorPostUsuario(req, res){

    req.session.user = req.body.usuario

    if (!req.session?.user){
        return res.redirect('/')
    }else{
        return res.redirect('/formulario')
    }

}

function controladorLogout(req, res){
  res.render('logout', {usuario: req.session.user})
  req.session.destroy();
}



export {controladorWebLogin, 
    controladorLoginUsuario,
    controladorPostUsuario,
    controladorLogout };