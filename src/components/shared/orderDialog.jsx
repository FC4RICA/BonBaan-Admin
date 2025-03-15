import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  CancelOrderForm,
  ConfirmOrderForm,
  CompleteOrderForm,
  OrderStatusForm
} from "../forms/orderForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const ConfirmOrderDialog = ({ onSubmit, trigger }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>กรุณาใส่ข้อมูลเพื่อยืนยันคำสั่งซื้อ</DialogTitle>
          <DialogDescription>กรุณากำหนดราคาสำหรับคำสั่งซื้อ</DialogDescription>
        </DialogHeader>
        <ConfirmOrderForm
          closeDialog={() => setOpen(false)}
          onSubmit={onSubmit}
        >
          <DialogFooter>
            <Button type="submit">ยืนยัน</Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                ยกเลิก
              </Button>
            </DialogClose>
          </DialogFooter>
        </ConfirmOrderForm>
      </DialogContent>
    </Dialog>
  );
};

const CancelOrderDialog = ({ onSubmit, trigger }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>กรุณาใส่ข้อมูลเพื่อยกเลิกคำสั่งซื้อ</DialogTitle>
          <DialogDescription>
            กรุณาเลือกเหตุผลการปฎิเสธคำสั่งซื้อ
            การปฎิเสธคำสั่งซื้ออาจทำให้ลูกค้าไม่พึงพอใจ
            ด้งนั้นกรุณาใส่เหตุผลประกอบเพิ่มเติม
          </DialogDescription>
        </DialogHeader>
        <CancelOrderForm closeDialog={() => setOpen(false)} onSubmit={onSubmit}>
          <DialogFooter>
            <Button type="submit">ยืนยัน</Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                ยกเลิก
              </Button>
            </DialogClose>
          </DialogFooter>
        </CancelOrderForm>
      </DialogContent>
    </Dialog>
  );
};

const OrderStatusDialog = ({ statuses, currentStatusID, onSubmit, trigger }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>กรุณาใส่ข้อมูลเพื่อแก้ไขสถานะคำสั่งซื้อ</DialogTitle>
          <DialogDescription>กรุณาเลือกสถานะเพื่อแก้ไขสถานะคำสั่งซื้อ</DialogDescription>
        </DialogHeader>
        <OrderStatusForm
          closeDialog={() => setOpen(false)}
          onSubmit={onSubmit}
        >
          <DialogFooter>
            <Button type="submit">ยืนยัน</Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                ยกเลิก
              </Button>
            </DialogClose>
          </DialogFooter>
        </OrderStatusForm>
      </DialogContent>
    </Dialog>
  );
};

const CompleteOrderDialog = ({ onSubmit, trigger }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>กรุณาใส่ข้อมูลสำเร็จคำสั่งซื้อ</DialogTitle>
          <DialogDescription>กรุณาใส่รูป และวิดีโอเพื่อเป็นหลักฐานสำหรับการสำเร็จคำสั่งซื้อ</DialogDescription>
        </DialogHeader>
        <CompleteOrderForm
          closeDialog={() => setOpen(false)}
          onSubmit={onSubmit}
        >
          <DialogFooter>
            <Button type="submit">ยืนยัน</Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                ยกเลิก
              </Button>
            </DialogClose>
          </DialogFooter>
        </CompleteOrderForm>
      </DialogContent>
    </Dialog>
  );
};

export {
  ConfirmOrderDialog,
  CancelOrderDialog,
  CompleteOrderDialog,
  OrderStatusDialog,
};
