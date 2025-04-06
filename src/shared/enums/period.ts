export class Period {
  public static enum = {
    morning: "morning",
    night: "night",
  } as const;
  public static label = {
    [this.enum.morning]: "Dia",
    [this.enum.night]: "Noite",
  };

  public static entries = Object.entries(this.enum);
  public static values = Object.values(this.enum);

  public static getLabel(value?: keyof typeof this.enum) {
    if (!value) return this.label.morning;
    return this.label[value];
  }
}
