const User = require('../models/user');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const crypto = require('crypto');
const nodemailer = require("nodemailer");
const fs = require('fs');
const Rol = require('../models/rol');




module.exports = {



    async idActualizado(req, res, next) {
        try {
            const id = req.params.id;

            const data = await User.obtenerIdActualizado(id);
            console.log(`Usuarios: ${data}`);
            return res.status(201).json(data)

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({

                success: false,
                message: 'Error al obtener los usuarios por ID'
            })
        }
    },



    async Crear(req, res, next) {

        try {


            // const userData = JSON.parse(req.body.user);
            const datos = req.body;

            //const email = userData.email;
            // const telefono = userData.telefono;
            const correo = await User.ObtenerEmail(datos.email);
            const telef = await User.ObtenerTelefono(datos.phone);
            const cedula = await User.ObtenerCedula(datos.cedula);



            if (correo) {
                return res.status(401).json({
                    success: false,
                    message: 'El Correo ya Existe'
                });
            }
            if (telef) {
                return res.status(401).json({
                    success: false,
                    message: 'El telefono ya Existe'
                });
            }
            if (cedula) {
                return res.status(401).json({
                    success: false,
                    message: 'La cedula ya Existe'
                });
            }



            data = await User.CrearUsuarios(datos);



            await Rol.create(data.id, 1);

            return res.status(201).json({
                success: true,
                message: 'Registro exitoso, ahora Inicia Sesión',

            });


        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al registrar el  usuario',
                error: error
            })
        }



    },




    async login(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const myuser = await User.ObtenerEmail(email);

            if (!myuser) {
                return res.status(401).json({
                    success: false,
                    message: 'El correo no fue encontrado'
                });

            }
            if (User.isPasswordMatched(password, myuser.password)) {

                const token = jwt.sign({ id: myuser.id, email: myuser.email }, keys.secretOrKey, {
                    expiresIn: (240 * 6)
                });
                const data = {
                    id: myuser.id,
                    name: myuser.name,
                    email: myuser.email,
                    image: myuser.image,
                    telefono: myuser.telefono,
                    session_token: `JWT ${token}`,
                    roles: myuser.roles

                }

                await User.actualizarToken(myuser.id, `JWT ${token}`);


                return res.status(201).json({
                    success: true,
                    data: data,
                    message: 'El usuario fue authenticado'
                });
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'La contraseña es incorrecta',

                })
            }

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al momento de hacer login',
                error: error
            });
        }
    },

    async logout(req, res, next) {
        try {
            const id = req.body.id;
            await User.actualizarToken(id, null);
            return res.status(201).json({
                success: true,

                //message: console.log('La sesion se ha cerrado correctamente')
                message: 'La sesion se ha cerrado correctamente'
            });
            // console.log(`USUARIO ENVIADO AAA ${data}`);

        } catch (error) {
            return res.status(501).json({
                success: false,
                message: 'Error al momento de cerrar sessión',
                error: error
            });
        }
    },






}