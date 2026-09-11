type User = {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: number | null,
  address: {
    city: string,
    country: string,
  },
  account: {
    status: string,
    plan: string,
  }
}

type Contact ={
  email: string,
  phone: number | null,
};

type Summary = {
  displayName: string,
  loaction: string,
  contact:Contact,
  active: boolean,
  plan: string,
};

function getDisplayName(user:User):string{
  return user.firstName + ' ' + user.lastName;
}

function getLocation(user:User):string{
  return `${user.address.city}, ${user.address.country}`;
}

function getContactSummary(user:User):Contact{
  return {
    email:user.email,
    phone: user.phone,
  }
}

function isAccountActive(user:User):boolean{
  return user.account.status === "active";
}

function createProfileSummary(user:User):Summary{
  return {
    displayName: getDisplayName(user),
    loaction: getLocation(user),
    contact: getContactSummary(user),
    active: isAccountActive(user),
    plan: user.account.plan,
  }
}
