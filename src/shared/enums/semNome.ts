export class SemNome {
  public static enum = {
    standing: "standing",
    seated: "seated",
  } as const;
  public static label = {
    [this.enum.standing]: "Em pé",
    [this.enum.seated]: "Sentado",
  };

  public static entries = Object.entries(this.enum);
  public static values = Object.values(this.enum);

  public static getLabel(value?: keyof typeof this.enum) {
    if (!value) return this.label.standing;
    return this.label[value];
  }
}
