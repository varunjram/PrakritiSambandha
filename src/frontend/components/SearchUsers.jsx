import { AutoComplete } from "primereact/autocomplete";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const SearchUsers = () => {
  const { users } = useAppContext();
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [filteredPeople, setFilteredPeople] = useState(null);

  const peopleOptions = users.map((person, i) => ({
    ...person,
    fullName: `${person?.firstName} ${person?.lastName}`,
  }));
  console.log("users: ", users);

  const search = (event) => {
    setTimeout(() => {
      let _filteredPeople;

      if (!event.query.trim().length) {
        _filteredPeople = [...peopleOptions];
      } else {
        _filteredPeople = peopleOptions.filter((users) => {
          return users.firstName.toLowerCase().includes(event.query.toLowerCase());
        });
      }
      setFilteredPeople(_filteredPeople);
    }, 250);
  };
  const Navigate = useNavigate();

  const itemTemplate = (user) => {
    const { lastName, firstName, username, customInfo } = user;
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
        <Button icon="pi pi-search " />
        <AutoComplete
          placeholder="Search"
          field="fullName"
          value={selectedPerson}
          suggestions={filteredPeople}
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
