import { Cooperator } from "@/shared/types/Cooperator";

export type AddCooperatorFormValues = Omit<Cooperator, "id"> & {};

class AddCooperatorForm {
  public initialValues: AddCooperatorFormValues = {
    name: "",
    telephone: "",
    type: "",
  };
}

export const addCooperatorForm = new AddCooperatorForm();
