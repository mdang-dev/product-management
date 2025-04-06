import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/CategoriesFormPage.scss";
import {
  useFetchCategories,
  useSaveCategory,
} from "../../../hooks/useCategoriesQuery";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../../constants/queryKeys";
import { Input } from "../../../components/ui/Input";

type FormCategory = {
  name: string;
};

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
});

const CategoriesFormPage: React.FC = () => {
  const create = useSaveCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormCategory>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormCategory) => {
    create.mutate(data, {
      onSuccess: () => {
        toast.success("Category created successfully");
        reset();
      },
      onError: () => {
        toast.error("Failed to create category");
      },
    });
  };

  return (
    <div className="categories-container">
      <div className="form-wrapper">
        <h2>Create Category</h2>
        <FormProvider {...errors}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input name="name" label="Category Name" />
            <button type="submit">Submit</button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CategoriesFormPage;
