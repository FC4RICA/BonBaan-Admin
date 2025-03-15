import { Button } from "@/components/ui/button";
import CollapsibleInput from "../components/shared/CollapsibleInput";
import InfoField from "../components/shared/InfoField";
import {
  CancelOrderDialog,
  CompleteOrderDialog,
  OrderStatusDialog
} from "../components/shared/orderDialog";
import { useOrder } from "../routes/orderRoute";

const OrderPage = () => {
  const { statuses, order } = useOrder();

  const onCancel = () => {

  };

  const onComplete = () => {

  };

  const onChangeStatus = () => {

  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="py-2 px-4 bg-white font-bold border border-[--border] rounded-md w-full">
          คำสั่งซื้อ {orderData.ID}
        </div>
        {order.Status.name === "กำลังดำเนินการ" ? (
          <CompleteOrderDialog
            onSubmit={onComplete}
            trigger={<Button>สำเร็จคำสั่งซื้อ</Button>}
          />
        ) : (
          <OrderStatusDialog statuses={statuses} currentStatusID={order.Status.ID} onSubmit={onChangeStatus} trigger={<Button>อัพเดตสถานะคำสั่งซื้อ</Button>}/>
        )}
        <CancelOrderDialog
          onSubmit={onCancel}
          trigger={<Button variant="destructive">ยกเลิกคำสั่งซื้อ</Button>}
        />
      </div>
      <CollapsibleInput header="ข้อมูลคำสั่งซื้อ">
        <div className="grid gap-4 grid-cols-5">
          <InfoField label="ผู้ซื้อ" className="col-span-3">
            {order.User.firstname + " " + order.User.lastname} ({order.User.email})
          </InfoField>
          <InfoField label="สถานะ" className="col-span-2">
            {order.Status.name}
          </InfoField>
          <InfoField label="ชื่อบริการ" className="col-span-2">
            {order.Service.name}
          </InfoField>
          <InfoField label="ประเภท" className="col-span-1">
            {order.OrderType.name}
          </InfoField>
          <InfoField label="วันที่สั่งซื้อ" className="col-span-2">
            {order.CreatedAt}
          </InfoField>
          <InfoField label="คำขอ" className="col-span-3">
            {order.VowRecord.wish}
          </InfoField>
          <InfoField label="วันที่การบนสิ้นสุด" className="col-span-2">
            {order.VowRecord.deadline}
          </InfoField>
          <InfoField label="รายการสินค้า" className="col-span-3">
            {order.item}
          </InfoField>
          <InfoField label="ราคา" className="col-span-2">
            {order.price} บาท
          </InfoField>
        </div>
      </CollapsibleInput>
      {/* waiting for real transaction data */}
      {/* <div className="flex gap-4">
        <div className="w-full">
          <CollapsibleInput header="ข้อมูลใบเสร็จ">
            <div className="flex flex-col gap-3">
              <p>{order.transaction.name}</p>
              <p>{order.transaction.location}</p>
              <p>{order.transaction.method}</p>
              <p>{order.transaction.date}</p>
            </div>
          </CollapsibleInput>
        </div>
        <div className="w-full">
          <CollapsibleInput header="การชำระเงิน">
            <div className="grid gap-4 ">
              <InfoField label="ช่องทางการชำระเงิน">
                {order.transaction.method}
              </InfoField>
              <InfoField label="สถานะ">
                {order.Transaction.charge.status}
              </InfoField>
            </div>
          </CollapsibleInput>
        </div>
      </div> */}
      <CollapsibleInput header="หลักฐานคำสั่งซื้อ">
        <div className="grid gap-4 grid-cols-4">
          {order.Attachment.length > 0 ?
          {/* TODO: map images and video */}:
          <div>ไม่พบหลักฐานคำสั่งซื้อ</div>}
        </div>
      </CollapsibleInput>
    </div>
  );
};

export default OrderPage;
