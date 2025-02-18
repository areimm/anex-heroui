import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from "@heroui/react";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  status: "todo" | "inprogress" | "done";
  assignedTo: string;
  deadline: string;
}

export default function TaskModal({ isOpen, onClose, title, description, status, assignedTo, deadline }: TaskModalProps) {
  return (
    <Modal backdrop="blur" className="dark text-white" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {/* Modal Başlık */}
        <ModalHeader>Görev Detayları</ModalHeader>

        {/* Modal İçeriği */}
        <ModalBody>
          <div className="flex flex-col gap-3">
            <Input label="Görev Başlığı" value={title} readOnly />
            
            <Input 
              label="Durum" 
              value={status === "todo" ? "Yapılacak" : status === "inprogress" ? "Devam Ediyor" : "Tamamlandı"} 
              readOnly 
            />
            
            <Textarea label="Açıklama" value={description} readOnly />
            
            <Input label="Atanan Kişi" value={assignedTo} readOnly />
            
            <Input label="Son Tarih" value={deadline} readOnly />
          </div>
        </ModalBody>

        {/* Modal Footer */}
        <ModalFooter>
          <Button className="w-full" color="danger" onClick={onClose}>
            Kapat
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
