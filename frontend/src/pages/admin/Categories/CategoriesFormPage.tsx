import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../lib/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/CategoriesFormPage.scss";

const schema = yup.object().shape({
  name: yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
});

type CategoryFormData = {
  name: string;
};

const CategoriesPage: React.FC = () => {
  const queryClient = useQueryClient();
  const addCategoryMutation = useMutation<any, Error, CategoryFormData>({
    mutationFn: async (data: CategoryFormData) => {
      const response = await api.post("/api/categories", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Category added successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error("Failed to add category.");
    },
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: CategoryFormData) => {
    addCategoryMutation.mutate(data);
    reset();
  };

  return (
    <div className="categories-container">
      <div className="form-wrapper">
        <h2>Create Category</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              {...register("name")}
              placeholder="Enter category name"
            />
            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CategoriesPage;
