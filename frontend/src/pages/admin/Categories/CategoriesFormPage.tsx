import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/CategoriesFormPage.scss";
import { useSaveCategory } from "../../../hooks/useCategoriesQuery";
import { toast } from "react-toastify";
import {
  Button,
  ErrorText,
  Label,
  InputGroup,
  Input,
} from "../../../components/ui/index";

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

  const form = useForm<FormCategory>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: FormCategory) => {
    create.mutate(data, {
      onSuccess: () => {
        toast.success("Category created successfully");
        form.reset();
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
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <InputGroup>
                  <Label>Name</Label>
                  <Input {...field} placeholder="Enter category name" />
                  <ErrorText>{fieldState.error?.message}</ErrorText>
                </InputGroup>
              )}
            />
            <Button type="submit">Add Category</Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CategoriesFormPage;
