import { useSubmit } from "react-router";
import OrderCard from "../components/shared/OrderCard";
import { useInbox } from "../routes/inboxRoute";


const InboxPage = () => {
  const result = useInbox();

  const submit = useSubmit();
  const handelConfirm = (id, value) => {
    const formData = new FormData();
    formData.append("intent", "accept");
    formData.append("id", id);
    formData.append("price", value.price);

    submit(formData, { method: "post", action: "/inbox" });
  };

  const handelCancel = (id, value) => {
    const formData = new FormData();
    formData.append("intent", "cancel");
    formData.append("id", id);
    formData.append("cancel_reason", value.cancelReason);

    submit(formData, { method: "post", action: "/inbox" });
  };

  return (
    <div className="space-y-4">
      {result.length > 0 ? result.map((item, index) => (
        <OrderCard
          key={index}
          data={item}
          onConfirm={(value) => handelConfirm(item.ID, value)}
          onCancel={(value) => handelCancel(item.ID, value)}
        />
      )): 
      <div className="h-full w-full flex justify-center items-center">
        <p>ไม่พบคำขอใหม่ :D</p>
      </div>}
    </div>
  );
};

export default InboxPage;