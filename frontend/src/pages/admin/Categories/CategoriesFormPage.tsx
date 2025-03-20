import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../../styles/CategoriesFormPage.scss";

const schema = yup.object().shape({
  id: yup.string().required("ID is required"),
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
});

type CategoryFormData = {
  id: string;
  name: string;
};

const CategoriesPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: CategoryFormData) => {
    console.log("Form Data Submitted:", data);
  };

  return (
    <div className="categories-container">
      <div className="form-wrapper">
        <h2>Create Category</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* ID Field */}
          <div className="input-group">
            <label>ID</label>
            <input
              type="text"
              {...register("id")}
              placeholder="Enter category ID"
            />
            {errors.id && <p className="error-message">{errors.id.message}</p>}
          </div>

          {/* Name Field */}
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

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CategoriesPage;
