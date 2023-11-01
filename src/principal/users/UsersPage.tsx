import { useUsersStore } from "../../hooks/useUsersStore"
import { useEffect } from 'react';
import { UsersHeader, UsersTable } from ".";

export const UsersPage = () => {

  const {
    getAllUsers,
  } = useUsersStore();

  useEffect(() => {
    getAllUsers();
  }, [])

  return (
    <>

      {/* Principal comonent */}

      <div className="w-11/12 md:w-2/3 mx-auto">
        <UsersHeader />
        <UsersTable />
      </div>
    </>
  )

}

