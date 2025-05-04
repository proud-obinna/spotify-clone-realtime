/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from '@/lib/axios';
import {create} from 'zustand';

interface AuthStore {
    isAdmin: boolean;
    error: string | null;
    isLoading: boolean;
    
    checkAdminStatus: () => Promise<void>;
    rest: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAdmin: false,
    isLoading: false,
    error: null,

    checkAdminStatus: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/admin/check');
            set({ isAdmin: response.data.admin });
        } catch (error: any) {
            set({ error: error.response.data.message, isAdmin: false });
        } finally {
            set({ isLoading: false });
        }
    },
    rest: () => {
        set({ isAdmin: false, isLoading: false, error: null });
    }, 
}))