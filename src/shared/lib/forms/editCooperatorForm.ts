export type EditCooperatorFormValues = {
  hasPinnedException: boolean;
  type: "DEACUN" | "COOPERATOR";
};

class EditCooperatorForm {
  public initialValues: EditCooperatorFormValues = {
    hasPinnedException: false,
    type: "COOPERATOR",
  };
}

export const editCooperatorForm = new EditCooperatorForm();
