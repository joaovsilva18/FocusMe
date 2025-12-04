"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Telaconfig() {
  const [userName, setUserName] = useState("");
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [newName, setNewName] = useState("");
  const [confirmName, setConfirmName] = useState("");
  const [nameError, setNameError] = useState("");
  const nameFirstRef = useRef(null);

 
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passError, setPassError] = useState("");
  const passFirstRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("nomeAtual");
    setUserName(stored ?? "Bruno");
  }, []);


  function openNameModal() {
    setNewName("");
    setConfirmName("");
    setNameError("");
    setIsNameModalOpen(true);
  }
  function closeNameModal() {
    setIsNameModalOpen(false);
    setNameError("");
  }
  useEffect(() => {
    if (isNameModalOpen) {
      setTimeout(() => {
        if (nameFirstRef.current && typeof nameFirstRef.current.focus === "function") {
          nameFirstRef.current.focus();
        }
      }, 50);
      const onKey = (e) => {
        if (e.key === "Escape") closeNameModal();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [isNameModalOpen]);

  function handleSaveName() {
    setNameError("");
    const trimmedNew = newName.trim();
    const trimmedConfirm = confirmName.trim();

    if (!trimmedNew) {
      setNameError("O nome não pode ficar vazio.");
      return;
    }
    if (trimmedNew !== trimmedConfirm) {
      setNameError("Os nomes não conferem. Verifique e tente novamente.");
      return;
    }

    try {
      localStorage.setItem("nomeAtual", trimmedNew);
      setUserName(trimmedNew);
      closeNameModal();
    } catch (e) {
      setNameError("Não foi possível salvar o nome. Tente novamente.");
      console.error(e);
    }
  }

 
  function openPasswordModal() {
    setNewPassword("");
    setConfirmPassword("");
    setPassError("");
    setIsPasswordModalOpen(true);
  }
  function closePasswordModal() {
    setIsPasswordModalOpen(false);
    setPassError("");
  }
  useEffect(() => {
    if (isPasswordModalOpen) {
      setTimeout(() => {
        if (passFirstRef.current && typeof passFirstRef.current.focus === "function") {
          passFirstRef.current.focus();
        }
      }, 50);
      const onKey = (e) => {
        if (e.key === "Escape") closePasswordModal();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [isPasswordModalOpen]);

  function handleSavePassword() {
    setPassError("");
    const trimmedNew = newPassword.trim();
    const trimmedConfirm = confirmPassword.trim();

    if (!trimmedNew) {
      setPassError("A senha não pode ficar vazia.");
      return;
    }
    if (trimmedNew.length < 6) {
      setPassError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (trimmedNew !== trimmedConfirm) {
      setPassError("As senhas não conferem. Verifique e tente novamente.");
      return;
    }

    try {
     
      localStorage.setItem("senhaAtual", trimmedNew);
      closePasswordModal();
    } catch (e) {
      setPassError("Não foi possível salvar a senha. Tente novamente.");
      console.error(e);
    }
  }


  const maskedPassword = "************";

  return (
    <>
      <Navbar />

      <div className="bg-[#7c3aed] min-h-screen pt-20 px-6 flex justify-center items-start">
        <div className="bg-white w-[95%] max-w-4xl mt-3 rounded-3xl shadow-xl p-28 relative mx-auto">
          <Link href="./" className="w-full block">
            <button className="absolute left-8 top-8 ">
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
            </button>
          </Link>

          <div className="flex flex-col items-center -mt-12 mb-12">
            <Image
              src="/images/lele.png"
              alt="avatar"
              className="w-32 h-32 rounded-full ring-8 ring-[#7c3aed]"
              width={120}
              height={120}
            />
            <Link href="/Telaconfig/Avatares">
              <Button className="mt-6 bg-[#7c3aed] hover:bg-purple-800 px-8 py-2 rounded-full shadow text-white">
                Alterar
              </Button>
            </Link>
          </div>

          <div className="bg-gray-300 rounded-full px-6 py-4 flex items-center justify-between mb-8">
            <div>
              <Label className="font-semibold text-gray-800 text-[18px]">
                Alterar nome de usuário
              </Label>
              <p className="text-sm text-gray-700 mt-0 text-[20px]">{userName || "Bruno"}</p>
            </div>

            <Button
              onClick={openNameModal}
              className="bg-[#7c3aed] text-white hover:bg-purple-800 px-6 py-2 rounded-full shadow"
            >
              Alterar
            </Button>
          </div>

          <div className="bg-gray-300 rounded-full px-6 py-4 flex items-center justify-between">
            <div>
              <Label className="font-semibold text-gray-800 text-[18px]">
                Alterar Senha
              </Label>
              <p className="text-sm text-gray-700 mt-1 text-[17px]">{maskedPassword}</p>
            </div>
            <Button
              onClick={openPasswordModal}
              className="bg-[#7c3aed] text-white hover:bg-purple-800 px-6 py-2 rounded-full shadow"
            >
              Alterar
            </Button>
          </div>

         
          {isNameModalOpen && (
            <div
              aria-modal="true"
              role="dialog"
              className="fixed inset-0 z-50 flex items-center justify-center"
            >
              <div
                className="absolute inset-0 bg-black/50"
                onClick={closeNameModal}
                aria-hidden="true"
              />

              <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-lg p-6 mx-4">
                <h2 className="text-lg font-semibold mb-4">Alterar nome de usuário</h2>

                <div className="space-y-4">
                  <div>
                    <Label className="block text-sm mb-1">Novo nome</Label>
                    <Input
                      ref={nameFirstRef}
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Digite o novo nome"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label className="block text-sm mb-1">Confirmar novo nome</Label>
                    <Input
                      value={confirmName}
                      onChange={(e) => setConfirmName(e.target.value)}
                      placeholder="Digite novamente para confirmar"
                      className="w-full"
                    />
                  </div>

                  {nameError && <p className="text-sm text-red-600">{nameError}</p>}
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <Button
                    onClick={closeNameModal}
                    className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded-full"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleSaveName}
                    className="bg-[#7c3aed] text-white hover:bg-purple-800 px-4 py-2 rounded-full"
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          )}

       
          {isPasswordModalOpen && (
            <div
              aria-modal="true"
              role="dialog"
              className="fixed inset-0 z-50 flex items-center justify-center"
            >
              <div
                className="absolute inset-0 bg-black/50"
                onClick={closePasswordModal}
                aria-hidden="true"
              />

              <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-lg p-6 mx-4">
                <h2 className="text-lg font-semibold mb-4">Alterar senha</h2>

                <div className="space-y-4">
                  <div>
                    <Label className="block text-sm mb-1">Nova senha</Label>
                    <Input
                      ref={passFirstRef}
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Digite a nova senha"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label className="block text-sm mb-1">Confirmar nova senha</Label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Digite novamente para confirmar"
                      className="w-full"
                    />
                  </div>

                  {passError && <p className="text-sm text-red-600">{passError}</p>}
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <Button
                    onClick={closePasswordModal}
                    className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded-full"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleSavePassword}
                    className="bg-[#7c3aed] text-white hover:bg-purple-800 px-4 py-2 rounded-full"
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