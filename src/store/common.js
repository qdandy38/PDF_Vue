import { defineStore } from "pinia";
const defaultState = {
	fileName: "",
	fileData: null
};
export default defineStore("common", {
  state: () => ({ ...defaultState }),
	actions: {
		updFileName(name){
			this.fileName = name;
		},
		updFileData(data){
			this.fileData = data;
		}
	},
	persist: {
		// enabled: true,
		// strategies: [
		// 	{
		// 		key: "file",
		// 		storage: localStorage,
		// 	}
		// ]
    key: 'pinia-common',
    paths: [
      "fileName",
			"fileData"
    ]
  }
})