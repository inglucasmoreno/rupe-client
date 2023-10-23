import { Button, Chip, ChipProps, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, SortDescriptor, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { Key, useCallback, useMemo, useState } from "react";
import { useUiStore, useVehiculosStore } from "../../hooks";
import { DislikeIcon, EditIcon, LikeIcon, MenuIcon } from "../../icons";
import { format } from "date-fns";
import { IVehiculos } from "../../interfaces/Vehiculos";
import { ActiveItems } from "../../constants";

export const VehiculosTable = () => {

  const {
    vehiculos,
    isLoadingVehiculos,
    setActiveVehiculo,
    activeInactiveVehiculo
  } = useVehiculosStore();

  const { toggleVehiculos } = useUiStore();
  const [filterValue, setFilterValue] = useState("");
  const [filterActiveValue, setFilterActiveValue] = useState("true");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "descripcion",
    direction: "ascending",
  });

  // Open Modals

  const openUpdateVehiculoModal = (vehiculo: IVehiculos) => {
    setActiveVehiculo(vehiculo);
    toggleVehiculos();
  }

  // Activate/Inactivate - Vehiculo

  const activateInactivateVehiculoFnc = (vehiculo: IVehiculos) => {

    let dataUpdate = {
      id: vehiculo.id,
      activo: !vehiculo.activo
    }

    activeInactiveVehiculo(dataUpdate);

  }

  // TODO: Modificar y hacerlo variable

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(vehiculos.length / rowsPerPage);

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

    let filteredElements: IVehiculos[] = [...vehiculos];

    if (filterActiveValue) {
      filteredElements = filteredElements.filter(element => filterActiveValue === 'true' ? element.activo : !element.activo)
    }

    filteredElements = filteredElements.filter((element: IVehiculos) =>
      element.dominio.includes(filterValue.toUpperCase()) ||
      element.marca.includes(filterValue.toUpperCase()) ||
      element.modelo.includes(filterValue.toUpperCase())
    );

    return filteredElements;

  }, [vehiculos, filterValue, filterActiveValue]);

  // Sort handler

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a: IVehiculos, b: IVehiculos) => {
      const first = a[sortDescriptor.column as keyof IVehiculos] as number;
      const second = b[sortDescriptor.column as keyof IVehiculos] as number;
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
      key: "dominio",
      label: "DOMINIO",
    },

    {
      key: "marca",
      label: "MARCA",
    },

    {
      key: "modelo",
      label: "MODELO",
    },

    {
      key: "createdAt",
      label: "FECHA DE CREACION",
    },

    {
      key: "activo",
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

      case "activo":
        return (
          <Chip className="capitalize" color={statusColorMap[row.activo ? 'activo' : 'inactivo']} size="sm" variant="flat">
            {row.activo ? 'Activo' : 'Inactivo'}
          </Chip>
        );

      case "createdAt": return (format(new Date(row.createdAt), 'dd/MM/yyyy'));

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
              <DropdownItem onPress={() => openUpdateVehiculoModal(row)} key="editar-vehiculo">
                <div className="flex items-center">
                  <div>
                    <EditIcon />
                  </div>
                  <span className="ml-2">
                    Editar vehiculo
                  </span>
                </div>
              </DropdownItem>
              <DropdownItem onPress={() => activateInactivateVehiculoFnc(row)} key="alta-baja-vehiculo">
                <div className="flex items-center">
                  {
                    row.activo ? <DislikeIcon className="w-4 h-4" /> : <LikeIcon className="w-4 h-4" />
                  }
                  <span className="ml-2">
                    {row.activo ? 'Baja de vehiculo' : 'Alta de vehiculo'}
                  </span>
                </div>
              </DropdownItem>
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
          onValueChange={onSearchChange}
        />
        <select
          className="equi-select ml-2"
          defaultValue={filterActiveValue}
          onChange={handleActiveSelectFilter}
        >
          {
            ActiveItems.map((item) => (
              <option key={item.key} value={item.value}>{item.description}</option>
            ))
          }
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
    <Table
      isStriped
      className="mt-4 pb-4"
      aria-label="Vehiculos table"
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
        emptyContent={"No se encontraron vehiculos"}
        isLoading={isLoadingVehiculos}
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
  )
}