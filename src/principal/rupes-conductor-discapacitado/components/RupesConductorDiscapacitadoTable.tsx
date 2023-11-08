import { Button, Chip, ChipProps, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, SortDescriptor, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { Key, useCallback, useMemo, useState } from "react";
import { useUiStore, useRupesConductorDiscapacitadoStore } from "../../../hooks";
import { EditIcon, MenuIcon } from "../../../icons";

import { format } from "date-fns";
import { IRupesConductorDiscapacitado } from "../../../interfaces/RupesConductorDiscapacitado";
import { FaPrint, FaReceipt } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const RupesConductorDiscapacitadoTable = () => {

  const {
    rupesConductorDiscapacitado,
    isLoadingRupesConductorDiscapacitado,
    setActiveRupeConductorDiscapacitado,
    imprimirOblea
  } = useRupesConductorDiscapacitadoStore();

  const navigate = useNavigate();
  const { toggleRupesConductorDiscapacitado } = useUiStore();
  const [filterValue, setFilterValue] = useState("");
  const [filterActiveValue] = useState("true");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "descripcion",
    direction: "ascending",
  });

  // Open Modals

  const openUpdateRupeConductorDiscapacitadoModal = (rupeConductorDiscapacitado: IRupesConductorDiscapacitado) => {
    setActiveRupeConductorDiscapacitado(rupeConductorDiscapacitado);
    toggleRupesConductorDiscapacitado();
  }

  // TODO: Modificar y hacerlo variable

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(rupesConductorDiscapacitado.length / rowsPerPage);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const filteredItems = useMemo(() => {

    let filteredElements: IRupesConductorDiscapacitado[] = [...rupesConductorDiscapacitado];

    if (filterActiveValue) {
      filteredElements = filteredElements.filter(element => filterActiveValue === 'true' ? element.activo : !element.activo)
    }

    filteredElements = filteredElements.filter((element: any) =>
      element.id.toString() === filterValue.toUpperCase() ||
      element.beneficiario.dni.toString().includes(filterValue.toUpperCase()) ||
      (`${element.beneficiario.apellido} ${element.beneficiario.nombre}`).includes(filterValue.toUpperCase()) ||
      element.vehiculo.dominio.includes(filterValue.toUpperCase()) ||
      element.vehiculo.marca.includes(filterValue.toUpperCase()) ||
      element.vehiculo.modelo.includes(filterValue.toUpperCase())
    );

    return filteredElements;

  }, [rupesConductorDiscapacitado, filterValue, filterActiveValue]);

  // Sort handler

  const sortedItems = useMemo(() => {

    return [...filteredItems].sort((a: any, b: any) => {

      let first = null;
      let second = null;
      let cmp = null;

      if (sortDescriptor.column === 'beneficiario') {
        first = a.beneficiario.apellido as number;
        second = b.beneficiario.apellido as number;
        cmp = first < second ? -1 : first > second ? 1 : 0;
      } else if (sortDescriptor.column === 'vehiculo') {
        first = a.vehiculo.marca as number;
        second = b.vehiculo.marca as number;
        cmp = first < second ? -1 : first > second ? 1 : 0;
      } else {
        first = a[sortDescriptor.column as keyof any] as number;
        second = b[sortDescriptor.column as keyof any] as number;
        cmp = first < second ? -1 : first > second ? 1 : 0;
      }

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
                <DropdownItem onPress={() => openUpdateRupeConductorDiscapacitadoModal(row)} key="editar-rupe-conductor-discapacitado">
                  <div className="flex items-center">
                    <div>
                      <EditIcon />
                    </div>
                    <span className="ml-2">
                      Editar RUPE
                    </span>
                  </div>
                </DropdownItem>
                <DropdownItem onPress={() => navigate(`/rupes-conductor-discapacitado/detalles/${row.id}`)} key="detalles-rupe-discapacidad">
                  <div className="flex items-center">
                    <div>
                      <FaReceipt />
                    </div>
                    <span className="ml-2">
                      Detalles
                    </span>
                  </div>
                </DropdownItem>
                <DropdownItem onPress={() => imprimirOblea(row.id)} key="editar-rupe-discapacidad">
                  <div className="flex items-center">
                    <div>
                      <FaPrint />
                    </div>
                    <span className="ml-2">
                      Imprimir oblea
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
          isLoading={isLoadingRupesConductorDiscapacitado}
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