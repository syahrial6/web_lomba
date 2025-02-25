"use client";
import React, { useState } from "react";
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
import {  Pencil } from "lucide-react";
import { editAvatarUser } from "../actions/user";


const ModalEditFoto = () => {
 
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Ambil file pertama yang diunggah
    if (file) {
      const previewUrl = URL.createObjectURL(file); // Buat URL sementara
      setImagePreview(previewUrl); // Simpan URL ke state
    }
    editAvatarUser(file);
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button className="rounded-full bg-orange-400 text-white" onPress={onOpen} isIconOnly>
        <Pencil />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Foto
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleFileChange}>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  placeholder="Upload Foto"
                />

                <img
                  src={imagePreview}
                  alt="foto"
                  className="flex justify-center items-center m-auto w-24 h-24 rounded-full"
                />
                </form>
              </ModalBody>
              
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button type="submit" color="primary" onPress={onClose}>
                  Simpan
                </Button>
              </ModalFooter>
              
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalEditFoto;
