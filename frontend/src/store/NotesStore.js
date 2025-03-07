import { create } from "zustand";
import axios from 'axios';


const getAllNotes = create((set) => ({
    notes: [],
    loading: false,
    error: null,

    fetchAllNotes: async () => {
        set({ loading: true, error: null });

        try {
            const response = await axios.get("http://localhost:8000/notes", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            // console.log(response.data)
            set({ notes: response.data, loading: false })
        } catch (error) {
            set({ error: error.message, loading: false })
        }
    }
}))


export default getAllNotes;