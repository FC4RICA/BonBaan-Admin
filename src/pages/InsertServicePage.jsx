import { useNavigate, useSubmit } from "react-router";
import { CreateServiceForm } from "../components/forms/serviceForm";
import { useInsertService } from "../routes/insertServiceRoute";
import { useEffect } from "react";

const InsertServicePage = () => {
  const result = useInsertService();
  const submit = useSubmit()
  const navigate = useNavigate();

  useEffect(() => {
    if (result?.ID != undefined) {
      navigate(`/services/${result.ID}`)
    }
  }, [result])

  const onSubmit = (value) => {
    submit(value, {method: "post", action: "/services/insert", encType: "multipart/form-data"})
  }

  return (
    <div>
      <CreateServiceForm categories={result.categories} types={result.types} onSubmit={onSubmit}/>
    </div>
  );
};

export default InsertServicePage;