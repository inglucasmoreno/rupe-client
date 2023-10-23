import { Avatar, Button, Chip, ChipProps, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, SortDescriptor, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { Key, useCallback, useEffect, useMemo, useState } from "react";
import { DislikeIcon, EditIcon, LikeIcon, LockCloseIcon, MenuIcon } from "../../icons";
import { useAuthStore, useConfirmModalStore, useUiStore, useUsersStore } from "../../hooks";
import { IUsers } from "../../interfaces";

export const UsersTable = () => {

  // Estados

  const {
    users,
    setActiveUser,
    activeInactiveUser,
    isLoadingUsers,
  } = useUsersStore();

  const {
    openConfirm,
    isConfirm,
    actionConfirm
  } = useConfirmModalStore();

  const { user }: any = useAuthStore();
  const { toggleUser, toggleChangePassword } = useUiStore();
  const [filterValue, setFilterValue] = useState("");
  const [filterActiveValue, setFilterActiveValue] = useState("true");
  const [userSelected, setUserSelected] = useState(null);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "descripcion",
    direction: "ascending",
  });

  // Modal -> Editar Usuario

  const openEditUserModal = (user) => {
    setActiveUser(user);
    toggleUser();
  }

  const openChangePasswordModal = (user) => {
    setActiveUser(user);
    toggleChangePassword();
  }

  // Modal confirmacion - Active/Inactive user
  
  const openActiveInactiveModal = (user) => {
    setUserSelected(user);
    openConfirm({
      message: user.activo ? 
        `¿Está seguro que desea dar de baja a ${user.nombre}?` : 
        `¿Está seguro que desea dar de alta a ${user.nombre}?`,
      textConfirm: user.activo ? 'Dar de baja' : 'Dar de alta',
      textCancel: 'Cancelar',
      actionConfirm: 'ActiveInactiveUser'
    });
  }

  useEffect(() => {
    if(
      isConfirm && 
      userSelected && 
      actionConfirm === 'ActiveInactiveUser'
    ) activateInactivateUserFnc();
  },[isConfirm])

  // Activate/Inactivate - Usuario

  const activateInactivateUserFnc = () => {

    let dataUpdate = {
      id: userSelected?.id,
      activo: !userSelected?.activo
    }

    activeInactiveUser(dataUpdate);

  }

  // TODO: Modificar y hacerlo variable

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  let pages = Math.ceil(users?.length / rowsPerPage);

  // Filter handler

  const handleActiveSelectFilter = (event) => {
    setFilterActiveValue(event.target.value);
    setPage(1);
  }

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const filteredItems = useMemo(() => {

    let filteredElements: IUsers[] = [...users];

    if (filterActiveValue) {
      filteredElements = filteredElements.filter(element => filterActiveValue === 'true' ? element.activo : !element.activo)
    }

    filteredElements = filteredElements.filter((element: IUsers) =>
      element.apellido.includes(filterValue.toUpperCase()) ||
      element.nombre.includes(filterValue.toUpperCase()) ||
      element.dni.includes(filterValue) ||
      element.usuario.includes(filterValue)
    );

    return filteredElements;

  }, [users, filterValue, filterActiveValue]);


  // Sort handler

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a: IUsers, b: IUsers) => {
      const first = a[sortDescriptor.column as keyof any] as number;
      const second = b[sortDescriptor.column as keyof any] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  // Pagination handler

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return sortedItems.slice(start, end);
  }, [page, sortedItems]);

  // Table columns

  const columns = [
    {
      key: "actions",
      label: "ACCIONES",
    },
    {
      key: "avatar",
      label: "AVATAR",
    },
    {
      key: "usuario",
      label: "USUARIO",
    },
    {
      key: "apellido",
      label: "APELLIDO",
    },
    {
      key: "nombre",
      label: "NOMBRE",
    },
    {
      key: "dni",
      label: "DNI",
    },
    {
      key: "role",
      label: "ROL",
    },
    {
      key: "status",
      label: "ESTADO",
    },
  ];

  // Table rows

  const statusColorMap: Record<string, ChipProps["color"]> = {
    activo: "success",
    inactivo: "danger",
  };

  const renderCell = useCallback((row: any, columnKey: Key) => {

    const cellValue = row[columnKey as keyof any];

    switch (columnKey) {
      case "avatar":
        return (
          <Avatar
            // isBordered
            className="transition-transform text-md border border-slate-500"
            color={row?.id !== user?.userId ? 'default' : 'secondary'}
            name={row?.nombre?.substring(0, 1)}
          />
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{row.role === 'ADMIN_ROLE' ? 'Administrador' : 'Estandar'}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[row.activo ? 'activo' : 'inactivo']} size="sm" variant="flat">
            {row.activo ? 'Activo' : 'Inactivo'}
          </Chip>
        );
      case "actions":
        return (
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="light"
              >
                <MenuIcon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem onPress={() => openEditUserModal(row)} key="editar-usuario">
                <div className="flex items-center">
                  <div>
                    <EditIcon />
                  </div>
                  <span className="ml-2">
                    Editar usuario
                  </span>
                </div>
              </DropdownItem>
              <DropdownItem onPress={() => openChangePasswordModal(row)} key="cambiar-clave">
                <div className="flex items-center">
                  <div>
                    <LockCloseIcon className="w-4 h-4" />
                  </div>
                  <span className="ml-2">
                    Cambiar contraseña
                  </span>
                </div>
              </DropdownItem>

              {
                user.userId !== row.id &&
                <DropdownItem onPress={() => openActiveInactiveModal(row)} key="alta-baja-usuario">
                  <div className="flex items-center">
                    {
                      row.activo ? <DislikeIcon className="w-4 h-4" /> : <LikeIcon className="w-4 h-4" />
                    }
                    <span className="ml-2">
                      {row.activo ? 'Baja de usuario' : 'Alta de usuario'}
                    </span>
                  </div>
                </DropdownItem>
              }

            </DropdownMenu>
          </Dropdown>
        );
      default:
        return cellValue;
    }
  }, []);

  // Top content table

  const topContentTable = useMemo(() => {
    return (
      <div className="flex items-center justify-center">
        <Input
          variant="bordered"
          size="sm"
          label="Buscar"
          className="w-52"
          defaultValue={filterValue}
          onValueChange={onSearchChange}
        />

        <select
          className="equi-select ml-2"
          defaultValue={filterActiveValue}
          onChange={handleActiveSelectFilter}
        >
          <option value=""> Todos los usuarios </option>
          <option value="true"> Activos </option>
          <option value="false"> Inactivos </option>
        </select>

      </div>

    )
  }, [])

  // Bottom content table

  const bottomContentTable = useMemo(() => {
    return (
      <div className="flex w-full justify-center">
        <Pagination
          isCompact
          showControls
          className="ml-10"
          showShadow
          color="secondary"
          page={page}
          total={pages}
          variant="light"
          onChange={(page) => setPage(page)}
        />
      </div>
    )
  }, [items.length, page, pages]);

  return (
    <div>
      <Table
        isStriped
        className="mt-4 pb-4"
        aria-label="User table"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        topContent={topContentTable}
        bottomContent={bottomContentTable}
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => <TableColumn allowsSorting key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody
          emptyContent={"No se encontraron usuarios"}
          isLoading={isLoadingUsers}
          loadingContent={<Spinner label="Cargando..." />}
          items={items}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

