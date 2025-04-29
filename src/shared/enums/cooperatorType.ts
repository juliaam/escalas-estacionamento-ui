export class Cooperator {
  public static enum = {
    cooperator: "cooperator",
    deacun: "deacun",
  } as const;
  public static label = {
    [this.enum.cooperator]: "Cooperador",
    [this.enum.deacun]: "Diácuno",
  };

  public static entries = Object.entries(this.enum);
  public static values = Object.values(this.enum);

  public static getLabel(value?: keyof typeof this.enum) {
    if (!value) return this.label.cooperator;
    return this.label[value];
  }
}
