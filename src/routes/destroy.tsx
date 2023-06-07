import { redirect } from "react-router-dom";
import { deleteContact } from "../contracts";

const action = async ({ params }: { params: any }) => {
  throw new Error("oh dang!");
  await deleteContact(params.contactId);
  return redirect("/");
};

export { action };
