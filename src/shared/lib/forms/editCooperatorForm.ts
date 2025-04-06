export type EditCooperatorFormValues = {
  hasPinnedException: boolean;
  type: "DIACUN" | "COOPERATOR";
};

class EditCooperatorForm {
  public initialValues: EditCooperatorFormValues = {
    hasPinnedException: false,
  };
}

export const editCooperatorForm = new EditCooperatorForm();
