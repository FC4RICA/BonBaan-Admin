import { useSubmit } from "react-router";
import { CreateServiceForm } from "../components/forms/serviceForm";
import { useInsertService } from "../routes/insertServiceRoute";

const InsertServicePage = () => {
  const result = useInsertService();
  const submit = useSubmit()

  const onSubmit = (value) => {
    submit(value, {method: "post", action: "/services/insert"})
  }

  return (
    <div>
      <CreateServiceForm categories={result.categories} types={result.types} onSubmit={onSubmit}/>
    </div>
  );
};

export default InsertServicePage;