<<<<<<< HEAD
import { useNavigate, useSubmit } from "react-router";
import { CreateServiceForm } from "../components/forms/serviceForm";
import { useInsertService } from "../routes/insertServiceRoute";
import { useEffect } from "react";
=======
import { useSubmit } from "react-router";
import { CreateServiceForm } from "../components/forms/serviceForm";
import { useInsertService } from "../routes/insertServiceRoute";
>>>>>>> 5940df2b1964ff91c8ffcf5c10c2f3e20f81f93c

const InsertServicePage = () => {
  const result = useInsertService();
  const submit = useSubmit()
<<<<<<< HEAD
  const navigate = useNavigate();

  useEffect(() => {
    if (result?.ID != undefined) {
      navigate(`/services/${result.ID}`)
    }
  }, [result])

  const onSubmit = (value) => {
    submit(value, {method: "post", action: "/services/insert", encType: "multipart/form-data"})
=======

  const onSubmit = (value) => {
    submit(value, {method: "post", action: "/services/insert"})
>>>>>>> 5940df2b1964ff91c8ffcf5c10c2f3e20f81f93c
  }

  return (
    <div>
      <CreateServiceForm categories={result.categories} types={result.types} onSubmit={onSubmit}/>
    </div>
  );
};

export default InsertServicePage;