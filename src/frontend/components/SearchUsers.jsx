import React, { useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useAuthentication } from "../context/AuthContext";

const SearchUsers = () => {
  const { users, dispatch, sortBy } = useAppContext();
  const { authToken, dispatch: authDispatch, user: currentUser } = useAuthentication();

  const [selectedPerson, setSelectedPerson] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);

  const usersToFollow = users?.filter(
    (user) =>
      ![...currentUser?.following?.map(({ _id }) => _id), currentUser?._id].includes(user?._id)
  );

  const peopleOptions = usersToFollow.map((person, i) => ({
    ...person,
    fullName: `${person?.firstName} ${person?.lastName}`,
  }));
  console.log("usersToFollow: ", usersToFollow);

  // const connections =

  const search = (event) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredCountries;

      if (!event.query.trim().length) {
        _filteredCountries = [...peopleOptions];
      } else {
        _filteredCountries = peopleOptions.filter((users) => {
          return users.firstName.toLowerCase().includes(event.query.toLowerCase());
        });
      }
      setFilteredCountries(_filteredCountries);
    }, 250);
  };
  const Navigate = useNavigate();

  const itemTemplate = (user) => {
    const { _id, lastName, firstName, username, customInfo } = user;
    return (
      <div className="flex align-items-center cursor-pointer">
        <Avatar
          image={customInfo?.avatar}
          size="small"
          shape="circle"
          className="ml-auto mr-2 "
        />
        <div className="flex-grow-1 ">
          <h3 className="m-0">{`${firstName} ${lastName}`}</h3>
          <p className="text-500 m-0">@{username}</p>
        </div>

        <p className="text-red-700"></p>
      </div>
    );
  };

  return (
    <div className="card flex justify-content-center">
      <div className="p-inputgroup">
        <Button
          icon="pi pi-search "
          //   className="p-button-warning"
        />
        <AutoComplete
          placeholder="Search"
          field="fullName"
          value={selectedPerson}
          suggestions={filteredCountries}
          completeMethod={search}
          onChange={(e) => {
            setSelectedPerson(e.value);
          }}
          onSelect={(e) => {
            Navigate(`/profile/${e.value.username}/${e.value._id}`);
            setSelectedPerson(null);
          }}
          itemTemplate={itemTemplate}
        />
      </div>
    </div>
  );
};

export default SearchUsers;
