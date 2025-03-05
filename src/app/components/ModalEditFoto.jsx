"use client";
import React, { useActionState, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@heroui/react";
import { Pencil } from "lucide-react";
import { editAvatarUser } from "../actions/user";
import { Form } from "react-hook-form";
import Swal from "sweetalert2";

const ModalEditFoto = ({ userId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    const previewUrl = URL.createObjectURL(e.target.files[0]);
    setImagePreview(previewUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedFile) {
      alert("Pilih gambar dulu!");
      return;
    }
  
  
    const formData = new FormData();
    formData.append("file", selectedFile);
    setLoading(true);
  
    try {
      const { message, error } = await editAvatarUser(userId, formData);
  console.log(error)
      if (message){
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: message,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      }
    } catch (err) {
     console.log(err)
      alert("Terjadi kesalahan saat upload avatar");
    }
  
    setLoading(false);
  };
  

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0]; // Ambil file pertama yang diunggah
  //   if (file) {
  //     new FormData().append("file", file);
  //     editAvatarUser(file);
  //     const previewUrl = URL.createObjectURL(file); // Buat URL sementara
  //     setImagePreview(previewUrl); // Simpan URL ke state
  //   }
  //   editAvatarUser(file);
  // };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        className="rounded-full bg-orange-400 text-white"
        onPress={onOpen}
        isIconOnly
      >
        <Pencil />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
             <form onSubmit={handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Edit Foto
              </ModalHeader>
              <ModalBody>
               
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Upload Foto"
                    onChange={handleFileChange}
                  />

                  <img
                    src={imagePreview}
                    alt="foto"
                    className="flex justify-center items-center m-auto w-24 h-24"
                  />
               
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button type="submit" color="primary" >
                {loading ? "Loading..." : "Upload"}
                </Button>
              </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalEditFoto;
