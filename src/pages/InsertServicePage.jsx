import { CreateServiceForm } from "../components/forms/serviceForm";
import { useInsertService } from "../routes/insertServiceRoute";

const InsertServicePage = () => {
  const result = useInsertService();

  return (
    <div>
      <CreateServiceForm categories={result.categories} types={result.types}/>
    </div>
  );
};

export default InsertServicePage;