export class Sector {
  public static enum = {
    in: "in",
    out: "out",
  } as const;
  public static label = {
    [this.enum.in]: "Dentro",
    [this.enum.out]: "Fora",
  };

  public static entries = Object.entries(this.enum);
  public static values = Object.values(this.enum);

  public static getLabel(value?: keyof typeof this.enum) {
    if (!value) return this.label.in;
    return this.label[value];
  }
}
