"use client";
import React, { use, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import Select from "react-select";
import data from "../../data.json";
import { Plus } from "lucide-react";
import { createMinat } from "../actions/minat";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const data2 = data.map((item) => {
  return { value: item.nama_jurusan, label: item.nama_jurusan };
});

const ModalTambahMinat = ({ userId }) => {
  const [data, setData] = useState([]);

  const tambahMinat = async () => {
    const { message, error } = await createMinat(data);
    if (error) {
      Swal.fire({
        icon: "error",
        title: `Error`,
        text: error,
        confirmButtonColor: "#3085d6",
      });
    }
    if (message) {
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: message,
        confirmButtonColor: "#3085d6",
      });
    }
  };

  const query = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: tambahMinat,
    onSuccess: () => {
      query.invalidateQueries("minat");
    },
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button className="rounded-full" isIconOnly={true} onPress={onOpen}>
        <Plus />
      </Button>
      <Modal
        backdrop="blur"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Tambah Minat Kuliah
              </ModalHeader>
              <ModalBody>
                <Select
                  onChange={(e) => setData({ userId: userId, minat: e.value })}
                  menuPortalTarget={document.body} // Dropdown di-root ke body
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Pastikan z-index tinggi
                  }}
                  options={data2}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onClick={() => mutate(data)}
                  color="primary"
                  onPress={onClose}
                >
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

export default ModalTambahMinat;
