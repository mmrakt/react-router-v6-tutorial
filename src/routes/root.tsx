import { Form, Link, Outlet, redirect, useLoaderData } from "react-router-dom";
import { createContact, getContacts } from "../contracts";
import { IContact } from "..";

const action = async () => {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
};
const loader = async () => {
  const contacts: IContact[] = await getContacts();
  return contacts;
};
const Root = () => {
  const contacts = useLoaderData() as IContact[];
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              type="search"
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div id="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export { Root, loader, action };
