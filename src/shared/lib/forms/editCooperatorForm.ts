export type EditCooperatorFormValues = {
  hasPinnedException: boolean;
};

class EditCooperatorForm {
  public initialValues: EditCooperatorFormValues = {
    hasPinnedException: false,
  };
}

export const editCooperatorForm = new EditCooperatorForm();
