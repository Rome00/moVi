// store.js
import { defineStore } from 'pinia';

//Definestore returns a function after calling, which is called to obtain the store entity
export const useStore = defineStore({
    //ID: required, unique in all stores
    id: 'myGlobalState',
    //State: function that returns the object
    state: () => ({
        count: 1,
    }),
    actions: {
        increaseCount() {
            this.count++;
        },
    },
});
