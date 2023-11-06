import { Button, Chip, ChipProps, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, SortDescriptor, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { Key, useCallback, useMemo, useState } from "react";
import { useUiStore, useRupesDiscapacidadStore } from "../../../hooks";
import { EditIcon, MenuIcon } from "../../../icons";
import { format } from "date-fns";
import { IRupesDiscapacidad } from "../../../interfaces/RupesDiscapacidad";
import { FaIdCardClip, FaReceipt } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

export const RupesDiscapacidadTable = () => {

  const {
    rupesDiscapacidad,
    isLoadingRupesDiscapacidad,
    setActiveRupeDiscapacidad,
  } = useRupesDiscapacidadStore();

  const navigate = useNavigate();
  const { toggleRupesDiscapacidad } = useUiStore();
  const [filterValue, setFilterValue] = useState("");
  const [filterActiveValue] = useState("true");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "descripcion",
    direction: "ascending",
  });

  // Open Modals

  const openUpdateRupeDiscapacidadModal = (rupeDiscapacidad: IRupesDiscapacidad) => {
    setActiveRupeDiscapacidad(rupeDiscapacidad);
    toggleRupesDiscapacidad();
  }

  // TODO: Modificar y hacerlo variable

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(rupesDiscapacidad.length / rowsPerPage);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const filteredItems = useMemo(() => {

    let filteredElements: IRupesDiscapacidad[] = [...rupesDiscapacidad];

    if (filterActiveValue) {
      filteredElements = filteredElements.filter(element => filterActiveValue === 'true' ? element.activo : !element.activo)
    }

    filteredElements = filteredElements.filter((element: any) =>
      element.id.toString() === filterValue.toUpperCase() ||
      (`${element.beneficiario.apellido} ${element.beneficiario.nombre}`).includes(filterValue.toUpperCase()) ||
      element.vehiculo.dominio.includes(filterValue.toUpperCase()) ||
      element.vehiculo.marca.includes(filterValue.toUpperCase()) ||
      element.vehiculo.modelo.includes(filterValue.toUpperCase())
    );

    return filteredElements;

  }, [rupesDiscapacidad, filterValue, filterActiveValue]);

  // Sort handler

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a: IRupesDiscapacidad, b: IRupesDiscapacidad) => {
      const first = a[sortDescriptor.column as keyof IRupesDiscapacidad] as number;
      const second = b[sortDescriptor.column as keyof IRupesDiscapacidad] as number;
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
      key: "id",
      label: "RUPE",
    },


    {
      key: "beneficiario",
      label: "BENEFICIARIO",
    },

    {
      key: "vehiculo",
      label: "VEHICULO",
    },

    {
      key: "telefonoContacto",
      label: "TELEFONO DE CONTACTO",
    },

    {
      key: "fechaOtorgamiento",
      label: "FECHA DE OTORGAMIENTO",
    },

    {
      key: "fechaVencimiento",
      label: "FECHA DE VENCIMIENTO",
    },

    // {
    //   key: "activo",
    //   label: "ESTADO",
    // },

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

      case "id": return (
        // rellenar con 0 id hasta tener 7 digitos
        <div>
          {row.id.toString().padStart(8, '0')}
        </div>
      );


      case "beneficiario": return (`${row.beneficiario.apellido} ${row.beneficiario.nombre}`);

      case "vehiculo": return (`${row.vehiculo.marca} ${row.vehiculo.modelo} - ${row.vehiculo.dominio}`);

      case "fechaOtorgamiento": return (format(new Date(row.fechaOtorgamiento), 'dd/MM/yyyy'));

      case "fechaVencimiento": return (format(new Date(row.fechaVencimiento), 'dd/MM/yyyy'));

      case "entregado": return (row.entregado ? 'Si' : 'No');

      case "controlado": return (row.entregado ? 'Si' : 'No');

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
              <DropdownItem onPress={() => openUpdateRupeDiscapacidadModal(row)} key="editar-rupe-discapacidad">
                <div className="flex items-center">
                  <div>
                    <EditIcon />
                  </div>
                  <span className="ml-2">
                    Editar
                  </span>
                </div>
              </DropdownItem>
              <DropdownItem onPress={() => navigate(`/rupes-discapacidad/detalles/${row.id}`)} key="detalles-rupe-discapacidad">
                <div className="flex items-center">
                  <div>
                  <FaReceipt />
                  </div>
                  <span className="ml-2">
                    Detalles
                  </span>
                </div>
              </DropdownItem>
              <DropdownItem onPress={() => openUpdateRupeDiscapacidadModal(row)} key="imprimir-rupe-discapacidad">
                <div className="flex items-center">
                  <div>
                    <FaIdCardClip />
                  </div>
                  <span className="ml-2">
                    Generar oblea
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
      aria-label="Rupes table"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      topContent={topContentTable}
      bottomContent={bottomContentTable}
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn className="bg-secondary text-white" allowsSorting key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        emptyContent={"No se encontraron rupes"}
        isLoading={isLoadingRupesDiscapacidad}
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