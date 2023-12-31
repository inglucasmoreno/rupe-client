import { useState } from 'react';
import { useAuthStore, useUiStore } from '../../../hooks';
import {
  Navbar as NavbarNextUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  Switch,
} from "@nextui-org/react";
import { useLocation, useNavigate } from 'react-router-dom';
import { ConfirmModal, ProfileModal } from '../../../modals';
import { MoonIcon, SunIcon, UserSolidIcon } from '../../../icons';

export const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleProfile, toggleDarkMode, isDarkMode } = useUiStore();
  const location = useLocation();
  const navigate = useNavigate();

  const { logout, user }: any = useAuthStore();

  const navigateTo = (url) => {
    navigate(url);
    setIsMenuOpen(false);
  }

  return (
    <>
      <ConfirmModal />
      <ProfileModal />
      <NavbarNextUI
        className='border-b dark:border-zinc-600 bg-opacity-75 dark:bg-zinc-900 bg-zinc-50'
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={(event) => setIsMenuOpen(event)}>
        <NavbarContent>
          <NavbarMenuToggle
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link onPress={() => navigate('/')} className="font-bold text-inherit cursor-pointer" color="foreground">
              <div className="flex items-center">
                <img src="/assets/logo.png" className="w-20" alt="" />
              </div>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">

          <NavbarItem className='cursor-pointer'>
            <Link onPress={() => navigate('/')} className={location.pathname === '/' && 'bg-primary p-2 rounded text-white'} color="foreground">
              Inicio
            </Link>
          </NavbarItem>

          <NavbarItem className='cursor-pointer'>
            <Link onPress={() => navigate('/personas')} className={location.pathname === '/personas' && 'bg-primary p-2 rounded text-white'} color="foreground">
              Personas
            </Link>
          </NavbarItem>

          <NavbarItem className='cursor-pointer'>
            <Link onPress={() => navigate('/vehiculos')} className={location.pathname === '/vehiculos' && 'bg-primary p-2 rounded text-white'} color="foreground">
              Vehiculos
            </Link>
          </NavbarItem>

          <NavbarItem>

            <Dropdown className="ml-2">
              <DropdownTrigger className={
                location.pathname === '/rupes-discapacidad' || location.pathname === '/rupes-conductor-discapacitado'
                  ? 'bg-primary p-2 rounded text-white cursor-pointer'
                  : 'cursor-pointer'}>
                <Link color="foreground"> RUPES </Link>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onPress={() => navigate('/rupes-discapacidad')} key="rupes-discapacidad"> Discapacidad </DropdownItem>
                <DropdownItem onPress={() => navigate('/rupes-conductor-discapacitado')} key="rupes-conductor-discapacitado"> Conductor discapacitado </DropdownItem>
              </DropdownMenu>
            </Dropdown>

          </NavbarItem>

          <NavbarItem>

            {
              user.role === 'ADMIN_ROLE' &&
              <Dropdown className="ml-2">
                <DropdownTrigger className={
                  location.pathname === '/usuarios'
                    ? 'bg-primary p-2 rounded text-white cursor-pointer'
                    : 'cursor-pointer'}>
                  <Link color="foreground"> Configuraciones </Link>
                </DropdownTrigger>
                <DropdownMenu>

                  {
                    user.role === 'ADMIN_ROLE' &&
                    <DropdownItem onPress={() => navigate('/usuarios')} key="usuarios"> Usuarios </DropdownItem>
                  }

                </DropdownMenu>
              </Dropdown>

            }

          </NavbarItem>

        </NavbarContent>

        <NavbarContent justify="end">

          <Switch
            defaultSelected={!isDarkMode}
            onChange={() => toggleDarkMode()}
            size="md"
            color="secondary"
            thumbIcon={({ isSelected, className }) =>
              !isDarkMode ? (
                <SunIcon className={className + `${isSelected} ? text-orange-500`} />
              ) : (
                <MoonIcon className={className + `${isSelected} ? text-zinc-800`} />
              )
            }
          >
          </Switch>

          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  // isBordered
                  as="button"
                  className="transition-transform text-md"
                  color="secondary"
                  name={user?.nombre?.substring(0, 1)}
                />
              </DropdownTrigger>
              <DropdownMenu variant="flat">
                <DropdownItem onPress={() => toggleProfile()} key="profile" className="h-14 gap-2">
                  <p className="text-slate-900 dark:text-slate-300"> Usuario </p>
                  <p className="font-semibold"> {user.apellido} {user.nombre} </p>
                </DropdownItem>
                <DropdownItem onPress={() => toggleProfile()} key="settings">

                  <div className='flex items-center'>
                    <UserSolidIcon className="w-4 h-4" />
                    <span className='ml-2'>
                      Perfil
                    </span>
                  </div>

                </DropdownItem>
                {/* 
                <DropdownItem
                  onPress={() => toggleDarkMode()}
                  key="dark_mode"
                >
                  <div className="flex items-center">

                    {
                      isDarkMode
                        ? <SunIcon className="w-4 h-4 mr-2" />
                        : <MoonIcon className="w-4 h-4 mr-2" />
                    }

                    <span>
                      {
                        isDarkMode ? 'Modo claro' : 'Modo oscuro'
                      }
                    </span>
                  </div>
                </DropdownItem> */}

                <DropdownItem className="text-danger-500" onClick={() => logout()} key="logout" color="danger">
                  Cerrar sesion
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>

          <NavbarMenuItem className='cursor-pointer'>
            <Link
              onPress={() => navigateTo('/')}
              key="inicio"
              size='lg'
              color='foreground'
              className={location.pathname === '/' ? 'bg-primary p-2 text-white rounded w-full' : 'w-full'}
            >
              Inicio
            </Link>
          </NavbarMenuItem>

          {
            user.role === 'ADMIN_ROLE' &&
            <NavbarMenuItem className='cursor-pointer'>
              <Link
                onPress={() => navigateTo('/usuarios')}
                key="usuarios"
                size='lg'
                color='foreground'
                className={location.pathname === '/usuarios' ? 'bg-primary p-2 text-white rounded w-full' : 'w-full'}
              >
                Usuarios
              </Link>
            </NavbarMenuItem>
          }

          <NavbarMenuItem className='cursor-pointer'>
            <Link
              onPress={() => navigateTo('/personas')}
              key="personas"
              size='lg'
              color='foreground'
              className={location.pathname === '/personas' ? 'bg-primary p-2 text-white rounded w-full' : 'w-full'}
            >
              Personas
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem className='cursor-pointer'>
            <Link
              onPress={() => navigateTo('/vehiculos')}
              key="vehiculos"
              size='lg'
              color='foreground'
              className={location.pathname === '/vehiculos' ? 'bg-primary p-2 text-white rounded w-full' : 'w-full'}
            >
              Vehiculos
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem className='cursor-pointer'>
            <Link
              onPress={() => navigateTo('/rupes-discapacidad')}
              key="vehiculos"
              size='lg'
              color='foreground'
              className={location.pathname === '/rupes-discapacidad' ? 'bg-primary p-2 text-white rounded w-full' : 'w-full'}
            >
              Rupe - Discapacidad
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem className='cursor-pointer'>
            <Link
              onPress={() => navigateTo('/rupes-conductor-discapacitado')}
              key="vehiculos"
              size='lg'
              color='foreground'
              className={location.pathname === '/rupes-conductor-discapacitado' ? 'bg-primary p-2 text-white rounded w-full' : 'w-full'}
            >
              Rupe - Cond. Discapacitado
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem className='cursor-pointer'>
            <Link
              onPress={() => logout()}
              color='danger'
              size='lg'
              className='w-full'
            >
              Cerrar sesion
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </NavbarNextUI>

    </>

  )

}

