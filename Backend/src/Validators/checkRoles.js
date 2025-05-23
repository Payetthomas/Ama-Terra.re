export const checkRoles = (...requiredRoles) => {

    return (req, res, next) => {
    
        const user = req.app.locals.user;
        
        if (!user || !requiredRoles.some(role => user.roles.includes(role)) ) {
            res.status(403).json( {message: "Accès non autorisé !"} );
        };
        
        next();
    
    };
};
    