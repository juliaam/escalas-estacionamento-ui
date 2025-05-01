export class Cooperator {
  public static enum = {
    COOPERATOR: "COOPERATOR",
    DEACUN: "DEACUN",
  } as const;
  public static label = {
    [this.enum.COOPERATOR]: "Cooperador",
    [this.enum.DEACUN]: "Diácuno",
  };

  public static entries = Object.entries(this.enum);
  public static values = Object.values(this.enum);

  public static getLabel(value?: keyof typeof this.enum) {
    if (!value) return this.label.COOPERATOR;
    return this.label[value];
  }
}
