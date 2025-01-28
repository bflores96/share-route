import { useState, useEffect } from "react";
import "./Forum.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { auth, googleProvider } from "/src/firebaseConfig.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getAuth, signInWithPopup, onAuthStateChanged } from "firebase/auth";

const db = getFirestore();
const COMMENTS_PER_PAGE = 5;

const Forum = () => {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(""); // Solo se usará para almacenar photoURL
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [replyTo, setReplyTo] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [showReplies, setShowReplies] = useState({});
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Cargar mensajes al inicio
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "forumMessages"));
        console.log("Documentos cargados:", querySnapshot.docs);
        const forumMessages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          replies: doc.data().replies || [],
        }));
        console.log("Mensajes del foro:", forumMessages);
        setMessages(forumMessages);
      } catch (error) {
        console.error("Error al cargar mensajes:", error);
      }
    };
    fetchMessages();
  }, []); // Cambié esto para que solo se ejecute una vez al cargar

  // Monitorear estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setName(currentUser.displayName || "Usuario Anónimo");
        setAvatar(currentUser.photoURL || ""); // photoURL del usuario autenticado
      }
    });
    return () => unsubscribe();
  }, []); // Cambié esto para que solo se ejecute una vez al montar el componente

  // Iniciar sesión con Google
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user);
      setName(user.displayName || "Usuario Anónimo");
      setAvatar(user.photoURL || ""); // photoURL
    } catch (error) {
      setError("Error al iniciar sesión con Google: " + error.message);
    }
  };

  // Publicar un nuevo mensaje
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || message.trim() === "") {
      alert("Por favor, introduce un mensaje válido.");
      return;
    }

    const newMessage = {
      name,
      avatar, // photoURL del usuario
      message,
      timestamp: new Date().toLocaleString(),
      replies: [],
    };

    try {
      const docRef = await addDoc(collection(db, "forumMessages"), newMessage);
      setMessages((prevMessages) => [
        { id: docRef.id, ...newMessage },
        ...prevMessages,
      ]);
    } catch (error) {
      console.error("Error al agregar el mensaje: ", error);
    }

    setMessage("");
    setShowForm(false);
    setCurrentPage(1);
  };

  // Publicar respuesta
  const handleReplySubmit = async (e, parentId) => {
    e.preventDefault();
    if (!user || replyMessage.trim() === "") {
      alert("Por favor, introduce una respuesta válida.");
      return;
    }

    const newReply = {
      name,
      avatar, // photoURL del usuario
      message: replyMessage,
      timestamp: new Date().toLocaleString(),
    };

    try {
      const messageRef = doc(db, "forumMessages", parentId);
      await updateDoc(messageRef, {
        replies: [
          ...messages.find((msg) => msg.id === parentId).replies,
          newReply,
        ],
      });

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === parentId
            ? { ...msg, replies: [...msg.replies, newReply] }
            : msg
        )
      );
    } catch (error) {
      console.error("Error al agregar la respuesta: ", error);
    }

    setReplyTo(null);
    setReplyMessage("");
  };

  // Paginación
  const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
  const currentMessages = messages.slice(
    startIndex,
    startIndex + COMMENTS_PER_PAGE
  );

  const totalPages = Math.ceil(messages.length / COMMENTS_PER_PAGE);

  return (
    <div className="forum-container">
      <div className="forum-header">
        <h1>Foro</h1>
        <div className="login-form">
          {/* Mensaje principal: Un espacio, siempre visible */}
          <p className="forum-subtitle">
            Un espacio para intercambiar ideas y aprender juntos{" "}
            <FontAwesomeIcon icon={faUserGroup} className="forum-icon" />
          </p>

          {/* Mensaje de inicio de sesión: Solo si el usuario no está autenticado */}
          {!user && (
            <>
              <h3>Inicia sesión para dejar un comentario</h3>
              <button onClick={handleGoogleLogin}>
                Iniciar sesión con Google
              </button>
            </>
          )}

          {/* Mensaje de error si existe */}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>

      {/* Mostrar el formulario para comentarios si el usuario está autenticado y ha hecho clic en "Dejar un comentario" */}
      {user && showForm && (
        <form className="forum-form" onSubmit={handleSubmit}>
          <textarea
            placeholder="Escribe tu mensaje aquí..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div className="button-container">
            <button type="submit">Publicar</button>
            <button type="button" onClick={() => setShowForm(false)}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Mostrar botón para dejar un comentario si el usuario está autenticado pero no ha abierto el formulario */}
      {user && !showForm && (
        <button
          className="forum-toggle-button"
          onClick={() => setShowForm(true)}
        >
          Dejar un comentario
        </button>
      )}
      {/* Mostrar mensajes */}
      <div className="forum-messages">
        {currentMessages.map((msg) => (
          <div key={msg.id} className="forum-message">
            <div className="forum-message-header">
              <img src={msg.avatar} alt="Avatar" className="forum-avatar" />
              <div>
                <h3>{msg.name}</h3>
                <small>{msg.timestamp}</small>
              </div>
            </div>
            <p className="forum-message-content">{msg.message}</p>

            {/* Mostrar botón solo si hay respuestas */}
            {msg.replies.length > 0 && (
              <button
                className="reply-toggle-button"
                onClick={() =>
                  setShowReplies((prev) => ({
                    ...prev,
                    [msg.id]: !prev[msg.id],
                  }))
                }
              >
                {showReplies[msg.id]
                  ? "Ocultar respuestas"
                  : `Ver respuestas (${msg.replies.length})`}
              </button>
            )}

            {/* Mostrar respuestas */}
            {showReplies[msg.id] && (
              <div className="forum-replies">
                {msg.replies.map((reply, index) => (
                  <div key={index} className="forum-reply">
                    <div className="forum-message-header">
                      <img
                        src={reply.avatar}
                        alt="Avatar"
                        className="forum-avatar"
                      />
                      <div>
                        <h4>{reply.name}</h4>
                        <small>{reply.timestamp}</small>
                      </div>
                    </div>
                    <p className="forum-message-content">{reply.message}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Formulario para responder */}
            {user && replyTo === msg.id && (
              <form
                className="forum-reply-form"
                onSubmit={(e) => handleReplySubmit(e, msg.id)}
              >
                <textarea
                  placeholder="Escribe tu respuesta aquí..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                ></textarea>
                <div className="button-container">
                  <button type="submit">Responder</button>
                  <button type="button" onClick={() => setReplyTo(null)}>
                    Cancelar
                  </button>
                </div>
              </form>
            )}
            {!replyTo && user && (
              <button
                onClick={() => setReplyTo(msg.id)}
                className="forum-reply-button"
              >
                Responder
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Forum;
