"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const avatars = [
  "/images/amanda.png",
  "/images/andressa.png",
  "/images/Ariana.png",
  "/images/bruno.png",
  "/images/marcela.png",
  "/images/marquinhos.png",
  "/images/phellipe2.png",
  "/images/vitinho.png",
  "/images/carlos.png",
  "/images/lele.png",
  "/images/foto.png", // slot de upload
];

export default function AlterarAvatar() {
  const { usuario: currentUser, atualizarAvatar } = useAuth();

  const [selected, setSelected] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const fileInputRef = useRef(null);
  const router = useRouter();

  const uploadSlotIndex = avatars.length - 1;

  function handleSelect(index) {
    if (index === uploadSlotIndex) {
      fileInputRef.current?.click();
      return;
    }
    setSelected(index);
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    const url = URL.createObjectURL(file);
    setUploadedUrl(url);
    setUploadedFile(file);
    setSelected(uploadSlotIndex);

    e.target.value = "";
  }

  function handleConfirm() {
    if (selected === null || !currentUser) return;

    // Avatar padrão
    if (selected !== uploadSlotIndex) {
      atualizarAvatar(currentUser.id, avatars[selected]);
      router.push("/Telaconfig");
      return;
    }

    // Upload (base64)
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        atualizarAvatar(currentUser.id, reader.result);
        router.push("/Telaconfig");
      };
      reader.readAsDataURL(uploadedFile);
    }
  }

  if (!currentUser) {
    return (
      <div className="bg-[#7c3aed] min-h-screen flex items-center justify-center text-white text-xl">
        Você não está logado.
      </div>
    );
  }

  const gridItems = [...avatars, "confirm-slot"];

  return (
    <div className="bg-[#7c3aed] min-h-screen flex flex-col items-center pt-6 pb-6 px-4">
      <div className="w-full max-w-5xl flex flex-col items-center mb-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-1 text-center">
          Alterar Avatar
        </h1>
        <span className="text-white text-sm sm:text-lg text-center">
          Atualize suas informações de perfil.
        </span>
      </div>

      <div className="relative bg-white w-[95vw] max-w-5xl rounded-2xl p-6 sm:p-8 pb-6">
        <Link
          href="/Telaconfig"
          className="absolute left-6 sm:left-8 top-6 text-purple-600 text-3xl sm:text-4xl hover:text-purple-800"
          aria-label="Voltar"
        >
          &lt;
        </Link>

        {/* input oculto */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="mx-auto grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-6 justify-items-center">
          {gridItems.map((item, idx) => {
            if (item === "confirm-slot") {
              return (
                <div
                  key="confirm-slot"
                  className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center"
                >
                  <Button
                    onClick={handleConfirm}
                    disabled={selected === null}
                    className="px-6 py-2 rounded-full bg-[#caa7f1] hover:bg-purple-800 text-white font-semibold disabled:opacity-50"
                  >
                    Confirmar
                  </Button>
                </div>
              );
            }

            if (idx === uploadSlotIndex) {
              return (
                <button
                  key={`upload-${idx}`}
                  onClick={() => handleSelect(idx)}
                  type="button"
                  className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 transition
                    ${selected === idx ? "border-[#7c3aed] ring-2 ring-purple-200" : "border-transparent"}
                  `}
                >
                  <div className="w-[82%] h-[82%] rounded-full overflow-hidden">
                    {uploadedUrl ? (
                      <img
                        src={uploadedUrl}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <Image
                        src={item}
                        width={200}
                        height={200}
                        alt="Adicionar foto"
                        className="rounded-full object-cover w-full h-full"
                      />
                    )}
                  </div>
                </button>
              );
            }

            return (
              <button
                key={item + idx}
                onClick={() => handleSelect(idx)}
                type="button"
                className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 transition
                  ${selected === idx ? "border-[#7c3aed] ring-2 ring-purple-200" : "border-transparent"}
                `}
              >
                <div className="w-[82%] h-[82%] rounded-full overflow-hidden">
                  <Image
                    src={item}
                    width={200}
                    height={200}
                    alt="Avatar"
                    className="rounded-full object-cover w-full h-full"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
