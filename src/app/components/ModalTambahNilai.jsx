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
import { Select, SelectItem } from "@heroui/select";

import { Plus, X } from "lucide-react";
import { createNilai } from "../actions/nilai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const mataPelajaran = [
  { key: 1, label: "Matematika", value: "Matematika" },
  { key: 2, label: "Fisika", value: "Fisika" },
  { key: 3, label: "Biologi", value: "Biologi" },
  { key: 4, label: "Kimia", value: "Kimia" },
  { key: 5, label: "Geologi", value: "Geologi" },
  { key: 6, label: "Ekonomi", value: "Ekonomi" },
  { key: 7, label: "Sejarah", value: "Sejarah" },
  { key: 8, label: "Geografi", value: "Geografi" },
  { key: 9, label: "Bahasa Indonesia", value: "Bahasa Indonesia" },
  { key: 10, label: "Bahasa Inggris", value: "Bahasa Inggris" },
  { key: 11, label: "Seni Budaya", value: "Seni Budaya" },
  { key: 12, label: "Pendidikan Jasmani", value: "Pendidikan Jasmani" },
  { key: 13, label: "Pendidikan Agama", value: "Pendidikan Agama" },
  { key: 14, label: "Pendidikan Pancasila", value: "Pendidikan Pancasila" },
  { key: 15, label: "Prakarya", value: "Prakarya" },
  { key: 16, label: "TIK", value: "TIK" },
  { key: 17, label: "PKWU", value: "PKWU" },
  { key: 18, label: "Kewirausahaan", value: "Kewirausahaan" },
  { key: 19, label: "Bimbingan Konseling", value: "Bimbingan Konseling" },

];

const ModalTambahNilai = ({ user }) => {
  const [pelajaran, setPelajaran] = useState([
    {
      mata_pelajaran: "",
      nilai: "",
      semester: "",
      userId: user.id,
    },
  ]);

  const createPelajaran = async () => {
    
    const { message, error } = await createNilai({ data: pelajaran });
    if (!error) {
     Swal.fire({
       icon: 'success',
       title: 'Berhasil',
       text: message,
     })
      setPelajaran([
        {
          mata_pelajaran: "",
          nilai: "",
          semester: "",
          userId: user.id,
        },
      ]);
     
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
      })
    }
  };

  const addPelajaran = () => {
    setPelajaran([
      ...pelajaran,
      { mata_pelajaran: "", nilai: "", semester: "", userId: user.id },
    ]);
  };

  const handleChange = (index, field, value) => {
    const newPelajaran = [...pelajaran];
    newPelajaran[index][field] = value;
    setPelajaran(newPelajaran);
  };

  const hapusPelajaran = (index) => {
    const newPelajaran = [...pelajaran];
    newPelajaran.splice(index, 1);
    setPelajaran(newPelajaran);
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createPelajaran,
    onSuccess: () => {
      queryClient.invalidateQueries("nilai");
    },
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button className="rounded-full" isIconOnly={true} onPress={onOpen}>
        <Plus />
      </Button>
      <Modal
        size="2xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Tambah Nilai Pelajaran
              </ModalHeader>
              <ModalBody>
                {pelajaran.map((item, index) => (
                  <div className="flex gap-4" key={index}>
                    <Select
                      className="max-w-xs"
                      label="Mata Pelajaran"
                      onChange={(e) =>
                        handleChange(index, "mata_pelajaran", e.target.value)
                      }
                    >
                      {mataPelajaran.map((animal) => (
                        <SelectItem key={animal.value} value={animal.value}>
                          {animal.label}
                        </SelectItem>
                      ))}
                    </Select>
                    <Input
                      label="Nilai"
                      type="text"
                      onChange={(e) =>
                        handleChange(index, "nilai", parseInt(e.target.value))
                      }
                    />
                    <Input
                      label="Semester"
                      type="text"
                      onChange={(e) =>
                        handleChange(
                          index,
                          "semester",
                          parseInt(e.target.value)
                        )
                      }
                    />
                    <Button
                      variant="light"
                      className="flex m-auto justify-center items-center"
                      isIconOnly
                      onClick={() => hapusPelajaran(index)}
                    >
                      <X />
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={addPelajaran}
                  className="mt-2 bg-blue-500 text-white"
                >
                  Tambah
                </Button>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onClick={() => mutate(pelajaran)}
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

export default ModalTambahNilai;
