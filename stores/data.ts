import { defineStore } from 'pinia';

interface TableUser {
    id: number;
    name: string;
    surname: string;
    status: string;
    data_created: string;
}

export const useTableStore = defineStore('table', {
    state: () => ({
        users: [] as TableUser[],
    }),
    actions: {
        async loadUsers() {
            const res = await fetch('/users.json')
            const raw = await res.json()

            this.users = raw.map((u: any, i: number) => ({
                id: i + 1,
                name: u.name,
                surname: u.surname,
                status: u.active ? 'активен' : 'неактивен',
                data_created: u.created
            }))
        },
    },
})
