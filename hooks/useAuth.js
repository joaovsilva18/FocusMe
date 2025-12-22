"use client";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const USERS = [
  {
    id: 1,
    nome: "Marquinhos",
    xp: 190,
    email: "marquinhos@email.com",
    senha: "123456",
    avatar: "/images/marquinhos.png",
    pomodoros: 27,
  },
  {
    id: 2,
    nome: "Amanda",
    xp: 76,
    email: "amanda@email.com",
    senha: "123",
    avatar: "/images/amanda.png",
    pomodoros: 0,
  },
  {
    id: 3,
    nome: "Andressa",
    xp: 82,
    email: "andressa@email.com",
    senha: "1233456",
    avatar: "/images/andressa.png",
    pomodoros: 12,
  },
  {
    id: 4,
    nome: "Ariana",
    xp: 109,
    email: "ariana@email.com",
    senha: "123",
    avatar: "/images/Ariana.png",
    pomodoros: 0,
  },
  {
    id: 5,
    nome: "Bruno",
    xp: 13,
    email: "bruno@email.com",
    senha: "123",
    avatar: "/images/bruno.png",
    pomodoros: 0,
  },
  {
    id: 6,
    nome: "Phellipe",
    xp: 63,
    email: "phellipe@email.com",
    senha: "123",
    avatar: "/images/phellipe2.png",
    pomodoros: 0,
  },
  {
    id: 7,
    nome: "Lele",
    xp: 77,
    email: "lele@email.com",
    senha: "123",
    avatar: "/images/lele.png",
    pomodoros: 0,
  },
  {
    id: 8,
    nome: "Marcela",
    xp: 74,
    email: "marcela@email.com",
    senha: "123",
    avatar: "/images/marcela.png",
    pomodoros: 0,
  },
  {
    id: 9,
    nome: "Vitinho",
    xp: 97,
    email: "vitinho@email.com",
    senha: "123456",
    avatar: "/images/Vitinho.png",
    pomodoros: 17,
  },
  {
    id: 10,
    nome: "Carlos",
    xp: 50,
    email: "carlos@email.com",
    senha: "123",
    avatar: "/images/carlos.png",
    pomodoros: 0,
  },
];

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [usuarios, setUsuarios] = useState(USERS);

  const login = (email, senha) => {
    const encontrado = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (encontrado) {
      setUsuario(encontrado);
      return { ok: true };
    }

    return { ok: false, msg: "Email ou senha incorretos!" };
  };

  const logout = () => setUsuario(null);

  const adicionarXp = (id, valor) => {
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, xp: u.xp + valor } : u
      )
    );

    if (usuario?.id === id) {
      setUsuario((prev) => ({ ...prev, xp: prev.xp + valor }));
    }
  };

  const atualizarNome = (id, novoNome) => {
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, nome: novoNome } : u
      )
    );

    if (usuario?.id === id) {
      setUsuario((prev) => ({ ...prev, nome: novoNome }));
    }
  };

  const atualizarSenha = (id, novaSenha) => {
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, senha: novaSenha } : u
      )
    );

    if (usuario?.id === id) {
      setUsuario((prev) => ({ ...prev, senha: novaSenha }));
    }
  };

  const atualizarAvatar = (id, novoAvatar) => {
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, avatar: novoAvatar } : u
      )
    );

    if (usuario?.id === id) {
      setUsuario((prev) => ({ ...prev, avatar: novoAvatar }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        usuarios,
        login,
        logout,
        adicionarXp,
        atualizarNome,
        atualizarSenha,
        atualizarAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}