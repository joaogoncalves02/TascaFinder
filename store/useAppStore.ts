import { create } from 'zustand';

export type FiltersState = {
  barato: boolean;
  menu: boolean;
  petiscos: boolean;
  comidaCaseira: boolean;
  abertoAgora: boolean;
};

export type LocationState = {
  coords: { lat: number; lng: number } | null;
  permissionStatus: 'unknown' | 'granted' | 'denied';
};

export type AppState = {
  filters: FiltersState;
  location: LocationState;
  query: string;
  setQuery: (value: string) => void;
  toggleFilter: (filter: keyof FiltersState) => void;
  resetFilters: () => void;
  setLocation: (coords: { lat: number; lng: number } | null) => void;
  setPermissionStatus: (status: LocationState['permissionStatus']) => void;
};

const defaultFilters: FiltersState = {
  barato: false,
  menu: false,
  petiscos: false,
  comidaCaseira: false,
  abertoAgora: false,
};

export const useAppStore = create<AppState>((set) => ({
  filters: { ...defaultFilters },
  location: { coords: null, permissionStatus: 'unknown' },
  query: '',
  setQuery: (value) => set({ query: value }),
  toggleFilter: (filter) =>
    set((state) => ({
      filters: { ...state.filters, [filter]: !state.filters[filter] },
    })),
  resetFilters: () => set({ filters: { ...defaultFilters } }),
  setLocation: (coords) =>
    set((state) => ({
      location: { ...state.location, coords },
    })),
  setPermissionStatus: (status) =>
    set((state) => ({
      location: { ...state.location, permissionStatus: status },
    })),
}));
