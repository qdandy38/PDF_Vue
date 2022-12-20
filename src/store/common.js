import { defineStore } from "pinia";
const defaultState = {
	file: null,
};
export default defineStore("common", {
  state: () => ({ ...defaultState }),
	actions: {
		updFile(file){
			this.file = file;
		}
	}
})