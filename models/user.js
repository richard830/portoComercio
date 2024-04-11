const db = require('../config/config');
const crypto = require('crypto');
const storage = require('../utils/cloud_storage');



const IV_LENGTH = 16;
const ENCRYPTION_KEY = '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';

function encrypt(text) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}



function decrypt(text) {
    const [ivString, encryptedString] = text.split(':');
    const iv = Buffer.from(ivString, 'hex');
    const encryptedText = Buffer.from(encryptedString, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}







const User = {};



User.CrearUsuarios = (user) => {

    const mypassword = encrypt(user.password);
    user.password = mypassword;

    const sql = `INSERT INTO users
    (name, email, password, phone, cedula,  created_at)
    VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
    return db.oneOrNone(sql, [
        user.name,
        user.email,
        user.password,
        user.phone,
        user.cedula,
        new Date()

    ])
}






User.isPasswordMatched = (userPassword, hash) => {
    const comparisonEncryptedText = decrypt(hash);

    if (userPassword === comparisonEncryptedText) {
        return true;
    }
    return false;
}





User.ObtenerEmail = (email) => {
    const sql = `SELECT  u.id, u.name, u.email,  u.phone, u.cedula, 
                u.password, 
                u.session_token,
                json_agg(
                    json_build_object(
                      'id', r.id,
                    'name', r.name,
                    'image', r.image,
                    'route', r.route
                )) 
                AS roles FROM users AS u
                INNER JOIN user_has_roles AS uhr
                ON
                uhr.id_user = u.id
                INNER JOIN 
                roles AS r
                ON
                r.id = uhr.id_rol
                WHERE u.email = $1
                GROUP BY 
                u.id`;
    return db.oneOrNone(sql, email);
}

User.ObtenerTelefono = (telefono) => {
    const sql = `SELECT  u.id, u.name, u.email,  u.phone, u.cedula, 
                u.password, 
                u.session_token,
                json_agg(
                    json_build_object(
                      'id', r.id,
                    'name', r.name,
                    'image', r.image,
                    'route', r.route
                )) 
                AS roles FROM users AS u
                INNER JOIN user_has_roles AS uhr
                ON
                uhr.id_user = u.id
                INNER JOIN 
                roles AS r
                ON
                r.id = uhr.id_rol
                WHERE u.phone = $1
                GROUP BY 
                u.id`;
    return db.oneOrNone(sql, telefono);
}
User.ObtenerCedula = (telefono) => {
    const sql = `SELECT  u.id, u.name, u.email,  u.phone, u.cedula, 
                u.password, 
                u.session_token,
                json_agg(
                    json_build_object(
                      'id', r.id,
                    'name', r.name,
                    'image', r.image,
                    'route', r.route
                )) 
                AS roles FROM users AS u
                INNER JOIN user_has_roles AS uhr
                ON
                uhr.id_user = u.id
                INNER JOIN 
                roles AS r
                ON
                r.id = uhr.id_rol
                WHERE u.cedula = $1
                GROUP BY 
                u.id`;
    return db.oneOrNone(sql, telefono);
}



User.actualizarToken = (id, token) => {
    const sql = `UPDATE users SET 
    session_token = $2
  
     WHERE id = $1`;
    return db.none(sql, [
        id,
        token
    ])
}

User.obtenerIdActualizado = (id) => {
    const sql = `SELECT u.id, u.name, u.email,  
                u.password, 
                u.session_token,
                json_agg(
                    json_build_object(
                      'id', r.id,
                    'name', r.name,
                    'image', r.image,
                    'route', r.route
                )) 
                AS roles FROM users AS u
                INNER JOIN user_has_roles AS uhr
                ON
                uhr.id_user = u.id
                INNER JOIN 
                roles AS r
                ON
                r.id = uhr.id_rol
                WHERE u.id = $1
                GROUP BY 
                u.id`;
    return db.oneOrNone(sql, id);
}




User.ObtenerId = (id, callback) => {
    const sql = `SELECT id, name, email,
    password,
    session_token
    FROM users WHERE id = $1`;
    return db.oneOrNone(sql, id).then(user => { callback(null, user); })
}




module.exports = User;