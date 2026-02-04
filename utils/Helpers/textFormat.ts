export class TextFormatterHidden {
  static email(email: string) {
    const [user, domain] = email.split("@");
    if (!user || !domain) return email;
    const hidden = "*".repeat(Math.max(1, user.length - 2)) + user.slice(-2);
    return `${hidden}@${domain}`;
  }

  static phone(phone: string) {
    const hidden = "*".repeat(Math.max(1, phone.length - 2)) + phone.slice(-2);
    return hidden;
  }
}