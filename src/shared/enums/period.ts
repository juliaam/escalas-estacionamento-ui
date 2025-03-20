export class Period {
  public static enum = {
    day: "day",
    night: "night",
  } as const;
  public static label = {
    [this.enum.day]: "Dia",
    [this.enum.night]: "Noite",
  };

  public static entries = Object.entries(this.enum);
  public static values = Object.values(this.enum);

  public static getLabel(value?: keyof typeof this.enum) {
    if (!value) return this.label.day;
    return this.label[value];
  }
}
