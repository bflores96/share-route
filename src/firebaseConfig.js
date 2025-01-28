// Importar los módulos necesarios de Firebase
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import serviceKey from "../service-key.json";

// Inicializar Firebase
const app = initializeApp(serviceKey);

// Inicializar los servicios de Firebase
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Exportar los servicios
export { app, auth, db, googleProvider };
