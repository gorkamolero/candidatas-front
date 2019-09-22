const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');
moment.locale('es');

admin.initializeApp();

// Cálculo rápido de edad mediante moment
const getAgeFromDateOfBirth = (fecha) => Math.abs(fecha.diff(moment(), 'years'))

// Nuestra función
exports.newCandidateToDB = functions.https.onCall(
  async (candidate) => {
    const { nombre, email, codigoPostal, fechaDeNacimiento } = candidate;
    // Así manejo la fecha devuelta de manera extraña por Google Forms
    const fechaConFormato = moment(fechaDeNacimiento, 'DD/MM/YYYY"');

    // Creamos la referencia para luego pedirla de nuevo
    let newDoc = await admin.firestore().collection('candidatas').doc()

    // Set the data
    await newDoc.set({
      nombre,
      edad: getAgeFromDateOfBirth(fechaConFormato),
      email,
      codigoPostal,
      fechaDeNacimiento
    })

    // Comprobamos el nuevo candidato
    const newCandidate = await newDoc.get()

    // Aquí manejaríamos errores
    // ...

    // Devolvemos JSON estructurado
    return {
      success: true,
      data: newCandidate.data()
    }
  }
);
