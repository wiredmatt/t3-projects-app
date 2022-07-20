const hideEmail = (email: string): string => {
  if (!email.includes("@")) return "";

  const [name, domain] = email.split("@");

  if (!name || !domain) return "";

  return `${name.substring(0, 1)}***@${domain?.substring(0, 1)}***.${
    domain.split(".")[1]
  }`;
};

export default hideEmail;
