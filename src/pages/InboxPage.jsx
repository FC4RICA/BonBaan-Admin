import OrderCard from "../components/shared/OrderCard";
import { useInbox } from "../routes/inboxRoute";


const InboxPage = () => {
  const result = useInbox()

  const handelConfirm = (id) => {
    console.log("PUT" + id);
  };

  const handelCancel = (id) => {
    console.log("DELETE" + id);
  };

  return (
    <div className="space-y-4">
      {result.length > 0 ? result.map((item, index) => (
        <OrderCard
          key={index}
          data={item}
          onConfirm={() => handelConfirm(item.ID)}
          onCancel={() => handelCancel(item.ID)}
        />
      )): <div>ไม่มีคำขอใหม่</div>}
    </div>
  );
};

export default InboxPage;