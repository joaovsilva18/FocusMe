"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";

export default function Telaconfig() {
  const {
    usuario: currentUser,
    atualizarNome,
    atualizarSenha,
  } = useAuth();

  const [avatarUrl, setAvatarUrl] = useState("");
  const [userName, setUserName] = useState("");

  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [newName, setNewName] = useState("");
  const [confirmName, setConfirmName] = useState("");
  const [nameError, setNameError] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passError, setPassError] = useState("");

  const nameFirstRef = useRef(null);
  const passFirstRef = useRef(null);

  useEffect(() => {
    if (currentUser) {
      setUserName(currentUser.nome);
      setAvatarUrl(currentUser.avatar);
    }
  }, [currentUser]);

  function salvarNome() {
    if (!newName || !confirmName) {
      setNameError("Preencha os dois campos.");
      return;
    }

    if (newName !== confirmName) {
      setNameError("Os nomes não coincidem.");
      return;
    }

    atualizarNome(currentUser.id, newName);

    setUserName(newName);
    setNewName("");
    setConfirmName("");
    setNameError("");
    setIsNameModalOpen(false);
  }

  function salvarSenha() {
    if (!newPassword || !confirmPassword) {
      setPassError("Preencha os dois campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPassError("As senhas não coincidem.");
      return;
    }

    atualizarSenha(currentUser.id, newPassword);

    setNewPassword("");
    setConfirmPassword("");
    setPassError("");
    setIsPasswordModalOpen(false);
  }

  if (!currentUser) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white text-2xl bg-[#7c3aed]">
        Você não está logado.
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="bg-[#7c3aed] min-h-screen pt-20 px-6 flex justify-center">
        <div className="bg-white w-[95%] max-w-4xl mt-3 rounded-3xl shadow-xl p-8 sm:p-28 relative mx-auto">

          {/* BOTÃO VOLTAR */}
          <Link href="./" className="absolute left-8 top-8">
            <svg
              width="30"
              height="30"
              fill="none"
              stroke="#7c3aed"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 22L10 14L18 6" />
            </svg>
          </Link>

          {/* AVATAR */}
          <div className="flex flex-col items-center -mt-10 sm:-mt-12 mb-10 sm:mb-12">
            <Image
              src={avatarUrl}
              alt="avatar"
              width={120}
              height={120}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full ring-8 ring-[#7c3aed] object-cover"
            />

            <Link href="/Telaconfig/Avatares">
              <Button className="mt-6 bg-[#7c3aed] hover:bg-purple-800 px-8 py-2 rounded-full text-white">
                Alterar
              </Button>
            </Link>
          </div>

          {/* ALTERAR NOME */}
          <div className="flex justify-between items-center bg-gray-200 px-6 py-4 rounded-full mb-4">
            <p>
              Alterar nome de usuário <br />
              <span className="font-semibold">{userName}</span>
            </p>

            <Button
              onClick={() => setIsNameModalOpen(true)}
              className="bg-[#7c3aed] hover:bg-purple-800 rounded-full"
            >
              Alterar
            </Button>
          </div>

          {/* ALTERAR SENHA */}
          <div className="flex justify-between items-center bg-gray-200 px-6 py-4 rounded-full">
            <p>
              Alterar senha <br /> ************
            </p>

            <Button
              onClick={() => setIsPasswordModalOpen(true)}
              className="bg-[#7c3aed] hover:bg-purple-800 rounded-full"
            >
              Alterar
            </Button>
          </div>

          {/* MODAL NOME */}
          {isNameModalOpen && (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-2xl w-[90%] max-w-lg shadow-xl">
                <h2 className="text-xl font-semibold mb-6">
                  Alterar nome de usuário
                </h2>

                <Label>Novo nome</Label>
                <Input
                  ref={nameFirstRef}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="rounded-full mb-4 bg-gray-300"
                />

                <Label>Confirmar novo nome</Label>
                <Input
                  value={confirmName}
                  onChange={(e) => setConfirmName(e.target.value)}
                  className="rounded-full mb-4 bg-gray-300"
                />

                {nameError && (
                  <p className="text-red-500 text-sm">{nameError}</p>
                )}

                <div className="flex justify-end gap-4 mt-6">
                  <Button variant="ghost" onClick={() => setIsNameModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button
                    className="bg-[#7c3aed] hover:bg-purple-800"
                    onClick={salvarNome}
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* MODAL SENHA */}
          {isPasswordModalOpen && (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-2xl w-[90%] max-w-lg shadow-xl">
                <h2 className="text-xl font-semibold mb-6">
                  Alterar senha
                </h2>

                <Label>Nova senha</Label>
                <Input
                  ref={passFirstRef}
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="rounded-full mb-4 bg-gray-300"
                />

                <Label>Confirmar nova senha</Label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="rounded-full mb-4 bg-gray-300"
                />

                {passError && (
                  <p className="text-red-500 text-sm">{passError}</p>
                )}

                <div className="flex justify-end gap-4 mt-6">
                  <Button variant="ghost" onClick={() => setIsPasswordModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button
                    className="bg-[#7c3aed] hover:bg-purple-800"
                    onClick={salvarSenha}
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
